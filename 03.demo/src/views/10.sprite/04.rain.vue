<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import treeImg from "@/assets/tree.png";
import cao from "@/assets/cao.jpg";
import rain from "@/assets/rain.png";

export default {
  name: "",
  components: {},
  data() {
    return {
      AxisHelperNum: 800,
      cameraFlag: true,
    };
  },
  mounted() {
    // 创建环境
    this.init();

    // 各种几何体测试
    this.createGeometry();

    // 周期渲染
    this.render();
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

      // // 相机设置
      var width = this.$refs.wrapper.offsetWidth; //窗口宽度
      var height = this.$refs.wrapper.offsetHeight; //窗口高度
      var k = width / height; //窗口宽高比
      //创建相机对象
      this.camera = new THREE.PerspectiveCamera(45, k, 1, 10000);
      this.camera.position.set(0, 50, 1000); //设置相机位置
      this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)

      // 创建渲染器对象
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height); //设置渲染区域尺寸
      this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
      this.$refs.wrapper.appendChild(this.renderer.domElement); //body元素中插入canvas对象

      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      this.scene.add(new THREE.AxisHelper(this.AxisHelperNum));
      // 鼠标操控
      this.controls = new OrbitControls(this.camera, this.renderer.domElement); //创建控件对象
    },
    render() {
       // 每次渲染遍历雨滴群组，刷新频率30~60FPS，两帧时间间隔16.67ms~33.33ms
        // 每次渲染都会更新雨滴的位置，进而产生动画效果
        this.group.children.forEach(sprite => {
          // 雨滴的y坐标每次减1
          sprite.position.y -= 1;
          if (sprite.position.y < 0) {
            // 如果雨滴落到地面，重置y，从新下落
            sprite.position.y = 500;
          }
  });
      this.renderer.render(this.scene, this.camera); //执行渲染操作
      requestAnimationFrame(this.render); //请求再次执行渲染函数render
    },
    createGeometry() {
      /**
       * 精灵创建树林效果
       */
      // 加载树纹理贴图
      var textureTree = new THREE.TextureLoader().load(treeImg);
      // 批量创建表示一个树的精灵模型
      for (let i = 0; i < 100; i++) {
        var spriteMaterial = new THREE.SpriteMaterial({
          map: textureTree, //设置精灵纹理贴图
        });
        // 创建精灵模型对象
        var sprite = new THREE.Sprite(spriteMaterial);
        this.scene.add(sprite);
        // 控制精灵大小,
        sprite.scale.set(100, 100, 1); //// 只需要设置x、y两个分量就可以
        var k1 = Math.random() - 0.5;
        var k2 = Math.random() - 0.5;
        // 设置精灵模型位置，在xoz平面上随机分布
        sprite.position.set(1000 * k1, 50, 1000 * k2);
      }


      /**
       * 创建一个草地地面
       */
      var geometry = new THREE.PlaneGeometry(1000, 1000); //矩形平面
      // 加载草地纹理贴图
      var texture = new THREE.TextureLoader().load(cao);
      // 设置纹理的重复模式
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      // uv两个方向纹理重复数量
      // texture.repeat.set(10, 10);
      var material = new THREE.MeshLambertMaterial({
        color: 0x777700,
        map:texture,
      });
      var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      this.scene.add(mesh); //网格模型添加到场景中
      mesh.rotateX(-Math.PI/2);


      /**
       * 精灵创建下雨效果
       */
      // 加载雨滴理贴图
      var textureTree = new THREE.TextureLoader().load(rain);
      // 创建一个组表示所有的雨滴
      var group = new THREE.Group();
      // 批量创建表示雨滴的精灵模型
      for (let i = 0; i < 10000; i++) {
        var spriteMaterial = new THREE.SpriteMaterial({
          map:textureTree,//设置精灵纹理贴图
        });
        // 创建精灵模型对象
        var sprite = new THREE.Sprite(spriteMaterial);
        // this.scene.add(sprite);
        // 控制精灵大小,
        sprite.scale.set(8, 10, 1); //// 只需要设置x、y两个分量就可以
        var k1 = Math.random() - 0.5;
        var k2 = Math.random() - 0.5;
        var k3 = Math.abs(Math.random() - 0.5);
        // 设置精灵模型位置，在整个空间上上随机分布
        sprite.position.set(1000 * k1, 1000*k3, 1000 * k2)
        group.add(sprite);
      }
      this.scene.add(group);
      this.group = group
    },
  },
};
</script>

<style scoped>
.box-card {
  position: absolute;
}
</style>
