<template>
  <div style="width: 100%; height: 100%; position: relative">
    <three-box ref="threeBox" :options="threeOptions" />
  </div>
</template>

<script>
import threeBox from "@/components/threeBox";

export default {
  name: "",
  components: { threeBox },
  data() {
    return {
      name: "parent",
      w: 30000,
      threeOptions: {
        camera: [0, 500, 500],
        AxisHelperNum: 1500,
        point: [0, 4000, 4000],
        cameraFar: Number.MAX_SAFE_INTEGER,
        helper: true,
      },
    };
  },
  async mounted() {
    const THREE = this.$THREE;

    // 创建一个模型，用于沿着三维曲线运动
    var box = new THREE.BoxGeometry(5, 5, 5);
    var material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
    }); //材质对象
    var mesh = new THREE.Mesh(box, material);
    this.$scene.add(mesh);
    mesh.position.set(-10, -50, -50);
    
    // 通过类CatmullRomCurve3创建一个3D样条曲线
    var curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, -50, -50),
      new THREE.Vector3(10, 0, 0),
      new THREE.Vector3(8, 50, 50),
      new THREE.Vector3(-5, 0, 100)
    ]);
    // 样条曲线均匀分割100分，返回51个顶点坐标
    var points = curve.getPoints(100);
    console.log('points', points);//控制台查看返回的顶点坐标
    var geometry = new THREE.BufferGeometry()
    geometry.setFromPoints(points)

    var material = new THREE.LineBasicMaterial({
      color: 0x4488ff
    });
    var line = new THREE.Line(geometry, material);
    this.$scene.add(line)


    // 通过Threejs的帧动画相关API播放网格模型沿着曲线做动画运动
    // 声明一个数组用于存储时间序列
    let arr = []
    for (let i = 0; i < 101; i++) {
      arr.push(i)
    }
    // 生成一个时间序列
    var times = new Float32Array(arr);

    var posArr = []
    points.forEach(elem => {
      posArr.push(elem.x, elem.y, elem.z)
    });
    // 创建一个和时间序列相对应的位置坐标系列
    var values = new Float32Array(posArr);
    // 创建一个帧动画的关键帧数据，曲线上的位置序列对应一个时间序列
    var posTrack = new THREE.KeyframeTrack('.position', times, values);
    let duration = 101;
    let clip = new THREE.AnimationClip("default", duration, [posTrack]);
    var mixer = new THREE.AnimationMixer(mesh);
    let AnimationAction = mixer.clipAction(clip);
    AnimationAction.timeScale = 20;
    AnimationAction.play();
    this.mixer = mixer
    this.clock = new THREE.Clock()
  },
  methods: {
    $THREE_RENDER() {
      if (this.mixer) {
        this.mixer.update(this.clock.getDelta());
      }
    },
  },
};
</script>

<style scoped></style>
