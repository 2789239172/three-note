<template>
  <div ref="wrapper"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import nor1 from '@/assets/normal.jpg'
import nor2 from '@/assets/normal2.png'
import d from '@/assets/di.jpg'
import aotu from '@/assets/aotu.jpg'

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
      //1. TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
      var textureLoader = new THREE.TextureLoader();
      // 立方体网格模型
      var geometry = new THREE.BoxGeometry(100, 100, 100)
      // 加载法线贴图
      var textureNormal = textureLoader.load(nor1);
      var material = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        normalMap: textureNormal, //法线贴图
        //设置深浅程度，默认值(1,1)。
        normalScale: new THREE.Vector2(3, 3),
      }); //材质对象Material
      var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      mesh.position.set(-200, 200, 0)
      this.scene.add(mesh)


      //2. 普通贴图可以和法线贴图一起使用
      var geometry = new THREE.SphereGeometry(100, 25, 25); //球体
      // 加载纹理贴图
      var texture = textureLoader.load(d);
      // 加载法线贴图
      var textureNormal = textureLoader.load(nor2);
      var material = new THREE.MeshPhongMaterial({
        map:  texture, // 普通颜色纹理贴图
        normalMap: textureNormal, //法线贴图
        //设置深浅程度，默认值(1,1)。
        normalScale: new THREE.Vector2(1.2, 1.2),
      }); //材质对象Material
      mesh = new THREE.Mesh(geometry, material)
      this.scene.add(mesh)


      // 3. 
      var textureLoader = new THREE.TextureLoader();
      // 加载颜色纹理贴图
      // var texture = textureLoader.load('./凹凸贴图/diffuse.jpg');
      // 加载凹凸贴图
      var textureBump = textureLoader.load(aotu);
      var material = new THREE.MeshPhongMaterial({
        // map: textureBump,// 普通纹理贴图
        color: 0xff0000,
        bumpMap:textureBump,//凹凸贴图
        bumpScale:3,//设置凹凸高度，默认值1。
      }); //材质对象Material
      mesh.position.set(200, 200, 0)
      mesh = new THREE.Mesh(geometry, material)
      this.scene.add(mesh)
    },
  },
};
</script>

<style scoped></style>
