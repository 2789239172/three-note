<template>
  <div style="width: 100%;height: 100%; position: relative">
    <three-box ref="threeBox" :options="threeOptions" />
    <!-- <loading class="loading"/> -->
    <div class="select-view">
      <p>已选中: </p>
      <p v-for="(item, i) in selectList" :key="i">{{item.uuid}}</p>
    </div>
    <div class="btn-wrapper">
      <el-button type="error" @click="clear">清空</el-button>
      <el-button class="btn" type="success" @click="exportSelect">获取下载地址</el-button>
      <el-button class="btn" type="success" @click="download">下载</el-button>
    </div>
  </div>
</template>

<script>
import assets from "./js/assets";
import threeBox from "@/components/threeBox";
import loading from './components/loading.vue'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'

export default {
  name: "",
  components: { threeBox, loading },
  data() {
    return {
      name: "parent",
      w: 10000,
      threeOptions: {
        camera: [0, 2500, 5000],
        AxisHelperNum: 1500,
        point: [0, 5000, 5000],
        cameraFar: Number.MAX_SAFE_INTEGER,
        helper: true
      },
      selectList: []
    };
  },
  async mounted() {
    const THREE = this.$THREE;

    // boxHelper
    this.boxHelper = new THREE.BoxHelper(this.camera, 0xff0000);
    this.boxHelper.visible = false;
    this.$scene.add(this.boxHelper);
    
    const addHelper = (obj) => {
      this.boxHelper.setFromObject (obj)
      this.boxHelper.update();
      this.boxHelper.visible = true;
    }
    const removeHelper = () => this.boxHelper.visible = false

    // click 
    const toggleList = (obj) => {
      const index = this.selectList.findIndex(item => item.name == obj.name) 

      if (index === -1) {
      console.log('click', index, obj)
        this.selectList.push(obj)
      } else { 
        this.selectList.splice(index, 1)
      }
    }

    // 居民楼
    this.$loadModel(assets.jb).then(resBuilding => {
      console.log('resBuilding', resBuilding)
      this.$scene.add(resBuilding)
      // 辅助线
      resBuilding.children.forEach(item => {
        this.$addEvent(item, 'mouseover', addHelper)
        this.$addEvent(item, 'mouseout', removeHelper)
        this.$addEvent(item, 'click', toggleList)
      });
    })

  },
  methods: {
    $THREE_RENDER() {},
    exportSelect() {
      if (this.exportGroup) this.$scene.remove(this.exportGroup)

      this.exportGroup = new this.$THREE.Group()
      this.exportGroup.position.set(0,0,0)
      this.selectList.forEach(item => {
        this.exportGroup.add(item)
      })
      // this.exportGroup.scale.set(0.02,0.02,0.02)
      // this.exportGroup.rotateX(-Math.PI/2)
      this.$scene.add(this.exportGroup)
      // 将模型的中心点设置到canvas坐标系的中心点，保证模型显示是居中的，object就是操作的目标模型
      let box = new this.$THREE.Box3().setFromObject(this.exportGroup); // 获取模型的包围盒
      let x1 = box.min.x; // 模型中心点坐标X
      let y1 = box.min.y; // 模型中心点坐标Y
      let z1 = box.min.z ; // 模型中心点坐标Z
      this.exportGroup.position.set(-x1, -y1, -z1); // 将模型进行偏移

      // this.$scene.add(this.exportGroup)
      var exporter = new GLTFExporter();

      exporter.parse( this.exportGroup, buffer => {
        var blob = new Blob([buffer]);
        this.downloadUrl = URL.createObjectURL(blob);
         alert('下载地址获取成功: ' + this.downloadUrl)
      }, { binary: true });
    },
    clear() {
      this.selectList = []
    },
    download() {
      if (!this.downloadUrl) return alert('请先获取下载地址')
      let a = document.createElement('a')
      a.href = this.downloadUrl
      a.download = 'file.glb'
      a.click()
    }
  },
};
</script>

<style scoped>
.loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.select-view {
  position: absolute;
  left: 10px;
  bottom: 10px;
  width: 300px;
  height: 200px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.4);
  padding: 10px;
}
.btn-wrapper {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>
