<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import sImg from "@/assets/s.png";

export default {
  name: "",
  components: {},
  data() {
    return {
      AxisHelperNum: 800,
      cameraFlag: true,
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
      this.camera.position.set(0, 50, 500); //设置相机位置
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
      let json = [
        {
          name: "海门",
          value: 9,
          coordinate: [121.15, 31.89],
        },
        {
          name: "青岛",
          value: 18,
          coordinate: [120.33, 36.07],
        },
        {
          name: "武汉",
          value: 273,
          coordinate: [114.31, 30.52],
        },
      ];

      /**
       * 一个精灵模型对象表示一个城市的位置和数据
       */
      // 加载一个背景透明的圆形贴图，矩形精灵显示为圆形效果
      var texture = new THREE.TextureLoader().load(sImg);
      // 创建组对象，包含所有精灵对象
      let group = new THREE.Group();
        //遍历数据
        json.forEach((elem) => {
          // 精灵材质
          var spriteMaterial = new THREE.SpriteMaterial({
            map: texture, //设置精灵纹理贴图
            transparent: true,
            opacity: 0.5,
          });
          // 创建精灵模型对象
          var sprite = new THREE.Sprite(spriteMaterial);
          group.add(sprite);
          // 控制精灵大小   使用PM2.5大小设置精灵模型的大小
          // 注意适当缩放pm2.5大小,以便得到更好的显示效果
          var k = elem.value / 100;
          sprite.scale.set(k, k, 1);
          //获得城市坐标设置精灵模型对象的位置
          sprite.position.set(elem.coordinate[0], elem.coordinate[1], 0);
        });
        // 中国城市坐标整体的几何中心不在坐标原点，需要适当的平移
        group.position.set(-110, -30, 0);
        this.scene.add(group); //把精灵群组插入场景中
    },
  },
};
</script>

<style scoped>
.box-card {
  position: absolute;
}
</style>
