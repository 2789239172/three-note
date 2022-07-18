<template>
  <div ref="wrapper"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ParametricGeometries } from "three/examples/jsm/geometries/ParametricGeometries.js";
import helvetiker_regular from "three/examples/fonts/helvetiker_regular.typeface.json"
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js'
import { Font } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm//geometries/TextGeometry.js'
console.log('THREE.ParametricGeometries', ParametricGeometries)
export default {
  name: "",
  components: {},
  data() {
    return {
      AxisHelperNum: 200,
    };
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
      this.camera.position.set(0, 50, 2000); //设置相机位置
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
      //1. 网格模型对象Mesh
      var mesh1 = new THREE.Mesh(
        // 立方体网格模型
        new THREE.BoxGeometry(100, 100, 100),

        //材质对象Material
        new THREE.MeshLambertMaterial({ color: 0x0000ff })
      );
      mesh1.position.set(-200, 150, 0);
      //网格模型添加到场景中
      this.scene.add(mesh1);

      //2. 球几何体
      var mesh2 = new THREE.Mesh(
        new THREE.SphereGeometry(60, 40, 40),
        new THREE.MeshLambertMaterial({ color: 0xff00ff })
      );
      mesh2.translateY(150);
      this.scene.add(mesh2);

      // 3. 圆柱网格模型
      var mesh3 = new THREE.Mesh(
        new THREE.CylinderGeometry(50, 50, 100, 25),
        new THREE.MeshLambertMaterial({ color: 0xffff00 })
      );
      mesh3.position.set(200, 150, 0);
      this.scene.add(mesh3);

      // 4. 圆形几何体
      var mesh4 = new THREE.Mesh(
        new THREE.CircleGeometry(50, 20),
        new THREE.MeshLambertMaterial({ color: 0xffff00, side: THREE.DoubleSide })
      );
      mesh4.position.set(-200, 0, 0);
      this.scene.add(mesh4);

      // 5. 圆锥几何体
      var mesh4 = new THREE.Mesh(
        new THREE.ConeGeometry(50, 60, 50),
        new THREE.MeshLambertMaterial({ color: 0xbbaaff })
      );
      mesh4.position.set(0, 0, 0);
      this.scene.add(mesh4);

      // 6. 十二面几何体
      var mesh4 = new THREE.Mesh(
        new THREE.DodecahedronGeometry(60),
        new THREE.MeshLambertMaterial({ color: 0xaabbff })
      );
      mesh4.position.set(200, 0, 0);
      this.scene.add(mesh4);

      // 7. 边缘几何体, 作为一个辅助对象来查看Geometry的边缘。
      var geometry = new THREE.DodecahedronGeometry(60);
      var edges = new THREE.EdgesGeometry(geometry);
      var line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0xffffff })
      );
      line.position.set(-200, -150, 0);
      this.scene.add(line);

      // 8. 挤压几何体: 从一条形状路径中，挤压出一个Geometry
      var length = 24,
        width = 24;
      var shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(0, width);
      shape.lineTo(length, width);
      shape.lineTo(length, 0);
      shape.lineTo(0, 0);

      var extrudeSettings = {
        steps: 2,
        depth: 16,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1,
      };

      var mesh = new THREE.Mesh(
        new THREE.ExtrudeGeometry(shape, extrudeSettings),
        new THREE.MeshLambertMaterial({ color: 0x00ff00 })
      );
      mesh.position.set(0, -150, 0);
      this.scene.add(mesh);

      // 9. 二十面几何体
      var mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(60),
        new THREE.MeshLambertMaterial({ color: 0xaabbff })
      );
      mesh.position.set(200, -150, 0);
      this.scene.add(mesh);

      // 10. 车削几何体: 创建具有轴对称性的网格，比如花瓶。车削绕着Y轴来进行旋转
      var points = [];
      for (var i = 0; i < 10; i++) {
        points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
      }
      var lathe = new THREE.Mesh(
        new THREE.LatheGeometry(points),
        new THREE.MeshLambertMaterial({ color: 0xffff00, side: THREE.DoubleSide })
      );
      lathe.position.set(-200, -300, 0);
      this.scene.add(lathe);

      // 11. 二十面几何体
      var mesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(60),
        new THREE.MeshLambertMaterial({ color: 0xaabbff })
      );
      mesh.position.set(0, -300, 0);
      this.scene.add(mesh);

      // 12. 参数化几何体: 生成由参数表示其表面的几何体
      // 报错
      var klein = new THREE.Mesh(
        new ParametricGeometry(ParametricGeometries.klein, 25, 25),
        new THREE.MeshLambertMaterial({ color: 0x00ff00 })
      );
      klein.position.set(200, -300, 0);
      this.scene.add(klein);

      // 12. 平面几何体
      var mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(60, 60),
        new THREE.MeshLambertMaterial({ color: 0xaabbff, side: THREE.DoubleSide })
      );
      mesh.position.set(-200, -450, 0);
      this.scene.add(mesh);

      // 13. 多面几何体
      var verticesOfCube = [
          -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
          -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
      ];

      var indicesOfFaces = [
          2,1,0,    0,3,2,
          0,4,7,    7,3,0,
          0,1,5,    5,4,0,
          1,2,6,    6,5,1,
          2,3,7,    7,6,2,
          4,5,6,    6,7,4
      ];
      var mesh = new THREE.Mesh(
        new THREE.PolyhedronGeometry(verticesOfCube, indicesOfFaces, 60, 1),
        new THREE.MeshLambertMaterial({ color: 0xaabbff })
      );
      mesh.position.set(0, -450, 0);
      this.scene.add(mesh);

      
      // 14. 圆环几何体
      var mesh = new THREE.Mesh(
        new THREE.RingGeometry(10, 60, 30),
        new THREE.MeshLambertMaterial({ color: 0xaabbff, side: THREE.DoubleSide })
      );
      mesh.position.set(200, -450, 0);
      this.scene.add(mesh);

      // 15. 形状几何体: 从一个或多个路径形状中创建一个单面多边形几何体
      var x = 0, y = 0;
      var heartShape = new THREE.Shape();
      heartShape.moveTo( x + 5, y + 5 );
      heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
      heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
      heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
      heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
      heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
      heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

      var mesh = new THREE.Mesh(
        new THREE.ShapeGeometry(heartShape),
        new THREE.MeshLambertMaterial({ color: 0xaabbff , side: THREE.DoubleSide})
      );
      mesh.position.set(-200, -600, 0);
      this.scene.add(mesh);

      // 16. 四面几何体
      var mesh = new THREE.Mesh(
        new THREE.TetrahedronGeometry(60),
        new THREE.MeshLambertMaterial({ color: 0xaabbff })
      );
      mesh.position.set(0, -600, 0);
      this.scene.add(mesh);

      // 17. 文本几何体
      var geometry = new TextGeometry( 'Hello !', {
        font: new Font(helvetiker_regular),
        size: 80,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
      } );
      var mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshLambertMaterial({ color: 0xaabbff })
      );
      mesh.position.set(150, -650, 0);
      this.scene.add(mesh);

      // 18. 圆环几何体
      var torus = new THREE.Mesh( 
        new THREE.TorusGeometry( 60, 10, 16, 100 ), 
        new THREE.MeshLambertMaterial({ color: 0xaabbff })
      );
      torus.position.set(-200, -750, 0);
      this.scene.add( torus );

      // 19. 圆环扭结几何体: 创建一个圆环扭结，其特殊形状由一对互质的整数，p和q所定义。如果p和q不互质，创建出来的几何体将是一个环面链接。
      var geometry  = new THREE.Mesh( 
        new THREE.TorusKnotGeometry( 60, 10, 100, 16 ), 
        new THREE.MeshLambertMaterial({ color: 0xaabbff })
      );
      geometry.position.set(0, -750, 0);
      this.scene.add( geometry );

      // 20. 管道几何体: 创建一个沿着三维曲线延伸的管道。
      class CustomSinCurve extends THREE.Curve{
        constructor(scale) {
          super()
          this.scale = ( scale === undefined ) ? 1 : scale;
        }
        getPoint = function ( t ) {
          var tx = t * 3 - 1.5;
          var ty = Math.sin( 2 * Math.PI * t );
          var tz = 0;
          return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
        }
      }

      var path = new CustomSinCurve( 10 );
      var mesh = new THREE.Mesh( 
        new THREE.TubeGeometry( path, 20, 2, 8, false ),
       new THREE.MeshLambertMaterial({ color: 0x00ff00 })
      );
      mesh.position.set(200, -750, 0);
      this.scene.add( mesh );

      // 21. 网格几何体: 这个类可以被用作一个辅助物体，来对一个Geometry以线框的形式进行查看
      var geometry = new THREE.SphereGeometry( 100, 100, 100 );
      var wireframe = new THREE.WireframeGeometry( geometry );
      var line = new THREE.LineSegments( wireframe );
      line.material.depthTest = false;
      line.material.opacity = 0.25;
      line.material.transparent = true;
      line.position.set(-200, -950, 0);
      this.scene.add( line );
    },
  },
};
</script>

<style scoped></style>
