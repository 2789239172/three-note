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
      //1. 点模型对象  参数：几何体  点材质
      var point = new THREE.Points(
        //创建一个球体几何对象
        new THREE.SphereGeometry(100, 25, 25),
        // 创建一个点材质对象
        new THREE.PointsMaterial({
          color: 0x0000ff, //颜色
          size: 3, //点渲染尺寸
        })
      );
      point.position.set(-200, 200, 0)
      this.scene.add(point); 

      //02. 线模型对象
      var line = new THREE.Line(
        new THREE.SphereGeometry(100, 25, 25),
        // 直线基础材质对象
        new THREE.LineBasicMaterial({ color: 0x0000ff })
      );
      line.position.set(0, 200, 0)
      this.scene.add(line ); 

      //03. 线模型对象 (这里不晓得为什么不显示虚线)
      var line2 = new THREE.Line(
        //创建一个球体几何对象
        new THREE.SphereGeometry(100, 25, 25),
        // 虚线材质对象：产生虚线效果
        new THREE.LineDashedMaterial({ 
          color: 0x0000ff,
          dashSize: 10,//显示线段的大小。默认为3。
          gapSize: 5,//间隙的大小。默认为1
         })
      );
      line2.computeLineDistances();
      line2.position.set(200, 200, 0)
      this.scene.add(line2); 

      //04. 基础网格材质对象: 不受带有方向光源影响，没有棱角感
      var Mesh = new THREE.Mesh(
        new THREE.SphereGeometry(100, 25, 25),
        new THREE.MeshBasicMaterial({ color: 0x0000ff })
      );
      Mesh.position.set(-200, 0, 0)
      this.scene.add(Mesh); 

      //05. MeshLambertMaterial: 可以实现网格Mesh表面与光源的漫反射光照计算，有了光照计算，物体表面分界的位置才会产生棱角感
      var Mesh = new THREE.Mesh(
        new THREE.SphereGeometry(100, 25, 25),
        new THREE.MeshLambertMaterial({ color: 0x0000ff })
      );
      Mesh.position.set(0, 0, 0)
      this.scene.add(Mesh); 


      //06. 高光网格材质: 可以实现光源和网格表面的漫反射光照计算，还可以产生高光效果(镜面反射)
      var Mesh = new THREE.Mesh(
        new THREE.SphereGeometry(100, 25, 25),
        new THREE.MeshPhongMaterial({ 
          color: 0x0000ff,
          specular:0x444444,//高光部分的颜色
          shininess:20,//高光部分的亮度，默认30
        })
      );
      Mesh.position.set(200, 0, 0)
      this.scene.add(Mesh); 

    },
  },
};
</script>

<style scoped></style>
