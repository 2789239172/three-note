<template>
  <div
    ref="wrapper"
    class="wrapper"
    @mousemove="updateMouse"
    @mouseover="eventFlag = true"
    @mouseout="eventFlag = false"
    @click="computeClickEvent"
  ></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader  } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader  } from 'three/examples/jsm/loaders/FBXLoader.js';

/*
  1. props
    (1). options
      - 初始化three选项
      - [helper]: 辅助
      - [point]: 点光源位置
      - [ambient]: 环境光颜色
      - [camera]: 相机位置
      - [cameraFar]: 摄像机视锥体远端面
      - [AxisHelperNum]: 辅助线长度,
      - [clearColor]: 背景色,
      - [lookAt]: 摄像头观察位置

  2. 一些类
  $parent.$THREE = THREE;
  $parent.$THREE_EXP = THREE_EXP;
    - three.js 拓展
  $parent.$scene = this.scene;
  $parent.$ambient = this.ambient;
  $parent.$camera = this.camera;
  $parent.$renderer = this.renderer;
  $parent.$labelRenderer = this.labelRenderer;
  $parent.$controls = this.controls;

  3. 一些工具函数
  $parent.$getTextureLoader = this.getTextureLoader
  $parent.$createSphere = this.createSphere 
    - 创建球体
  $parent.$addLabel = this.addLabel
    - 添加标签
  $parent.$addEvent = this.addEvent
    - 添加事件(相同事件不会被覆盖)
    - 支持: click, mouseover, mouseout
    - 也可直接obj.onxxxx添加但多个相同事件会被覆盖
  $parent.$addSkyBox = this.addSkyBox
    - paths: ["px", "nx", "py", "ny", "pz", "nz"] => 图片路径 / 贴图对象
    - dia: 直径 
  $parent.$loadTexture = this.loadTexture
    - 加载贴图
*/
const THREE_EXP = {
  OrbitControls,
  CSS2DRenderer,
  CSS2DObject
};
//
const defaultOptions = {
  // [point]: [0, 50, 2000], // 点光源位置: [x, y, z]
  ambient: 0x444444, // 环境光颜色
  camera: [0, 50, 2000], // 相机位置
  cameraFar: 10000, // 摄像机视锥体远端面
  AxisHelperNum: 200,
  clearColor: 0xb9d3ff,
  lookAt: [0,0,0]
};

export default {
  name: "three-box",
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const _this = this;
    return {
      eventFlag: false,
      loaded: new Promise((reslove) => {
        _this.loadReslove = reslove;
      }),
    };
  },
  created() {
    this.createEvent();
  },
  mounted() {
    this.init();
    this.render();
    this.resizeWatch()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    init() {
      const options = Object.assign({}, defaultOptions, this.options);
      // 创建场景对象Scene
      this.scene = new THREE.Scene();

      //点光源
      if (options.point) {
        this.point = new THREE.PointLight(0xffffff);
        this.point.position.set(...options.point); //点光源位置
        this.scene.add(this.point); //点光源添加到场景中
        if (options.helper) {
          this.pointLightHelper = new THREE.PointLightHelper( this.point, 50 );
          this.scene.add( this.pointLightHelper );
        }
      }

      // 环境光
      this.ambient = new THREE.AmbientLight(options.ambient);
      this.scene.add(this.ambient);

      // 相机设置
      var width = this.$refs.wrapper.offsetWidth; //窗口宽度
      var height = this.$refs.wrapper.offsetHeight; //窗口高度
      var k = width / height; //窗口宽高比
      //创建相机对象
      this.camera = new THREE.PerspectiveCamera(45, k, 1, options.cameraFar);
      this.camera.position.set(...options.camera); //设置相机位置
      this.camera.lookAt(new THREE.Vector3(...options.camera)); //设置相机方向(指向的场景对象)

      // 创建渲染器对象
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height); //设置渲染区域尺寸
      this.renderer.setClearColor(options.clearColor, 1); //设置背景颜色
      this.renderer.domElement.style.position = "absolute";
      this.$refs.wrapper.appendChild(this.renderer.domElement); //body元素中插入canvas对象

      // 创建标签渲染对象
      this.labelRenderer = new CSS2DRenderer()
      this.labelRenderer.setSize(width, height)
      this.labelRenderer.domElement.style.position = 'absolute';
      this.labelRenderer.domElement.style.top = '0px';
      this.labelRenderer.domElement.style.pointerEvents = 'none';
      this.$refs.wrapper.appendChild(this.labelRenderer.domElement); //body元素中插入canvas对象

      // 鼠标操控
      this.controls = new OrbitControls(this.camera, this.renderer.domElement); //创建控件对象

      // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
      if (options.helper) {
        this.scene.add(new THREE.AxisHelper(options.AxisHelperNum));
      }

      this.mouseEventList = [];

      const $parent = this.$parent;
      // 一些类
      $parent.$THREE = THREE;
      $parent.$THREE_EXP = THREE_EXP;
      $parent.$scene = this.scene;
      $parent.$ambient = this.ambient;
      $parent.$camera = this.camera;
      $parent.$renderer = this.renderer;
      $parent.$labelRenderer = this.labelRenderer;
      $parent.$controls = this.controls;

      // 一些工具函数
      $parent.$getTextureLoader = this.getTextureLoader
      $parent.$getGLTFLoader = this.getGLTFLoader
      $parent.$loadModel = this.loadModel
      $parent.$createSphere = this.createSphere
      $parent.$addLabel = this.addLabel
      $parent.$addEvent = this.addEvent
      $parent.$addSkyBox = this.addSkyBox
      $parent.$loadTexture = this.loadTexture
      this.loadReslove();
    },
    render() {
      this.computeMouseEvent();
      this.$parent.$THREE_RENDER && this.$parent.$THREE_RENDER();
      this.renderer.render(this.scene, this.camera); //执行渲染操作
      this.labelRenderer.render( this.scene, this.camera )
      requestAnimationFrame(this.render); //请求再次执行渲染函数render
    },
    createEvent() {
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
    },
    computeMouseEvent() {
      if (!this.eventFlag) return;
      const obj = this.computeEvent();
      if (obj) {
        if (!obj.mouseover) {
          // 判断移入子元素还是移至其他元素
          if (
            this.mouseEventList.length && 
            obj.parent !== this.mouseEventList[this.mouseEventList.length - 1] 
          ) {
            if (obj.parent !== this.mouseEventList[this.mouseEventList.length - 1].parent) {
              this.mouseoverExe(true);
            } else {
              this.mouseoverExe();
            } 
          }

          obj.onmouseover && obj.onmouseover(obj);
          obj.mouseoverEventList && obj.mouseoverEventList.forEach((item) => item(obj));
          obj.mouseover = true;
          this.extParentEvent(obj, 'mouseover')

          this.mouseEventList.push(obj);
        }

        // TODO: mouseMove事件有问题
        // obj.onmousemove && obj.onmousemove()
        // obj.mousemoveEventList && obj.mousemoveEventList.forEach(item => item())
      } else {
        this.mouseoverExe(true);
      }
    },
    mouseoverExe(flag) {
      for (let i = this.mouseEventList.length - 1; i >= 0; i--) {
        const item = this.mouseEventList[i];
        item.onmouseout && item.onmouseout(item);
        item.mouseoutEventList && item.mouseoutEventList.forEach((item) => item());
        item.mouseover = false;
        flag && this.extParentEvent(item, 'mouseout')
      }
      this.mouseEventList = [];
    },
    computeClickEvent() {
      const obj = this.computeEvent();
      if (obj) {
        obj.onclick && obj.onclick(obj);
        obj.clickEventList && obj.clickEventList.forEach((item) => item(obj));
        this.extParentEvent(obj, 'click')
      }
    },
    extParentEvent(obj, eventName) {
      if (!obj.parent) return 

      if (eventName === 'mouseover') {

        if (obj.parent.mouseover) return

        obj.parent.mouseover = true
      }
      if (eventName === 'mouseout') {
        if (!obj.parent.mouseover) return
        obj.parent.mouseover = false
      }

      obj.parent['on' + eventName] && obj.parent['on' + eventName](obj.parent);
      obj.parent[eventName + 'EventList'] && obj.parent[eventName + 'EventList'].forEach((item) => item(obj.parent));
      this.extParentEvent(obj.parent, eventName)
    },
    computeEvent() {
      // 通过摄像机和鼠标位置更新射线
      this.raycaster.setFromCamera(this.mouse, this.camera);
      // 计算物体和射线的焦点
      var intersects = this.raycaster.intersectObjects(
        this.scene.children,
        true
      );
      if (intersects.length) {
        return intersects[0].object;
      }
    },
    updateMouse(event) {
      this.mouse.x = (event.offsetX / this.$refs.wrapper.offsetWidth) * 2 - 1;
      this.mouse.y = -(event.offsetY / this.$refs.wrapper.offsetHeight) * 2 + 1;
    },
    resizeWatch() {
      this.resize = () => {
        var width = this.$refs.wrapper.offsetWidth; //窗口宽度
        var height = this.$refs.wrapper.offsetHeight; //窗口高度
        let k = width / height; //窗口宽高比
        // var s = 1500; //三维场景显示范围控制系数，系数越大，显示的范围越大
        this.camera.aspect = k;
        // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
        this.labelRenderer.setSize( width, height )
      };
      window.addEventListener("resize", this.resize);
    },
    
    getTextureLoader() {
      if (!this.textureLoader) {
        this.textureLoader = new THREE.TextureLoader()
      }
      return this.textureLoader
    },

    getGLTFLoader() {
      if (!this.GLTFLoader) {
        this.GLTFLoader = new GLTFLoader()
      } 
      return this.GLTFLoader
    },

    getObjectLoader() {
      if (!this.ObjectLoader) {
        this.ObjectLoader = new THREE.ObjectLoader()
      } 
      return this.ObjectLoader
    },
    
    getOBJLoader() {
      if (!this.OBJLoader) {
        this.OBJLoader = new OBJLoader()
      } 
      return this.OBJLoader
    },

    getFBXLoader() {
      if (!this.FBXLoader) {
        this.FBXLoader = new FBXLoader()
      } 
      return this.FBXLoader
    },

    loadTexture(path) {
      return this.getTextureLoader().load(path)
    },

    loadModel(path) {
      const suffix = path.split('.').pop()
      const loader = {
        glb: this.getGLTFLoader(),
        json: this.getOBJLoader(),
        obj: this.getOBJLoader(),
        fbx: this.getFBXLoader()
      }
      return new Promise(res => {
        loader[suffix].load(path, (data) => res(data.scene || data))
      }) 
    }, 

    // 工具函数
    addLabel(obj, text, translateY = 0, color) {
      const position = new THREE.Vector3(obj.position.x, obj.position.y + translateY, obj.position.z)
      const el = document.createElement( 'div' );
      el.className = 'three-label';
      el.style.color = color
      el.textContent = text;
      const label = new CSS2DObject( el );
      label.position.copy( position );
      label.translateY = 20
      this.scene.add(label)
      return {
        label,
        el
      }
    },

    addEvent(obj, event, callback) {
      if (obj[event + 'EventList']) {
        obj[event + 'EventList'].push(callback) 
      } else {
        obj[event + 'EventList'] = [callback] 
      }
    },

    addSkyBox(paths, dia = 9000, position = [0, 0, 0]) {
      var materials = []
      if (typeof paths[0] === 'string') {
        const loader = this.getTextureLoader()
        materials = paths.map(item => new THREE.MeshBasicMaterial({
            map:  loader.load(item),
            side: THREE.BackSide
        }))
      } else {
        materials = paths.map(item => new THREE.MeshBasicMaterial({
            map: item,
            side: THREE.BackSide
        }))
      }

      var cube = new THREE.Mesh(
        new THREE.BoxGeometry(dia, dia, dia),
        materials
      )
      cube.position.set(...position)
      cube.name = 'skyBox'
      this.scene.add(cube)
      return cube
    },

    createSphere({r, wS, hS, color = 0xff00ff}) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(r, wS, hS),
        new THREE.MeshLambertMaterial({ color })
      );
      this.scene.add(mesh);
      return mesh
    },  

  },
};
</script>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
</style>
