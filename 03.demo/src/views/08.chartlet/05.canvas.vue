<template>
  <div ref="wrapper"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import aImg from '@/assets/a.jpg'
import mp4 from '@/assets/0.0.mp4'
	function getTextMesh({width, height, bgColor = "#ff00ff", textColor = "#000000", fontSize='12px', text = 'text'}) {
			var canvas = document.createElement("canvas");
			var c = canvas.getContext('2d');

			canvas.width = width;
			canvas.height = height;

			c.clearRect(0, 0, width, height)
			c.beginPath();
			// 矩形区域填充背景
			c.fillStyle = bgColor;
			c.fillRect(0, 0, width, height);
			// c.beginPath();
			// 文字
			c.beginPath();
			c.translate(width / 2, height / 2);
			c.fillStyle = textColor; //文本填充颜色
			c.font = `normal ${fontSize}`; //字体样式设置
			c.textBaseline = "middle"; //文本与fillText定义的纵坐标
			c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
			c.fillText(text, 0, 0);

      //矩形平面
      var geometry = new THREE.PlaneGeometry(width, height);
			var texture = new THREE.CanvasTexture(canvas);

      var material = new THREE.MeshPhongMaterial({
        map: texture, // 设置纹理贴图
      });
      // 创建一个矩形平面网模型，Canvas画布作为矩形网格模型的纹理贴图
      return new THREE.Mesh(geometry, material);
		}
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
    //   		const text = getTextMesh({
		// 	width: 200,
		// 	height: 20,
		// 	text: '测试测试测试测试测试测试测试',
		// 	textColor: '#ffffff',
		// 	bgColor: '#000',
		// 	fontSize: '20px'
		// })
		// this.scene.add(text);
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
    },
  },
};
</script>

<style scoped></style>
