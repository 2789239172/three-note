<template>
  <div style="width: 100%; height: 100%; position: relative">
    <three-box ref="threeBox" :options="threeOptions" />
    <!-- <loading class="loading"/> -->
  </div>
</template>
<script>
import assets from "./js/assets";
import threeBox from "@/components/threeBox";
import loading from "./components/loading.vue";
import './js/a'
console.log('a', a)
export default {
  name: "",
  components: { threeBox, loading },
  data() {
    return {
      name: "parent",
      w: 30000,
      threeOptions: {
        camera: [0, 500, 5000],
        AxisHelperNum: 1500,
        point: [0, 4000, 4000],
        cameraFar: Number.MAX_SAFE_INTEGER,
        helper: true,
      },
    };
  },
  async mounted() {
    const THREE = this.$THREE;

    // 天空盒子
    const skyBox = this.$addSkyBox(assets.skyBoxPaths, this.w, [
      0,
      this.w / 2,
      0,
    ]);
    skyBox.material[3].map.wrapS = THREE.RepeatWrapping;
    skyBox.material[3].map.wrapT = THREE.RepeatWrapping;
    skyBox.material[3].map.repeat.set(
      Math.ceil(this.w / 1000),
      Math.ceil(this.w / 1000)
    );

    // boxHelper
    this.boxHelper = new THREE.BoxHelper(this.camera, 0xff0000);
    this.boxHelper.visible = false;
    this.$scene.add(this.boxHelper);

    const addHelper = (obj) => {
      console.log(obj);
      this.boxHelper.setFromObject(obj);
      this.boxHelper.update();
      this.boxHelper.visible = true;
    };
    const removeHelper = () => (this.boxHelper.visible = false);

    // 居民楼
    // this.$loadModel(assets.jb).then(resBuilding => {
    //   this.$scene.add(resBuilding)
    // })

    // 绘制道路
    let texture = this.$loadTexture("/chartlet/way.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // uv两个方向纹理重复数量
    texture.repeat.set(0.01, 0.01);

    var shape = new THREE.Shape();
    /**四条直线绘制一个矩形轮廓*/
    shape.moveTo(0, 0); //起点
    shape.lineTo(0, 20); //第2点
    shape.lineTo(5, 20); //第3点
    shape.lineTo(5, 0); //第4点
    shape.lineTo(0, 0); //第5点

    // var curve = new THREE.CatmullRomCurve3([
    //   new THREE.Vector3(0, 0, 0),
    //   new THREE.Vector3(0, 0, 5000),
    //   new THREE.Vector3(5000, 0, 5000),
    //   // new THREE.Vector3(-5, 0, 100),
    // ]);
    // CurvePath多段路径生成管道案例
    // 绘制一个U型轮廓
    var R = 80; //圆弧半径
    var arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
    // 半圆弧的一个端点作为直线的一个端点
    var line1 = new THREE.LineCurve(
      new THREE.Vector2(R, 200, 0),
      new THREE.Vector2(R, 0, 0)
    );
    var line2 = new THREE.LineCurve(
      new THREE.Vector2(-R, 0, 0),
      new THREE.Vector2(-R, 200, 0)
    );
    // 创建组合曲线对象CurvePath
    var CurvePath = new THREE.CurvePath();
    // 把多个线条插入到CurvePath中
    CurvePath.curves.push(line1, arc, line2);

    var geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(CurvePath.getPoints(100));
    var material = new THREE.LineBasicMaterial({
      color: 0xff0000,
    });
    var line = new THREE.Line(geometry, material);
    this.$scene.add(line);
    var geometry = new THREE.ExtrudeGeometry( //拉伸造型
      shape, //二维轮廓
      //拉伸参数
      {
        // amount: 120, //拉伸长度
        extrudePath: CurvePath, //选择扫描轨迹
        bevelEnabled: false, //无倒角
        steps: 50, //扫描方向细分数
      }
    );
    var material = new THREE.MeshLambertMaterial({
      // color: 0x0000ff,
      map: texture,
      side: THREE.DoubleSide,
      // size:5.0//点对象像素尺寸
    }); //材质对象

    var mesh = new THREE.Mesh(geometry, material); //点模型对象
    mesh.position.set(0, 5, 0);
    this.$scene.add(mesh); //点模型添加到场景中

    /**
     * 2. 创建扫描网格模型
     */
    // var shape = new THREE.Shape();
    // /**四条直线绘制一个矩形轮廓*/
    // shape.moveTo(0, 0); //起点
    // shape.lineTo(0, 10); //第2点
    // shape.lineTo(10, 10); //第3点
    // shape.lineTo(10, 0); //第4点
    // shape.lineTo(0, 0); //第5点
    // /**创建轮廓的扫描轨迹(3D样条曲线)*/
    // var curve = new THREE.CatmullRomCurve3([
    //   new THREE.Vector3(-10, -50, -50),
    //   new THREE.Vector3(10, 0, 0),
    //   new THREE.Vector3(8, 50, 50),
    //   new THREE.Vector3(-5, 0, 100),
    // ]);
    // var geometry = new THREE.ExtrudeGeometry( //拉伸造型
    //   shape, //二维轮廓
    //   //拉伸参数
    //   {
    //     bevelEnabled: false, //无倒角
    //     extrudePath: curve, //选择扫描轨迹
    //     steps: 50, //扫描方向细分数
    //   }
    // );
    // var material = new THREE.MeshLambertMaterial({
    //   color: 0x0000ff,
    //   // size:5.0//点对象像素尺寸
    // }); //材质对象
    // var mesh = new THREE.Mesh(geometry, material); //点模型对象
    // mesh.position.set(300, 0, 0)
    // this.scene.add(mesh); //点模型添加到场景中
  },
  methods: {
    $THREE_RENDER() {},
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
</style>
