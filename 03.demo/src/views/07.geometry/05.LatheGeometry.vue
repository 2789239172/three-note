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
       * 创建旋转网格模型
       */
      var points = [
          new THREE.Vector2(50,60),
          new THREE.Vector2(25,0),
          new THREE.Vector2(50,-60)
      ];
      var geometry = new THREE.LatheGeometry(points,30);
      var material=new THREE.MeshPhongMaterial({
          color:0x0000ff,//三角面颜色
          side:THREE.DoubleSide//两面可见
      });//材质对象
      material.wireframe = true;//线条模式渲染(查看细分数)
      var mesh=new THREE.Mesh(geometry,material);//旋转网格模型对象
      this.scene.add(mesh);//旋转网格模型添加到场景中


      // 样条曲线插值计算 很不理解
      var shape = new THREE.Shape();//创建Shape对象
      var points = [//定位定点
          new THREE.Vector2(50,60),
          new THREE.Vector2(25,0),
          new THREE.Vector2(50,-60)
      ];
      shape.splineThru(points);//顶点带入样条插值计算函数
      var splinePoints = shape.getPoints(20);//插值计算细分数20
      var geometry = new THREE.LatheGeometry(splinePoints,30);//旋转造型
      var material=new THREE.MeshPhongMaterial({
          color:0x0000ff,//三角面颜色
          side:THREE.DoubleSide//两面可见
      });//材质对象
      material.wireframe = true;//线条模式渲染(查看细分数)
      var mesh=new THREE.Mesh(geometry,material);//旋转网格模型对象
      mesh.position.set(200,0,0)
      this.scene.add(mesh);//旋转网格模型添加到场景中
    },
  },
};
</script>

<style scoped></style>
