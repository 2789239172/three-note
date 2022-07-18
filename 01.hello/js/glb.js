/**
 * OBJ文件加载  只加载obj文件中的几何信息，不加载材质文件.mtl
 */
 var loader = new THREE.GLTFLoader();

 // 没有材质文件，系统自动设置Phong网格材质
 loader.load('./2.glb',function (glb) {
   console.log(glb)
  scene.add(glb.scene)
  renderer.render(scene, camera);//执行渲染操作
 })