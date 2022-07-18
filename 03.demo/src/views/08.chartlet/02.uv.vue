<template>
  <div ref="wrapper"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import aImg from '@/assets/a.jpg'
export default {
  name: "",
  components: {},
  data() {
    return {
      AxisHelperNum: 200,
    };
  },
  mounted() {
    // 创建环境
    this.init();

    // 周期渲染
    this.render();

    // 各种几何体测试
    this.createGeometry();
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

      // 相机设置
      var width = this.$refs.wrapper.offsetWidth; //窗口宽度
      var height = this.$refs.wrapper.offsetHeight; //窗口高度
      var k = width / height; //窗口宽高比
      //创建相机对象
      this.camera = new THREE.PerspectiveCamera(45, k, 1, 10000);
      this.camera.position.set(0, 50, 2000); //设置相机位置
      this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)

      // 创建渲染器对象
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height); //设置渲染区域尺寸
      this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
      this.$refs.wrapper.appendChild(this.renderer.domElement); //body元素中插入canvas对象

      // 鼠标操控
      this.controls = new OrbitControls(this.camera, this.renderer.domElement); //创建控件对象

      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      this.scene.add(new THREE.AxisHelper(this.AxisHelperNum));
    },
    render() {
      this.renderer.render(this.scene, this.camera); //执行渲染操作
      requestAnimationFrame(this.render); //请求再次执行渲染函数render
    },
    createGeometry() {
      // U和V指的是2D 空间的水平轴和垂直轴，因为 X、Y 和 Z 已经在 3D 空间中使用
      // 这里一个属性好似也被弃用掉了

      // 纹理贴图映射到一个矩形平面上
      var geometry = new THREE.PlaneGeometry(1200, 851); //矩形平面
      /**
       * 遍历uv坐标
       */
      // geometry.faceVertexUvs[0].forEach(elem => {
      //   elem.forEach(Vector2 => {
      //     // 所有的UV坐标全部设置为一个值
      //     Vector2.set(0.4,0.4);
      //   });
      // });
      // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
      var textureLoader = new THREE.TextureLoader();
      // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
      textureLoader.load(aImg, texture => {
        var material = new THREE.MeshLambertMaterial({
          // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
          map: texture,//设置颜色贴图属性值
          side: THREE.DoubleSide
        }); //材质对象Material

         var uvs = new Float32Array([
          0,0, //图片左下角
          1,0, //图片右下角
          1,1, //图片右上角
          0,1, //图片左上角
        ]);
        geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2)

        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        this.scene.add(mesh); //网格模型添加到场景中
      });
    },
  },
};
</script>

<style scoped></style>
