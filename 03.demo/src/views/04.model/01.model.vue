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
      // 1. 点
      var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
      // 点渲染模式
      var material = new THREE.PointsMaterial({
        color: 0xff0000,
        size: 10.0 //点对象像素尺寸
      }); //材质对象
      var points = new THREE.Points(geometry, material); //点模型对象
      points.position.set(-200, 200, 0)
      this.scene.add(points)

      
      /*
        LineLoop和Line区别是连线的时候会闭合把第一个顶点和最后一个顶点连接起来，
        LineSegments则是顶点不共享，第1、2点确定一条线，第3、4顶点确定一条直线，第2和3点之间不连接
      */ 
      // 线条渲染模式
      var material=new THREE.LineBasicMaterial({ color:0xff0000  });//材质对象
      // 创建线模型对象   构造函数：Line、LineLoop、LineSegments
      var line1=new THREE.Line(geometry,material);//线条模型对象
      line1.position.set(0, 200, 0)
      this.scene.add(line1)
      var line2=new THREE.LineLoop(geometry,material);//线条模型对象
      line2.position.set(200, 200, 0)
      this.scene.add(line2)
      var line3=new THREE.LineSegments(geometry,material);//线条模型对象
      line3.position.set(-200, 0, 0)
      this.scene.add(line3)


      // 3. 三个顶点确定一个三角形，网格模型Mesh默认的情况下，通过三角形面绘制渲染几何体的所有顶点，通过一系列的三角形拼接出来一个曲面
      var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff, //三角面颜色
      }); //材质对象
      var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      mesh.position.set(0, 0, 0)
      this.scene.add(mesh)
    },
  },
};
</script>

<style scoped></style>
