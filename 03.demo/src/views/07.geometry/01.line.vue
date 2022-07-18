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
      // getPoints 获取顶点
      var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
      //参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
      var arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI);
      //getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
      var points = arc.getPoints(50);//分段数50，返回51个顶点
      // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
      geometry.setFromPoints(points);
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0x000000
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      this.scene.add(line); //线条对象添加到场景中


      // 通过三角函数计算生成圆弧线上的顶点
      var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
      var R = 100; //圆弧半径
      var N = 50; //分段数量
      // 批量生成圆弧上的顶点数据
      var vertices = []
      for (var i = 0; i <= N; i++) {
        var angle = 2 * Math.PI / N * i;
        var x = R * Math.sin(angle);
        var y = R * Math.cos(angle);
        vertices.push(x, y, 0);
      }
      geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(vertices), 3 ) );
      //材质对象
      var material = new THREE.LineBasicMaterial({
        color: 0x000000
      });
      //线条模型对象
      var line = new THREE.Line(geometry, material);
      line.position.set(200, 0, 0)
      this.scene.add(line); //线条对象添加到场景中


      // 绘制直线
      var p1 = [50, 0, 0]; //顶点1坐标
      var p2 = [0, 70, 0]; //顶点2坐标
      var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
      // 创建属性缓冲区对象
      var attribue = new THREE.BufferAttribute(new Float32Array([...p1, ...p2]), 3); //3个为一组，表示一个顶点的xyz坐标
      // 设置几何体attributes属性的位置属性
      geometry.attributes.position= attribue

      var material = new THREE.LineBasicMaterial({
        color: 0xffff00,
      });//材质对象

      //线条模型对象
      var line = new THREE.Line(geometry, material);
      this.scene.add(line); //线条对象添加到场景中


      // 通过LineCurve3绘制一条三维直线
      var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
      var p1 = new THREE.Vector3(100, 0, 0); //顶点1坐标
      var p2 = new THREE.Vector3(0, 100, -50); //顶点2坐标
      // 三维直线LineCurve3
      var LineCurve = new THREE.LineCurve3(p1, p2);

      var pointArr = LineCurve.getPoints(10);
      geometry.setFromPoints(pointArr);
      var material = new THREE.LineBasicMaterial({
        color: 0xff00ff,
      });//材质对象
      var line = new THREE.Line(geometry, material);
      this.scene.add(line); //线条对象添加到场景中

      // 二维直线LineCurve
      var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
      var LineCurve = new THREE.LineCurve(new THREE.Vector2(50, 0), new THREE.Vector2(0, 250));
      var pointArr = LineCurve.getPoints(10);
      geometry.setFromPoints(pointArr);
      var material = new THREE.LineBasicMaterial({
        color: 0x00ffff,
      });//材质对象
      var line = new THREE.Line(geometry, material);
      this.scene.add(line); //线条对象添加到场景中
    },
  },
};
</script>

<style scoped></style>
