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
      var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
      // 绘制一个U型轮廓
      var R = 80;//圆弧半径
      var arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
      // 半圆弧的一个端点作为直线的一个端点
      var line1 = new THREE.LineCurve(new THREE.Vector2(R, 200, 0), new THREE.Vector2(R, 0, 0));
      var line2 = new THREE.LineCurve(new THREE.Vector2(-R, 0, 0), new THREE.Vector2(-R, 200, 0));
      // 创建组合曲线对象CurvePath
      var CurvePath = new THREE.CurvePath();
      // 把多个线条插入到CurvePath中
      CurvePath.curves.push(line1, arc, line2);
      //分段数200
      var points = CurvePath.getPoints(200);
      // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
      geometry.setFromPoints(points);
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0x000000
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      this.scene.add(line); //线条对象添加到场景中
    },
  },
};
</script>

<style scoped></style>
