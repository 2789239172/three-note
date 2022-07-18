<template>
  <div>
    <div class="wrapper" ref="wrapper"></div>
    <div>
      <input type="number" v-model="time" /> 
      <el-button @click="play">定位</el-button>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import sImg from "@/assets/s.png";

export default {
  name: "",
  components: {},
  data() {
    return {
      AxisHelperNum: 800,
      cameraFlag: true,
      time: 10,
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
      this.camera.position.set(0, 50, 2000); //设置相机位置
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
      this.mixer.update(this.clock.getDelta());
      this.renderer.render(this.scene, this.camera); //执行渲染操作
      requestAnimationFrame(this.render); //请求再次执行渲染函数render
    },
    play() {
      this.AnimationAction.reset ()
      // 设置播放区间   关键帧数据总时间是20
      this.AnimationAction.time = +this.time; //操作对象设置开始播放时间
      this.clip.duration = +this.time;//剪辑对象设置播放结束时间
      this.AnimationAction.play(); //开始播放
    },
    createGeometry() {
      /**
       * 创建两个网格模型并设置一个父对象group
       */
      var group = new THREE.Group();
      var mesh1 = new THREE.Mesh(
        new THREE.BoxGeometry(100, 100, 100),
        new THREE.MeshLambertMaterial({ color: 0x0000ff })
      );
      var mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(60, 40, 40),
        new THREE.MeshLambertMaterial({ color: 0x0000ff })
      );
      mesh1.name = "Box"; //网格模型1命名
      mesh2.name = "Sphere"; //网格模型2命名
      group.add(mesh1); //网格模型添加到组中
      group.add(mesh2); //网格模型添加到组中
      this.scene.add(group);

      /**
       * 编辑group子对象网格模型mesh1和mesh2的帧动画数据
       */
      // 创建名为Box对象的关键帧数据
      var times = [0, 10]; //关键帧时间数组，离散的时间点序列
      var values = [0, 0, 0, 500, 0, 0]; //与时间点对应的值组成的数组
      // 创建位置关键帧对象：0时刻对应位置0, 0, 0   10时刻对应位置150, 0, 0
      var posTrack = new THREE.KeyframeTrack("Box.position", times, values);
      // 创建颜色关键帧对象：10时刻对应颜色1, 0, 0   20时刻对应颜色0, 0, 1
      var colorKF = new THREE.KeyframeTrack(
        "Box.material.color",
        [10, 20],
        [1, 0, 0, 0, 0, 1]
      );
      // 创建名为Sphere对象的关键帧数据  从0~20时间段，尺寸scale缩放3倍
      var scaleTrack = new THREE.KeyframeTrack(
        "Sphere.scale",
        [0, 20],
        [1, 1, 1, 3, 3, 3]
      );

      // duration决定了默认的播放时间，一般取所有帧动画的最大时间
      // duration偏小，帧动画数据无法播放完，偏大，播放完帧动画会继续空播放
      var duration = 20;
      // 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
      var clip = new THREE.AnimationClip("default", duration, [
        posTrack,
        colorKF,
        scaleTrack,
      ]);

      /**
       * 播放编辑好的关键帧数据
       */
      // group作为混合器的参数，可以播放group中所有子对象的帧动画
      var mixer = new THREE.AnimationMixer(group);
      // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
      var AnimationAction = mixer.clipAction(clip);
      //通过操作Action设置播放方式
      AnimationAction.timeScale = 20; //默认1，可以调节播放速度
      AnimationAction.loop = THREE.LoopOnce; //不循环播放
      AnimationAction.clampWhenFinished = true; //暂停在最后一帧播放的状态
      // 开始结束时间设置为一样，相当于播放时间为0，直接跳转到时间点对应的状态
      AnimationAction.time = 10; //操作对象设置开始播放时间
      clip.duration = AnimationAction.time;//剪辑对象设置播放结束时间
      AnimationAction.play(); //开始播放

      // 创建一个时钟对象Clock
      // 注意在渲染函数render()中执行mixer.update(渲染间隔时间)告诉帧动画系统Threejs两次渲染的时间间隔
      this.clip = clip
      this.clock = new THREE.Clock();
      this.mixer = mixer;
      this.AnimationAction = AnimationAction;
    },
  },
};
</script>

<style scoped>
.box-card {
  position: absolute;
}
.wrapper {
  height: 90%;
  margin-bottom: 10px;
}
</style>
