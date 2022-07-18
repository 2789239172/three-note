<template>
  <div>
    <div class="wrapper" ref="wrapper"></div>
    <div>
      <el-button @click="toggleAmbient">环境光 ({{ambientFlag ? '开' : '关' }})</el-button>
      <el-button @click="togglePoint">点光源 ({{pointFlag ? '开' : '关' }})</el-button>
      <el-button @click="toggleDirectional">平行光 ({{directionalFlag ? '开' : '关' }})</el-button>
      <el-button @click="toggleSpot">聚光源 ({{spotFlag ? '开' : '关' }})</el-button>
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
      AxisHelperNum: 500,
      ambientFlag: false,
      pointFlag: false,
      directionalFlag: false,
      spotFlag: false
    };
  },
  mounted() {
    // 创建环境
    this.init();
    this.createGeometry()

    // 周期渲染
    this.render();

    // 环境光
    this.toggleAmbient()
  },
  methods: {
    init() {
      // 创建场景对象Scene
      this.scene = new THREE.Scene();

      // 相机设置
      var width = this.$refs.wrapper.offsetWidth; //窗口宽度
      var height = this.$refs.wrapper.offsetHeight; //窗口高度
      var k = width / height; //窗口宽高比
      //创建相机对象
      this.camera = new THREE.PerspectiveCamera(45, k, 1, 10000);
      this.camera.position.set(0, 1500, 2000); //设置相机位置
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
      // 圆
      this.mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(200, 40, 40),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
      );
      this.scene.add(this.mesh2);

      // 平面
      var geometry = new THREE.PlaneGeometry(10000, 10000, 32 );
      var material = new THREE.MeshLambertMaterial( {color: 0xcccccc, side: THREE.DoubleSide} );
      var plane = new THREE.Mesh( geometry, material );
      plane.rotateX(Math.PI / 2)
      plane.position.set(0, -500, 0)
      this.scene.add( plane )
    },

    //环境光: 环境光颜色RGB成分分别和物体材质颜色RGB成分分别相乘
    toggleAmbient() {
      if (this.ambientFlag) {
        this.scene.remove(this.ambient)
      } else {
        this.ambient = new THREE.AmbientLight(0x444444);
        this.scene.add(this.ambient);
      }
      this.ambientFlag = !this.ambientFlag
    },
    
    //点光源
    togglePoint() {
      if (this.pointFlag) {
        this.scene.remove(this.point)
        this.scene.remove(this.pointLightHelper )
      } else { 
        this.point = new THREE.PointLight(0xffffff);
        this.point.position.set(400, 500, 400); //点光源位置
        this.scene.add(this.point); //点光源添加到场景中

        this.pointLightHelper = new THREE.PointLightHelper( this.point, 50 );
        this.scene.add( this.pointLightHelper );
      }
      this.pointFlag = !this.pointFlag
    },

    toggleDirectional() {
      if (this.directionalFlag) {
        this.scene.remove(this.directionalLight)
        this.scene.remove(this.directionalHelper )
      } else { 
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        this.directionalLight.position.set(-200, 300, 500);
        // 方向光指向对象网格模型mesh2，可以不设置，默认的位置是0,0,0
        this.directionalLight.target = this.mesh2;

        this.scene.add(this.directionalLight); //点光源添加到场景中

        this.directionalHelper = new THREE.DirectionalLightHelper( this.directionalLight, 50 );
        this.scene.add( this.directionalHelper );
      }
      this.directionalFlag = !this.directionalFlag
    },
    toggleSpot () {
      if (this.spotFlag) {
        this.scene.remove(this.spotLight)
        this.scene.remove(this.spotHelper )
      } else { 
        this.spotLight = new THREE.SpotLight(0xffffff, 1);
        this.spotLight.position.set(-1000, 300, -800);
        // 通过属性.angle可以设置聚光源发散角度
        this.spotLight.angle = Math.PI / 6
        // 聚光源照射方向设置和平行光光源一样是通过位置.position和目标.target两个属性来实现
        this.spotLight.target = this.mesh2;

        this.scene.add(this.spotLight); //点光源添加到场景中

        this.spotHelper = new THREE.SpotLightHelper( this.spotLight, 50 );
        this.scene.add( this.spotHelper );
      }
      this.spotFlag = !this.spotFlag
        
    }
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
