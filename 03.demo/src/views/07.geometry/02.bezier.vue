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
      // 三维样条曲线  Catmull-Rom算法
      var curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-50, 20, 90),
        new THREE.Vector3(-10, 40, 40),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(60, -60, 0),
        new THREE.Vector3(70, 0, 80)
      ]);
      //getPoints是基类Curve的方法，返回一个vector3对象作为元素组成的数组
      var points = curve.getPoints(100); //分段数100，返回101个顶点
      // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
      geometry.setFromPoints(points);
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0x000000
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      this.scene.add(line); //线条对象添加到场景中


      // 三维二次贝赛尔曲线
      var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
      var p1 = new THREE.Vector3(-80, 0, 0);
      var p2 = new THREE.Vector3(20, 100, 0);
      var p3 = new THREE.Vector3(80, 0, 0);
      var curve = new THREE.QuadraticBezierCurve3(p1, p2, p3);
      var points = curve.getPoints(100); //分段数100，返回101个顶点
      geometry.setFromPoints(points);
        //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0x000000
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      this.scene.add(line); //线条对象添加到场景中

      // 三维三次贝赛尔曲线
      var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
      var p1 = new THREE.Vector3(-80, 0, 0);
      var p2 = new THREE.Vector3(-40, 100, 0);
      var p3 = new THREE.Vector3(40, 100, 0);
      var p4 = new THREE.Vector3(80, 0, 0);
      var curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);
      var points = curve.getPoints(100); //分段数100，返回101个顶点
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
