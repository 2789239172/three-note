<template>
  <div ref="wrapper"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
      /*
        注意网格模型Mesh进行缩放旋转平移变换和几何体Geometry可以实现相同的渲染效果，
        但是网格模型Mesh进行这些变换不会影响几何体的顶点位置坐标，
        网格模型缩放旋转平移变换改变的是模型的本地矩阵、世界矩阵
      */ 
      var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
      // 几何体xyz三个方向都放大2倍
      geometry.scale(2, 2, 2);
      // 几何体沿着x轴平移50
      geometry.translate(50, 0, 0);
      // 几何体绕着x轴旋转45度
      geometry.rotateX(Math.PI / 4);
      // 居中：偏移的几何体居中
      geometry.center();
      var mesh2 = new THREE.Mesh(
        geometry,
        new THREE.MeshLambertMaterial({ color: 0xff00ff })
      );
      this.scene.add(mesh2);
    },
  },
};
</script>

<style scoped></style>
