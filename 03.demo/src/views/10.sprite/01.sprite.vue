<template>
    <div class="wrapper" ref="wrapper"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import sImg from '@/assets/s.png'

export default {
  name: "",
  components: {},
  data() {
    return {
      AxisHelperNum: 800,
      cameraFlag: true
    };
  },
  mounted() {
    // 创建环境
    this.init();

    // 各种几何体测试
    this.createGeometry();

    // 周期渲染
    this.render();
  },
  methods: {
    init() {
      // 创建场景对象Scene
      this.scene = new THREE.Scene();

      //点光源
      this.point = new THREE.PointLight(0xffffff);
      this.point.position.set(400, 200, 300); //点光源位置
      this.scene.add(this.point); //点光源添加到场景中

      //环境光
      this.ambient = new THREE.AmbientLight(0x444444);
      this.scene.add(this.ambient);

      // // 相机设置
      var width = this.$refs.wrapper.offsetWidth; //窗口宽度
      var height = this.$refs.wrapper.offsetHeight; //窗口高度
      var k = width / height; //窗口宽高比
      //创建相机对象
      this.camera = new THREE.PerspectiveCamera(45, k, 1, 10000);
      this.camera.position.set(0, 50, 1000); //设置相机位置
      this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)

      // 创建渲染器对象
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height); //设置渲染区域尺寸
      this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
      this.$refs.wrapper.appendChild(this.renderer.domElement); //body元素中插入canvas对象


      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      this.scene.add(new THREE.AxisHelper(this.AxisHelperNum));
      // 鼠标操控
      this.controls = new OrbitControls(this.camera, this.renderer.domElement); //创建控件对象
    },
    render() {
      this.renderer.render(this.scene, this.camera); //执行渲染操作
      requestAnimationFrame(this.render); //请求再次执行渲染函数render
    },
    createGeometry() {
      var texture = new THREE.TextureLoader().load(sImg);
      // 创建精灵材质对象SpriteMaterial
      var spriteMaterial = new THREE.SpriteMaterial({
        // color:0xff00ff,//设置精灵矩形区域颜色
        // rotation:Math.PI/4,//旋转精灵对象45度，弧度值
        map: texture,//设置精灵纹理贴图
      });
      // 创建精灵模型对象，不需要几何体geometry参数
      var sprite = new THREE.Sprite(spriteMaterial);
      this.scene.add(sprite);
      // 控制精灵大小，比如可视化中精灵大小表征数据大小
      sprite.scale.set(100, 100, 1); //// 只需要设置x、y两个分量就可以
      sprite.position.set(50, 50)
    },
  },
};
</script>

<style scoped>
.box-card {
  position: absolute;
}

</style>
