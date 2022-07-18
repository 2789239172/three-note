<template>
  <div ref="wrapper" @mousemove="mouseMove" @mouseover="flag=true" @mouseout="flag=false"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ParametricGeometries } from "three/examples/jsm/geometries/ParametricGeometries.js";

console.log("THREE.ParametricGeometries", ParametricGeometries);
export default {
  name: "",
  components: {},
  data() {
    return {
      AxisHelperNum: 2500,
      flag: false
    };
  },
  mounted() {
    this.createEvent()
    // 创建环境
    this.init();

    // 周期渲染
    this.render();

    // 各种几何体测试
    this.createGeometry();
    this.createBoxHelper()
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
      this.camera = new THREE.PerspectiveCamera(45, k, 1, Number.MAX_SAFE_INTEGER);
      this.camera.position.set(0, 500, 2500); //设置相机位置
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
    createEvent() {
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
    },
    createBoxHelper() {
      this.boxHelper = new THREE.BoxHelper(this.camera, 0xff0000);
      this.boxHelper.visible = false;
      this.scene.add(this.boxHelper);
    },
    compEvent() {
      if (!this.flag) return 
      // 通过摄像机和鼠标位置更新射线
    	this.raycaster.setFromCamera( this.mouse, this.camera );
      // 计算物体和射线的焦点
	    var intersects = this.raycaster.intersectObjects( this.scene.children );
      if (intersects.length) {
        var obj = intersects[0].object;
        this.boxHelper.setFromObject (obj)
        this.boxHelper.update();
        this.boxHelper.visible = true;
        console.log('intersects', intersects[0].object.name)
      } else {
        this.boxHelper.visible = false;
      }
    },
    render() {
      this.compEvent()
      this.renderer.render(this.scene, this.camera); //执行渲染操作
      requestAnimationFrame(this.render); //请求再次执行渲染函数render
    },
    createGeometry() {
      //1. 网格模型对象Mesh
      var mesh1 = new THREE.Mesh(
        // 立方体网格模型
        new THREE.BoxGeometry(100, 100, 100),

        //材质对象Material
        new THREE.MeshLambertMaterial({ color: 0x0000ff })
      );
      mesh1.position.set(-200, 150, 0);
      mesh1.name = '方'
      //网格模型添加到场景中
      this.scene.add(mesh1);

      //2. 球几何体
      var mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(60, 40, 40),
        new THREE.MeshLambertMaterial({ color: 0xff00ff })
      );
      mesh1.name = '圆'

      mesh2.translateY(150);
      this.scene.add(mesh2);
    },
    mouseMove(event) {
      this.mouse.x = ( event.offsetX / this.$refs.wrapper.offsetWidth ) * 2 - 1;
	    this.mouse.y = - ( event.offsetY / this.$refs.wrapper.offsetHeight ) * 2 + 1;
    },
  },
};
</script>

<style scoped></style>
