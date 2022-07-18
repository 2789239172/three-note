import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/layout'

Vue.use(VueRouter)

export const pages = [
  {
    path: '/hello',
    name: 'Hello World',
    component: layout, 
    children: [
      {
        name: '旋转动画',
        path: 'rotate_anim',
        component:  () => import('../views/01.HelloWorld/01.rotate_anim.vue')
      },
      {
        name: '鼠标控制',
        path: 'mouse_control',
        component:  () => import('../views/01.HelloWorld/02.mouse_control.vue')
      },
      {
        name: '更多几何体',
        path: 'more_geometry',
        component:  () => import('../views/01.HelloWorld/03.more_geometry.vue')
      },
      {
        name: '材质效果',
        path: 'texture',
        component:  () => import('../views/01.HelloWorld/04.texture.vue')
      }
    ]
  },
  {
    path: '/peak',
    name: '几何体顶点概念',
    component: layout, 
    children: [
      {
        name: '顶点位置数据解析渲染',
        path: 'position',
        component:  () => import('../views/02.peak/01.position.vue')
      },
      {
        name: '顶点颜色数据插值计算',
        path: 'color',
        component:  () => import('../views/02.peak/02.color.vue')
      },
      {
        name: '顶点法向量数据光照计算',
        path: 'vector',
        component:  () => import('../views/02.peak/03.vector.vue')
      },
      {
        name: '顶点索引复用顶点数据',
        path: 'reuse',
        component:  () => import('../views/02.peak/04.reuse.vue')
      },
      {
        name: '设置Geometry顶点位置、顶点颜色数据',
        path: 'Geometry',
        component:  () => import('../views/02.peak/05.Geometry.vue')
      },
      {
        name: '访问几何体对象的数据',
        path: 'visitGeometryData',
        component:  () => import('../views/02.peak/06.visitGeometryData.vue')
      },
      {
        name: '几何体旋转、缩放、平移变换',
        path: 'transform',
        component:  () => import('../views/02.peak/07.transform.vue')
      },
    ]
  
  },
  {
    path: '/material',
    name: '材质对象',
    component: layout, 
    children: [
      {
        name: '常用材质',
        path: 'position',
        component:  () => import('../views/03.material/01.commonUse.vue')
      },
      {
        name: '材质共有属性, 私有属性',
        path: 'color',
        component:  () => import('../views/03.material/02.property.vue')
      },
    ]
  },
  {
    path: '/model',
    name: '点线面模型对象',
    component: layout, 
    children: [
      {
        name: '点、线、网格模型',
        path: 'model',
        component:  () => import('../views/04.model/01.model.vue')
      },
      {
        name: '模型对象旋转平移缩放变换',
        path: 'transform',
        component:  () => import('../views/04.model/02.transform.vue')
      },
      {
        name: '对象克隆和复制',
        path: 'clone&copy',
        component:  () => import('../views/04.model/03.clone&copy.vue')
      },
    ]
  },
  {
    path: '/light',
    name: '光源对象',
    component: layout, 
    children: [
      {
        name: '光源类型',
        path: 'light',
        component:  () => import('../views/05.light/01.light.vue')
      },
      {
        name: '光照阴影实时计算',
        path: 'shadow',
        component:  () => import('../views/05.light/02.shadow.vue')
      },
    ]
  },
  {
    path: '/group',
    name: '层级模型、树结构',
    component: layout, 
    children: [
      {
        name: '组对象Group、层级模型',
        path: 'group',
        component:  () => import('../views/06.group/01.group.vue')
      },
      {
        name: '层级模型节点命名、查找、遍历',
        path: 'for',
        component:  () => import('../views/06.group/02.for.vue')
      },
      {
        name: '本地位置坐标、世界位置坐标',
        path: 'position',
        component:  () => import('../views/06.group/03.position.vue')
      },
    ]
  },
  {
    path: '/geometry',
    name: '几何体对象、曲线、三维模型',
    component: layout, 
    children: [
      {
        name: '直线、椭圆、圆弧、基类Curve',
        path: 'line',
        component:  () => import('../views/07.geometry/01.line.vue')
      },
      {
        name: '样条曲线、贝赛尔曲线',
        path: 'bezier',
        component:  () => import('../views/07.geometry/02.bezier.vue')
      },
      {
        name: '多个线条组合曲线',
        path: 'combination',
        component:  () => import('../views/07.geometry/03.combination.vue')
      },
      {
        name: '曲线路径管道成型',
        path: 'TubeGeometry',
        component:  () => import('../views/07.geometry/04.TubeGeometry.vue')
      },
      {
        name: '旋转造型',
        path: 'LatheGeometry',
        component:  () => import('../views/07.geometry/05.LatheGeometry.vue')
      },
      {
        name: 'Shape对象和轮廓填充ShapeGeometry',
        path: 'Shape',
        component:  () => import('../views/07.geometry/06.Shape.vue')
      },
      {
        name: '拉伸扫描成型ExtrudeGeometry',
        path: 'ExtrudeGeometry',
        component:  () => import('../views/07.geometry/07.ExtrudeGeometry.vue')
      },
    ]
  },
  {
    path: '/chartlet',
    name: '纹理贴图',
    component: layout, 
    children: [
      {
        name: '创建纹理贴图',
        path: 'group',
        component:  () => import('../views/08.chartlet/01.create.vue')
      },
      {
        name: '几何体顶点纹理坐标UV',
        path: 'uv',
        component:  () => import('../views/08.chartlet/02.uv.vue')
      },
      {
        name: '数组材质、材质索引.materialIndex',
        path: 'texture',
        component:  () => import('../views/08.chartlet/03.texture.vue')
      },
      {
        name: '纹理对象Texture阵列、偏移、旋转',
        path: 'transform',
        component:  () => import('../views/08.chartlet/04.transform.vue')
      },
      {
        name: 'canvas画布、视频作为纹理贴图',
        path: 'canvas',
        component:  () => import('../views/08.chartlet/05.canvas.vue')
      },
      {
        name: '凹凸贴图bumpMap和法线贴图.normalMap',
        path: 'bumpMap&normalMap',
        component:  () => import('../views/08.chartlet/06.bumpMap&normalMap.vue')
      },
      {
        name: '光照贴图添加阴影',
        path: 'lightMap',
        component:  () => import('../views/08.chartlet/07.lightMap.vue')
      },
    ]
  },
  {
    path: '/camera',
    name: '相机对象',
    component: layout, 
    children: [
      {
        name: '正投影相机和透视投影相机',
        path: 'camera',
        component:  () => import('../views/09.camera/01.camera.vue')
      },
      {
        name: '窗口变化自适应渲染',
        path: 'resize',
        component:  () => import('../views/09.camera/02.resize.vue')
      },
    ]
  },
  {
    path: '/sprite',
    name: '精灵模型、粒子系统',
    component: layout, 
    children: [
      {
        name: '精灵模型Sprite',
        path: 'sprite',
        component:  () => import('../views/10.sprite/01.sprite.vue')
      },
      {
        name: '测试',
        path: 'test',
        component:  () => import('../views/10.sprite/02.test.vue')
      },
      {
        name: '精灵模型Sprite模拟树林效果',
        path: 'tree',
        component:  () => import('../views/10.sprite/03.tree.vue')
      },
      {
        name: '模拟下雨效果',
        path: 'rain',
        component:  () => import('../views/10.sprite/04.rain.vue')
      },
    ]
  },
  {
    path: '/frameAni',
    name: '帧动画模块',
    component: layout, 
    children: [
      {
        name: '编辑关键帧并解析播放',
        path: 'keyframeTrack',
        component:  () => import('../views/11.frameAni/01.keyframeTrack.vue')
      },
      {
        name: '解析外部模型的帧动画',
        path: 'model',
        component:  () => import('../views/11.frameAni/02.model.vue')
      },
      {
        name: '播放设置-暂停',
        path: 'config_pause',
        component:  () => import('../views/11.frameAni/03.config_pause.vue')
      },
      {
        name: '播放设置-播放特定时间段',
        path: 'config_time',
        component:  () => import('../views/11.frameAni/04.config_time.vue')
      },
      {
        name: '播放设置-定位在某个时间点',
        path: 'config_position',
        component:  () => import('../views/11.frameAni/05.config_position.vue')
      },
      {
        name: '播放设置-快进',
        path: 'config_ff',
        component:  () => import('../views/11.frameAni/06.config_ff.vue')
      },
      {
        name: '播放设置-拖动',
        path: 'config_slider',
        component:  () => import('../views/11.frameAni/07.config_slider.vue')
      },
    ]
  },
  {
    path: '/skeletonAni',
    name: '骨骼动画, 变形动画',
    component: layout, 
    children: [
      
    ]
  },
  {
    path: '/audio',
    name: '语音模块',
    component: layout, 
    children: [
      
    ]
  },
  {
    path: '/webgl',
    name: 'WebGl渲染器',
    component: layout, 
    children: [
      
    ]
  },
  {
    path: '/event',
    name: '交互',
    component: layout, 
    children: [
      {
        name: 'hello',
        path: 'event',
        component:  () => import('../views/15.event/01.hello.vue')
      },
      {
        name: '事件绑定组件',
        path: 'createEvent',
        component:  () => import('../views/15.event/02.createEvent.vue')
      },
    ]
  },
  {
    path: '/demo',
    name: 'demo',
    component: layout, 
    children: [
      {
        name: 'demo',
        path: 'demo',
        component:  () => import('../views/16.demo/01.demo.vue')
      },
      {
        name: '导出模型',
        path: 'export',
        component:  () => import('../views/16.demo/02.export.vue')
      },
      {
        name: '物体沿轨迹移动',
        path: 'move',
        component:  () => import('../views/16.demo/03.move.vue')
      },
    ]
  },
]

const routes = [
  {
    path: '/',
    redirect: pages[0].path + '/' + pages[0].children[0].path,
  },

  ...pages
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
