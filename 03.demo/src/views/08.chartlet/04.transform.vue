<template>
  <div ref="wrapper"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import aImg from '@/assets/a.jpg'
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
      this.aniTexture && (this.aniTexture.offset.x -= 0.06)
      requestAnimationFrame(this.render); //请求再次执行渲染函数render
    },
    createGeometry() {
      // 1. 重复
      // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
      var textureLoader = new THREE.TextureLoader();
      // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
      textureLoader.load(aImg, texture => {
        // 纹理贴图映射到一个矩形平面上
        var geometry = new THREE.PlaneGeometry(240, 172); //矩形平面
        // 设置阵列模式   默认ClampToEdgeWrapping  RepeatWrapping：阵列  镜像阵列：MirroredRepeatWrapping
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        // uv两个方向纹理重复数量
        texture.repeat.set(4, 2);
        var material = new THREE.MeshLambertMaterial({
          // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
          map: texture,//设置颜色贴图属性值
          side: THREE.DoubleSide
        }); //材质对象Material

        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        mesh.position.set(-300, 300, 0)
        this.scene.add(mesh); //网格模型添加到场景中
      });

      // 2. 偏移
      textureLoader.load(aImg, texture => {
        // 纹理贴图映射到一个矩形平面上
        var geometry = new THREE.PlaneGeometry(240, 172); //矩形平面
        // 不设置重复  偏移范围-1~1
        texture.offset = new THREE.Vector2(-0.2, 0.5)
        var material = new THREE.MeshLambertMaterial({
          // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
          map: texture,//设置颜色贴图属性值
          side: THREE.DoubleSide
        }); //材质对象Material

        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        mesh.position.set(0, 300, 0)
        this.scene.add(mesh); //网格模型添加到场景中
      });

      // 3. 重复 + 偏移
      textureLoader.load(aImg, texture => {
        // 纹理贴图映射到一个矩形平面上
        var geometry = new THREE.PlaneGeometry(240, 172); //矩形平面
        // 设置阵列模式
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        // uv两个方向纹理重复数量
        texture.repeat.set(2, 2);
        // 偏移范围-1~1
        texture.offset = new THREE.Vector2(-0.2, 0.5)
        var material = new THREE.MeshLambertMaterial({
          // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
          map: texture,//设置颜色贴图属性值
          side: THREE.DoubleSide
        }); //材质对象Material

        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        mesh.position.set(300, 300, 0)
        this.scene.add(mesh); //网格模型添加到场景中
      });


      // 4. 旋转
      textureLoader.load(aImg, texture => {
        // 纹理贴图映射到一个矩形平面上
        var geometry = new THREE.PlaneGeometry(240, 172); //矩形平面
        // 设置纹理旋转角度
        texture.rotation = Math.PI/4;
        // 设置纹理的旋转中心，默认(0,0)
        texture.center.set(0.5,0.5)
        console.log('texture.matrix', texture.matrix);
        var material = new THREE.MeshLambertMaterial({
          // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
          map: texture,//设置颜色贴图属性值
          side: THREE.DoubleSide
        }); //材质对象Material

        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        mesh.position.set(-300, 0, 0)
        this.scene.add(mesh); //网格模型添加到场景中
      });

      // 5. 纹理动画, 创建一个设置重复纹理的管道
      var curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-80, -40, 0),
        new THREE.Vector3(-70, 40, 0),
        new THREE.Vector3(70, 40, 0),
        new THREE.Vector3(80, -40, 0)
      ]);
      var tubeGeometry = new THREE.TubeGeometry(curve, 100, 50, 50, false);
      var textureLoader = new THREE.TextureLoader();
      var texture = textureLoader.load(aImg);
      // 设置阵列模式为 RepeatWrapping
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT=THREE.RepeatWrapping
      // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
      //等价texture.repeat= new THREE.Vector2(20,1)
      texture.repeat.x = 20;
      var tubeMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        transparent: true,
      });
      var mesh = new THREE.Mesh(tubeGeometry, tubeMaterial) 
      mesh.position.set(0, 0, 0)
      this.scene.add(mesh); //网格模型添加到场景中
      this.aniTexture = texture
    },
  },
};
</script>

<style scoped></style>
