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
      // 1. 
      var points = [
        new THREE.Vector2(-50, -50),
        new THREE.Vector2(-60, 0),
        new THREE.Vector2(0, 50),
        new THREE.Vector2(60, 0),
        new THREE.Vector2(50, -50),
        new THREE.Vector2(-50, -50),
      ]
      // 通过顶点定义轮廓
      var shape = new THREE.Shape(points);
      // shape可以理解为一个需要填充轮廓
      // 所谓填充：ShapeGeometry算法利用顶点计算出三角面face3数据填充轮廓
      var geometry = new THREE.ShapeGeometry(shape, 25);
      var material=new THREE.MeshPhongMaterial({
            color:0x0000ff,//三角面颜色
            side:THREE.DoubleSide//两面可见
      });//材质对象
      var mesh=new THREE.Mesh(geometry,material);
      mesh.position.set(-200, 200,0 )
      material.wireframe = true;//线条模式渲染(查看细分数)
      this.scene.add(mesh);


      //2. 通过shpae基类path的方法绘制轮廓（本质也是生成顶点）
      var shape = new THREE.Shape();
      shape.absarc(0,0,100,0,2*Math.PI);//圆弧轮廓
      console.log(shape.getPoints(15));//查看shape顶点数据
      var geometry = new THREE.ShapeGeometry(shape, 25);
      var material=new THREE.MeshPhongMaterial({
            color:0x0000ff,//三角面颜色
            side:THREE.DoubleSide,//两面可见
            wireframe: true
      });//材质对象
      var mesh=new THREE.Mesh(geometry,material);
      mesh.position.set(0, 200,0 )
      this.scene.add(mesh);

      // 3. 通过shpae基类path的方法绘制轮廓（本质也是生成顶点）
      var shape = new THREE.Shape();
      // 四条直线绘制一个矩形轮廓
      shape.moveTo(0,0);//起点
      shape.lineTo(0,100);//第2点
      shape.lineTo(100,100);//第3点
      shape.lineTo(100,0);//第4点
      shape.lineTo(0,0);//第5点
      var geometry = new THREE.ShapeGeometry(shape, 25);
      var material=new THREE.MeshPhongMaterial({
            color:0x0000ff,//三角面颜色
            side:THREE.DoubleSide,//两面可见
            wireframe: true
      });//材质对象
      var mesh=new THREE.Mesh(geometry,material);
      mesh.position.set(200, 200,0 )
      this.scene.add(mesh);


      // 4. shape可以用来绘制外轮廓，也可以用来绘制内轮廓，ShapeGeometry会使用三角形自动填充shape内轮廓和外轮廓中间的中部。
      // 圆弧与直线连接
      var shape = new THREE.Shape(); //Shape对象
      var R = 50;
      // 绘制一个半径为R、圆心坐标(0, 0)的半圆弧
      shape.absarc(0, 0, R, 0, Math.PI);
      //从圆弧的一个端点(-R, 0)到(-R, -200)绘制一条直线
      shape.lineTo(-R, -200);
      // 绘制一个半径为R、圆心坐标(0, -200)的半圆弧
      shape.absarc(0, -200, R, Math.PI, 2 * Math.PI);
      //从圆弧的一个端点(R, -200)到(-R, -200)绘制一条直线
      shape.lineTo(R, 0);
      var geometry = new THREE.ShapeGeometry(shape, 30);
      var material=new THREE.MeshPhongMaterial({
            color:0x0000ff,//三角面颜色
            side:THREE.DoubleSide,//两面可见
            // wireframe: true
      });//材质对象
      var mesh=new THREE.Mesh(geometry,material);
      mesh.position.set(-200, 0 , 0 )
      this.scene.add(mesh);


      // 5. 一个外轮廓圆弧嵌套三个内圆弧轮廓
      var shape = new THREE.Shape(); //Shape对象
      //外轮廓
      shape.arc(0, 0, 100, 0, 2 * Math.PI);
      // 内轮廓1
      var path1 = new THREE.Path();
      path1.arc(0, 0, 40, 0, 2 * Math.PI);
      // 内轮廓2
      var path2 = new THREE.Path();
      path2.arc(80, 0, 10, 0, 2 * Math.PI);
      // 内轮廓3
      var path3 = new THREE.Path();
      path3.arc(-80, 0, 10, 0, 2 * Math.PI);
      //三个内轮廓分别插入到holes属性中
      shape.holes.push(path1, path2, path3);
      var geometry = new THREE.ShapeGeometry(shape, 30);
      var material=new THREE.MeshPhongMaterial({
          color:0x0000ff,//三角面颜色
          side:THREE.DoubleSide,//两面可见
          // wireframe: true
      });//材质对象
      var mesh=new THREE.Mesh(geometry,material);
      mesh.position.set(0, 0 , 0 )
      this.scene.add(mesh);

      // 6. 矩形嵌套矩形或圆弧
      var shape=new THREE.Shape();//Shape对象
      //外轮廓
      shape.moveTo(0,0);//起点
      shape.lineTo(0,100);//第2点
      shape.lineTo(100,100);//第3点
      shape.lineTo(100,0);//第4点
      shape.lineTo(0,0);//第5点

      //内轮廓
      var path=new THREE.Path();//path对象
      // path.arc(50,50,40,0,2*Math.PI);//圆弧
      path.moveTo(20,20);//起点
      path.lineTo(20,80);//第2点
      path.lineTo(80,80);//第3点
      path.lineTo(80,20);//第4点
      path.lineTo(20,20);//第5点
      shape.holes.push(path);//设置内轮廓
      var geometry = new THREE.ShapeGeometry(shape, 30);
      var material=new THREE.MeshPhongMaterial({
          color:0x0000ff,//三角面颜色
          side:THREE.DoubleSide,//两面可见
          // wireframe: true
      });//材质对象
      var mesh=new THREE.Mesh(geometry,material);
      mesh.position.set(200, 0 , 0 )
      this.scene.add(mesh);

      // 7. 多个轮廓同时填充
      // 轮廓对象1
      var shape=new THREE.Shape();
      shape.arc(-50,0,30,0,2*Math.PI);
      // 轮廓对象2
      var shape2=new THREE.Shape();
      shape2.arc(50,0,30,0,2*Math.PI);
      // 轮廓对象3
      var shape3=new THREE.Shape();
      shape3.arc(0,50,30,0,2*Math.PI);
      // 多个shape作为元素组成数组,每一个shpae可以理解为一个要填充的轮廓
      var geometry = new THREE.ShapeGeometry([shape,shape2,shape3], 30);
      var material=new THREE.MeshPhongMaterial({
          color:0x0000ff,//三角面颜色
          side:THREE.DoubleSide,//两面可见
          // wireframe: true
      });//材质对象
      var mesh=new THREE.Mesh(geometry,material);
      mesh.position.set(-200, -400 , 0 )
      this.scene.add(mesh);
    },
  },
};
</script>

<style scoped></style>
