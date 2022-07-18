// 鼠标控制
function render() {
  renderer.render(scene, camera);//执行渲染操作
}
render();
var controls = new THREE.OrbitControls(camera, renderer.domElement);//创建控件对象
controls.addEventListener('change', render);//监听鼠标、键盘事件
