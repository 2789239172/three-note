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
      /**
       * 1. 创建拉伸网格模型
       */
      var shape = new THREE.Shape();
      /**四条直线绘制一个矩形轮廓*/
      shape.moveTo(0, 0); //起点
      shape.lineTo(0, 100); //第2点
      shape.lineTo(100, 100); //第3点
      shape.lineTo(100, 0); //第4点
      shape.lineTo(0, 0); //第5点
      var geometry = new THREE.ExtrudeGeometry( //拉伸造型
        shape, //二维轮廓
        //拉伸参数
        {
          amount: 120, //拉伸长度
          bevelEnabled: false, //无倒角
        }
      );
      var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        // size:5.0//点对象像素尺寸
      }); //材质对象
      var mesh = new THREE.Mesh(geometry, material); //点模型对象
      this.scene.add(mesh); //点模型添加到场景中

      /**
       * 2. 创建扫描网格模型
       */
      var shape = new THREE.Shape();
      /**四条直线绘制一个矩形轮廓*/
      shape.moveTo(0, 0); //起点
      shape.lineTo(0, 10); //第2点
      shape.lineTo(10, 10); //第3点
      shape.lineTo(10, 0); //第4点
      shape.lineTo(0, 0); //第5点
      /**创建轮廓的扫描轨迹(3D样条曲线)*/
      var curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-10, -50, -50),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(8, 50, 50),
        new THREE.Vector3(-5, 0, 100),
      ]);
      var geometry = new THREE.ExtrudeGeometry( //拉伸造型
        shape, //二维轮廓
        //拉伸参数
        {
          bevelEnabled: false, //无倒角
          extrudePath: curve, //选择扫描轨迹
          steps: 50, //扫描方向细分数
        }
      );
      var material = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        // size:5.0//点对象像素尺寸
      }); //材质对象
      var mesh = new THREE.Mesh(geometry, material); //点模型对象
      mesh.position.set(300, 0, 0)
      this.scene.add(mesh); //点模型添加到场景中
    },
  },
};
</script>

<style scoped></style>
