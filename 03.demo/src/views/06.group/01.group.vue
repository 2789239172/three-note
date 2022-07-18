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
      //创建两个网格模型mesh1、mesh2
      var geometry = new THREE.BoxGeometry(20, 20, 20);
      var material = new THREE.MeshLambertMaterial({color: 0x0000ff});
      var group = new THREE.Group();
      var mesh1 = new THREE.Mesh(geometry, material);
      var mesh2 = new THREE.Mesh(geometry, material);
      mesh2.translateX(25);
      //把mesh1型插入到组group中，mesh1作为group的子对象
      // group.add(mesh1);
      //把mesh2型插入到组group中，mesh2作为group的子对象
      // group.add(mesh2);
      group.add(mesh1, mesh2)
      //把group插入到场景中作为场景子对象
      this.scene.add(group);

      //沿着Y轴平移mesh1和mesh2的父对象，mesh1和mesh2跟着平移
      group.translateY(100);

      //父对象缩放，子对象跟着缩放
      group.scale.set(4,4,4);

      //父对象旋转，子对象跟着旋转
      group.rotateY(Math.PI / 6)

      console.log('查看group的子对象',group.children);
      console.log('查看Scene的子对象',this.scene.children);
      // 删除父对象group的子对象网格模型mesh1
      // group.remove(mesh1)
      // 一次删除场景中多个对象
      // this.scene.remove(this.point,group)
    },
  },
};
</script>

<style scoped></style>
