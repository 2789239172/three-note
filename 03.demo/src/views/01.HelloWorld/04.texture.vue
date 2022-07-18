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
      //1. 常用属性: 球体网格模型
      var mesh1 = new THREE.Mesh(
        new THREE.TorusKnotGeometry( 60, 10, 100, 16 ),
        new THREE.MeshLambertMaterial({ 
          color: 0x0000ff,  // 材质颜色  
          opacity:0.1,        // 透明度设置，0表示完全透明，1表示完全不透明         
          wireframe: true,  // 将几何图形渲染为线框   
          transparent:true  // 是否开启透明  
         })
      );
      mesh1.position.set(-200, 150, 0);
      this.scene.add(mesh1);

      //2. 漫反射: 球体网格模型
      var mesh1 = new THREE.Mesh(
        new THREE.TorusKnotGeometry( 60, 10, 100, 16 ),
        new THREE.MeshLambertMaterial({ color: 0x0000ff, })
      );
      mesh1.position.set(0, 150, 0);
      this.scene.add(mesh1);

      //3. 镜面反射: 球体网格模型 (高光: 镜面反射产生的局部高亮效果)
      var mesh1 = new THREE.Mesh(
        new THREE.TorusKnotGeometry( 60, 10, 100, 16 ),
        new THREE.MeshPhongMaterial({
           color: 0x0000ff,
           specular: 0xffbbaa //高光颜色: 颜色的RGB值会与光照颜色的RGB分量相乘
         })
      );
      mesh1.position.set(200, 150, 0);
      this.scene.add(mesh1);


      // 4. 基础网格材质: 不受光照影响的材质
      var mesh1 = new THREE.Mesh(
        new THREE.TorusKnotGeometry( 60, 10, 100, 16 ),
        new THREE.MeshBasicMaterial({color: 0x0000ff,})
      );
      mesh1.position.set(-200, 0, 0);
      this.scene.add(mesh1);

      // 5. PBR物理材质: 相比较高光Phong材质可以更好的模拟金属、玻璃等效果
      var mesh1 = new THREE.Mesh(
        new THREE.TorusKnotGeometry( 60, 10, 100, 16 ),
        new THREE.MeshStandardMaterial({color: 0x0000ff,})
      );
      mesh1.position.set(0, 0, 0);
      this.scene.add(mesh1);

      // ...
    },
  },
};
</script>

<style scoped></style>
