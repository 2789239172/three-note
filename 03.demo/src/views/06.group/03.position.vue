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


      // 位置属性.position和.getWorldPosition()分别返回模型的本地位置坐标和世界坐标
      // mesh的世界坐标是mesh位置属性.position和mesh父对象group位置属性.position的累加
      var mesh = new THREE.Mesh(
        new THREE.BoxGeometry( 100, 100, 100 ),
        new THREE.MeshLambertMaterial( {color: 0x00ffff} ),
      )
      // mesh的本地坐标设置为(50, 0, 0)
      mesh.position.set(50, 0, 0);

      var group = new THREE.Group();
      // group本地坐标设置和mesh一样设置为(50, 0, 0)
      // mesh父对象设置position会影响得到mesh的世界坐标
      group.position.set(50, 0, 0);
      group.add(mesh);
      this.scene.add(group);


      // .position属性获得本地坐标
      console.log('本地坐标',mesh.position);

      // getWorldPosition()方法获得世界坐标
      //该语句默认在threejs渲染的过程中执行,如果渲染之前想获得世界矩阵属性、世界位置属性等属性，需要通过代码更新
      this.scene.updateMatrixWorld(true);
      var worldPosition = new THREE.Vector3();
      mesh.getWorldPosition(worldPosition);
      console.log('世界坐标',worldPosition);


      // 本地缩放系数.scale
      // 本地矩阵.materix和世界矩阵.matrixWorld
    },
  },
};
</script>

<style scoped></style>
