<template>
  <three-box ref="threeBox" :options="threeOptions"></three-box>
</template>

<script>
import threeBox from "@/components/threeBox";
export default {
  name: "",
  components: { threeBox },
  data() {
    return {
      name: "parent",
      threeOptions: {
        ambient: 0x444444, // 环境光颜色
        camera: [0, 50, 2000], // 相机位置
        AxisHelperNum: 300,
        point: [0, 200, 200]
      },
    };
  },
  async mounted() {
    /*
      $parent.$THREE = THREE
      $parent.$THREE_EXP = THREE_EXP
      $parent.$scene = this.scene
      $parent.$ambient = this.ambient
      $parent.$camera = this.camera
      $parent.$renderer = this.renderer
      $parent.$controls = this.controls
      from threeBox
    */
    await this.$refs.threeBox.loaded
    //1. 网格模型对象Mesh
    var mesh1 = new this.$THREE.Mesh(
      // 立方体网格模型
      new this.$THREE.BoxGeometry(100, 100, 100),

      //材质对象Material
      new this.$THREE.MeshLambertMaterial({ color: 0x0000ff })
    );

    mesh1.position.set(-200, 150, 0);
    mesh1.name = "方";

    const {label} = this.$addLabel(mesh1, '方', 90)
    label.visible = false
    this.$scene.add(mesh1);

    mesh1.onclick=() => {
      // console.log("方")
      alert('点击了方块')
    }
    mesh1.onmouseover = () => {
      label.visible = true
      console.log('方: onmouseover')
    }
    mesh1.onmouseout = () => {
      label.visible = false
      console.log('方: onmouseout')
    }

    //2. 球几何体
    var mesh2 = this.$createSphere({r: 60})
    mesh2.translateY(150);
    mesh2.name = "球";
    const {label: label2} = this.$addLabel(mesh2, '球', 90)
    label2.visible = false
    this.$addEvent(mesh2, 'click', () => {
      // console.log("球")
      alert('点击了球')
    })
    this.$addEvent(mesh2, 'mouseover', () => {
      label2.visible = true
      console.log('球: onmouseover')
    })
    this.$addEvent(mesh2, 'mouseout', () => {
      label2.visible = false
      console.log('球: onmouseout')
    })
  },
  methods: {
    $THREE_RENDER() {},
  },
};
</script>

<style scoped></style>
