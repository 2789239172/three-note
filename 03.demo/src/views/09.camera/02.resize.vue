<template>
<div>
    <div class="wrapper" ref="wrapper"></div>
  <div>
      <el-button @click="toggleCamera(false)"
        >正投影 {{ cameraFlag ? "" : "(←)" }}</el-button>
      <el-button @click="toggleCamera(true)"
        >透视投影 {{ cameraFlag ? "(←)" : '' }}</el-button>
    </div>
</div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default {
  name: "",
  components: {},
  data() {
    return {
      AxisHelperNum: 800,
      cameraFlag: true
    };
  },
  mounted() {
    console.log('mounted')
    // 创建环境
    this.init();

    // 各种几何体测试
    this.createGeometry();
    this.toggleCamera(false)
    // 周期渲染
    this.render();


    this.resize = () => {
      this.renderer.domElement.style.display = 'none'
      var width = this.$refs.wrapper.offsetWidth; //窗口宽度
      var height = this.$refs.wrapper.offsetHeight; //窗口高度
      let k = width / height;//窗口宽高比
      var s = 1500; //三维场景显示范围控制系数，系数越大，显示的范围越大
      this.renderer.setSize(width,  height);

      if (this.cameraFlag) {
        this.camera.aspect = k
      } else {
        // 重置相机投影的相关参数
        this.camera.left = -s*k;
        this.camera.right = s*k;
        this.camera.top = s;
        this.camera.bottom = -s;
      }
      // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
      // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
      // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
      this.camera.updateProjectionMatrix ();
      setTimeout(() => {
        this.renderer.domElement.style.display = 'block'
      }) 
    }
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
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
      // //创建相机对象
      // this.camera = new THREE.PerspectiveCamera(45, k, 1, 10000);
      // this.camera.position.set(0, 50, 2000); //设置相机位置
      // this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)

      // 创建渲染器对象
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height); //设置渲染区域尺寸
      this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
      this.$refs.wrapper.appendChild(this.renderer.domElement); //body元素中插入canvas对象


      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      this.scene.add(new THREE.AxisHelper(this.AxisHelperNum));
    },
    render() {
      this.renderer.render(this.scene, this.camera); //执行渲染操作
      requestAnimationFrame(this.render); //请求再次执行渲染函数render
    },
    createGeometry() {
      var geometry = new THREE.BoxGeometry(500,500, 500);
      var material = new THREE.MeshLambertMaterial({
        color: 0x39c5bb
      }); //材质对象Material
      var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      this.scene.add(mesh); //网格模型添加到场景中
    },
    PerspectiveCamera() {
      console.log('透视')
      // 相机设置
      var width = this.$refs.wrapper.offsetWidth; //窗口宽度
      var height = this.$refs.wrapper.offsetHeight; //窗口高度
      var k = width / height; //窗口宽高比
      //创建相机对象
      this.camera = new THREE.PerspectiveCamera(45, k, 1, 10000);
      this.camera.position.set(0, 50, 2000); //设置相机位置
      this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
    },
    OrthographicCamera() {
      console.log('正')
      // 相机设置
      var width = this.$refs.wrapper.offsetWidth; //窗口宽度
      var height = this.$refs.wrapper.offsetHeight; //窗口高度
      var k = width / height; //窗口宽高比
      var s = 1500; //三维场景显示范围控制系数，系数越大，显示的范围越大
      //创建相机对象
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 10000);
      this.camera.position.set(0, 50, 500); //设置相机位置
      this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
    },
    toggleCamera(flag) {
      this.camera && this.scene.remove(this.camera)
      if (flag) {
        this.PerspectiveCamera()
      } else {
        this.OrthographicCamera()
      }
      this.cameraFlag = flag
      // 鼠标操控
      this.controls = new OrbitControls(this.camera, this.renderer.domElement); //创建控件对象
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
