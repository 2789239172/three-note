<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <p>顶点位置position数据</p>
      </div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 10}"
        placeholder="请输入内容"
        v-model="verticesData">
      </el-input>
    </el-card>
    <el-card class="color-card">
      <div slot="header">
        <p>顶点颜色color数据</p>
      </div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 10}"
        placeholder="请输入内容"
        v-model="colorData">
      </el-input>
    </el-card>
    <div class="wrapper" ref="wrapper"></div>
    <div >
      <el-button @click="restore">刷新</el-button>
      <el-button @click="points">点模型</el-button>
      <el-button @click="line">线模型</el-button>
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
      AxisHelperNum: 200,

      //类型数组创建顶点数据
      verticesData: `0, 0, 0, 
50, 0, 0, 
0, 100, 0, 
0, 0, 10,
0, 0, 100, 
50, 0, 10`,
      colorData: `1, 0, 0, 
0, 1, 0, 
0, 0, 1, 
1, 1, 0, 
0, 1, 1, 
1, 0, 1` 
    };

  },
  computed: {
    vertices() {
      return new Float32Array(this.verticesData.split(',').map(item => +item))
    },
    color() {
      return new Float32Array(this.colorData.split(',').map(item => +item))
    }
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
      this.camera.position.set(0, 300, 1000); //设置相机位置
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
      this.restore()
   },
   restore() {
     this.mesh && this.scene.remove(this.mesh)
      //创建一个Buffer类型几何体对象
      var geometry = new THREE.BufferGeometry(); 
      // 创建属性缓冲区对象
      var attribue = new THREE.BufferAttribute(this.vertices, 3); //3个为一组，表示一个顶点的xyz坐标
      // 设置几何体attributes属性的位置属性
      geometry.attributes.position = attribue;
      geometry.attributes.color = new THREE.BufferAttribute(this.color, 3); //3个为一组,表示一个顶点的颜色数据RGB

      // 三角面(网格)渲染模式
      var material = new THREE.MeshBasicMaterial({
        // color: 0x0000ff, //三角面颜色
       vertexColors: THREE.VertexColors, //以顶点颜色为准
        side: THREE.DoubleSide //两面可见
      }); //材质对象
      this.mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      this.scene.add(this.mesh)
   },
  points() {
    console.log('this.verticesData.split(',').map(item => +item)' , this.vertices)
      this.mesh && this.scene.remove(this.mesh)
      //创建一个Buffer类型几何体对象
      var geometry = new THREE.BufferGeometry(); 
      // 创建属性缓冲区对象
      var attribue = new THREE.BufferAttribute(this.vertices, 3); //3个为一组，表示一个顶点的xyz坐标
      // 设置几何体attributes属性的位置属性
      geometry.attributes.position = attribue;
      // 设置几何体attributes属性的颜色color属性
      geometry.attributes.color = new THREE.BufferAttribute(this.color, 3); //3个为一组,表示一个顶点的颜色数据RGB

      // 三角面(网格)渲染模式
      var material = new THREE.PointsMaterial({
       vertexColors: THREE.VertexColors, //以顶点颜色为准
        size: 20.0
      }); //材质对象
      this.mesh = new THREE.Points(geometry, material); //网格模型对象Mesh
      this.scene.add(this.mesh)
  },
  line() {
      this.mesh && this.scene.remove(this.mesh)
      //创建一个Buffer类型几何体对象
      var geometry = new THREE.BufferGeometry(); 
      // 创建属性缓冲区对象
      var attribue = new THREE.BufferAttribute(this.vertices, 3); //3个为一组，表示一个顶点的xyz坐标
      // 设置几何体attributes属性的位置属性
      geometry.attributes.position = attribue;
      geometry.attributes.color = new THREE.BufferAttribute(this.color, 3); //3个为一组,表示一个顶点的颜色数据RGB

      // 三角面(网格)渲染模式
      var material = new THREE.LineBasicMaterial({
        // color: 0x0000ff, //三角面颜色
       vertexColors: THREE.VertexColors, //以顶点颜色为准
      }); //材质对象
      this.mesh = new THREE.Line(geometry, material); //网格模型对象Mesh
      this.scene.add(this.mesh)
  }
  },
};
</script>

<style scoped>
.box-card,
.color-card {
  position: absolute;
}
.color-card {
  right: 10px;
}
.wrapper {
  height: 90%;
  margin-bottom: 10px;
}
</style>
