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
      this.camera.position.set(0, 50, 300); //设置相机位置
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
      // 1. A.copy(B)表示B属性的值赋值给A对应属性
      var p1 = new THREE.Vector3(1.2,2.6,3.2);
      var p2 = new THREE.Vector3(0.0,0.0,0.0);
      p2.copy(p1)
      // p2向量的xyz变为p1的xyz值
      console.log(p2);

      // 2. N = M.clone()表示返回一个和M相同的对象赋值给N
      var p1 = new THREE.Vector3(1.2,2.6,3.2);
      var p2 = p1.clone();
      // p2对象和p1对象xyz属性相同
      console.log(p2);  

      // 3. 对于网格模型而言，网格模型对象的几何体属性mesh.geometry和材质属性mesh.material的属性值都是对象的索引值
      var box=new THREE.BoxGeometry(10,10,10);//创建一个立方体几何对象
      var material=new THREE.MeshLambertMaterial({color:0x0000ff});//材质对象

      var mesh=new THREE.Mesh(box,material);//网格模型对象
      var mesh2 = mesh.clone();//克隆网格模型
      mesh.translateX(20);//网格模型mesh平移
      this.scene.add(mesh,mesh2);//网格模型添加到场景中

      box.scale(1.5,1.5,1.5);//几何体缩放
    },
  },
};
</script>

<style scoped></style>
