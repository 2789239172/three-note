<template>
  <div ref="wrapper"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ParametricGeometries } from "three/examples/jsm/geometries/ParametricGeometries.js";
import helvetiker_regular from "three/examples/fonts/helvetiker_regular.typeface.json"
console.log('THREE.ParametricGeometries', ParametricGeometries)
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
      this.camera.position.set(0, 50, 500); //设置相机位置
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
        group.add(Mesh)
        // 网格模型命名
        Mesh.name = "眼睛"
        // mesh父对象对象命名
        group.name = "头"
      */

      // 头部网格模型和组
      var headMesh = this.sphereMesh(10, 0, 0, 0);
      headMesh.name = "脑壳"
      var leftEyeMesh = this.sphereMesh(1, 8, 5, 4);
      leftEyeMesh.name = "左眼"
      var rightEyeMesh = this.sphereMesh(1, 8, 5, -4);
      rightEyeMesh.name = "右眼"
      var headGroup = new THREE.Group();
      headGroup.name = "头部"
      headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);

      // 身体网格模型和组
      var neckMesh = this.cylinderMesh(3, 10, 0, -15, 0);
      neckMesh.name = "脖子"
      var bodyMesh = this.cylinderMesh(14, 30, 0, -35, 0);
      bodyMesh.name = "腹部"

      var leftLegMesh = this.cylinderMesh(4, 60, 0, -80, -7);
      leftLegMesh.name = "左腿"
      var rightLegMesh = this.cylinderMesh(4, 60, 0, -80, 7);
      rightLegMesh.name = "右腿"
      var legGroup = new THREE.Group();
      legGroup.name = "腿"
      legGroup.add(leftLegMesh, rightLegMesh);

      var bodyGroup = new THREE.Group();
      bodyGroup.name = "身体"
      bodyGroup.add(neckMesh, bodyMesh, legGroup);

      // 人Group
      var personGroup = new THREE.Group();
      personGroup.name = "人"
      personGroup.add(headGroup, bodyGroup)
      personGroup.translateY(50)
      this.scene.add(personGroup);


      // 递归遍历方法.traverse()
      this.scene.traverse(function(obj) {
        if (obj.type === "Group") {
          console.log(obj.name);
        }

        if (obj.type === "Mesh") {
          console.log('  ' + obj.name);
          obj.material.color.set(0xffff00);
        }

        if (obj.name === "左眼" | obj.name === "右眼") {
          obj.material.color.set(0x000000)
        }

        // 打印id属性
        console.log(obj.id);
        // 打印该对象的父对象
        console.log(obj.parent);
        // 打印该对象的子对象
        console.log(obj.children);
      })
      // 遍历查找scene中复合条件的子对象，并返回id对应的对象
      var idNode = this.scene.getObjectById ( 4 );
      console.log(idNode);

      // 遍历查找对象的子对象，返回name对应的对象（name是可以重名的，返回第一个）
      var nameNode = this.scene.getObjectByName ( "左腿" );
      nameNode.material.color.set(0xff0000);
    },

    // 球体网格模型创建函数
    sphereMesh(R, x, y, z) {
      var geometry = new THREE.SphereGeometry(R, 25, 25); //球体几何体
      var material = new THREE.MeshPhongMaterial({
        color: 0x0000ff
      }); //材质对象Material
      var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
      mesh.position.set(x, y, z);
      return mesh;
    },

    // 圆柱体网格模型创建函数
    cylinderMesh(R, h, x, y, z) {
      var geometry = new THREE.CylinderGeometry(R, R, h, 25, 25); //球体几何体
      var material = new THREE.MeshPhongMaterial({
        color: 0x0000ff
      }); //材质对象Material
      var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
      mesh.position.set(x, y, z);
      return mesh;
    }
  },
};
</script>

<style scoped></style>
