<template>
  <div ref="wrapper"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import aImg from '@/assets/a.jpg'
import mp4 from '@/assets/0.0.mp4'
export default {
  name: "",
  components: {},
  data() {
    return {
      AxisHelperNum: 200,
    };
  },
  mounted() {
    this.createCanvas() 

    // 创建环境
    this.init();

    // 周期渲染
    this.render();

    // 各种几何体测试
    this.createGeometry();
  },
  methods: {
    createCanvas() {
      var canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 128;
      var c = canvas.getContext('2d');
      // 矩形区域填充背景
      c.fillStyle = "#ff00ff";
      c.fillRect(0, 0, 512, 128);
      c.beginPath();
      // 文字
      c.beginPath();
      c.translate(256,64);
      c.fillStyle = "#000000"; //文本填充颜色
      c.font = "bold 48px 宋体"; //字体样式设置
      c.textBaseline = "middle"; //文本与fillText定义的纵坐标
      c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
      c.fillText("呀哈哈, 你发现我啦", 0, 0);

      // document.body.appendChild(canvas)
      this.canvas = canvas
    },
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
      this.aniTexture && (this.aniTexture.offset.x -= 0.06)
      requestAnimationFrame(this.render); //请求再次执行渲染函数render
    },
    createGeometry() {
      // 1. canvas画布对象作为CanvasTexture的参数重建一个纹理对象
      // canvas画布可以理解为一张图片
      var texture = new THREE.CanvasTexture(this.canvas);
      //打印纹理对象的image属性
      // console.log(texture.image);
      //矩形平面
      var geometry = new THREE.PlaneGeometry(128, 32);

      var material = new THREE.MeshPhongMaterial({
        map: texture, // 设置纹理贴图
      });
      // 创建一个矩形平面网模型，Canvas画布作为矩形网格模型的纹理贴图
      var mesh = new THREE.Mesh(geometry, material);
      this.scene.add(mesh)


      // 2. canvas画布加载图片
      var canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 128;
      var ctx = canvas.getContext('2d');
      var Image = document.createElement('img');
      var texture = new THREE.CanvasTexture(canvas);
      Image.src = aImg;
      Image.onload = function() {
        var bg = ctx.createPattern(Image, "no-repeat");
        ctx.rect(0,0,canvas.width, canvas.height);
        ctx.fillStyle=bg;
        ctx.fill();
        texture.needsUpdate = true;
      }
      //矩形平面
      var geometry = new THREE.PlaneGeometry(128, 32);
      var material = new THREE.MeshPhongMaterial({
        map: texture, // 设置纹理贴图
      });
      // 创建一个矩形平面网模型，Canvas画布作为矩形网格模型的纹理贴图
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 200, 0)
      this.scene.add(mesh)


      // 3. 视频作为Three.js纹理贴图
      // 创建video对象
      let video = document.createElement('video');
      video.src = mp4; // 设置视频地址
      video.autoplay = "autoplay"; //要设置播放
      video.loop = true
      // video对象作为VideoTexture参数创建纹理对象
      var vtexture = new THREE.VideoTexture(video)
      var geometry = new THREE.PlaneGeometry(108, 71); //矩形平面
      var material = new THREE.MeshPhongMaterial({
        map: vtexture, // 设置纹理贴图
      }); //材质对象Material
      var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      mesh.position.set(250, 0, 0)
      this.scene.add(mesh); //网格模型添加到场景中

    },
  },
};
</script>

<style scoped></style>
