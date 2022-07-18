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
      //创建管道成型的路径(3D样条曲线)
      var path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-10, -50, -50),
        new THREE.Vector3(10, 0, 0),
        new THREE.Vector3(8, 50, 50),
        new THREE.Vector3(-5, 0, 100)
      ]);

      // path:路径   40：沿着轨迹细分数  2：管道半径   25：管道截面圆细分数
      var geometry = new THREE.TubeGeometry(path, 40, 2, 25);
      var material = new THREE.LineBasicMaterial({
        color: 0xffff00,
      });//材质对象

      //线条模型对象
      var line = new THREE.Line(geometry, material);
      this.scene.add(line)


      // CurvePath多段路径生成管道案例
      // 创建多段线条的顶点数据
      var p1 = new THREE.Vector3(-85.35, -35.36)
      var p2 = new THREE.Vector3(-50, 0, 0);
      var p3 = new THREE.Vector3(0, 50, 0);
      var p4 = new THREE.Vector3(50, 0, 0);
      var p5 = new THREE.Vector3(85.35, -35.36);
      // 创建线条一：直线
      let line1 = new THREE.LineCurve3(p1,p2);
      // 重建线条2：三维样条曲线
      var curve = new THREE.CatmullRomCurve3([p2, p3, p4]);
      // 创建线条3：直线
      let line2 = new THREE.LineCurve3(p4,p5);
      var CurvePath = new THREE.CurvePath();// 创建CurvePath对象
      CurvePath.curves.push(line1, curve, line2);// 插入多段线条
      //通过多段曲线路径创建生成管道
      //通过多段曲线路径创建生成管道，CCurvePath：管道路径
      var geometry2 = new THREE.TubeGeometry(CurvePath, 100, 5, 25, false);
      var material = new THREE.LineBasicMaterial({
        color: 0xff00ff,
      });//材质对象

      //线条模型对象
      var line = new THREE.Line(geometry2, material);
      this.scene.add(line)
    },
  },
};
</script>

<style scoped></style>
