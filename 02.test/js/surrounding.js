// 天空盒子
var paths = [
  '../imgs/skybox/super/天空盒东(skybox_east).jpg',
  '../imgs/skybox/super/天空盒西(skybox_west).jpg',
  '../imgs/skybox/super/天空盒顶(skybox_top).jpg',
  '',
  '../imgs/skybox/super/天空盒北(skybox_north).jpg',
  '../imgs/skybox/super/天空盒南(skybox_south).jpg',
]
var loader = new THREE.TextureLoader()

var materials = []
for (var i = 0; i < paths.length; ++i) {
  var texture = loader.load(paths[i])
  materials.push(new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide
  })
  )
}

var cube = new this.THREE.Mesh(new THREE.BoxGeometry(9000, 9000, 9000), materials)
cube.position.set(0, 500, 0)
cube.name = 'sky'
scene.add(cube)

// 渲染
renderer.render(scene, camera);


// 
var cao = loader.load('../imgs/cao.jpg')
cao.wrapS = THREE.RepeatWrapping;
cao.wrapT = THREE.RepeatWrapping;
cao.repeat.set(1000, 1000);
var grass = new this.THREE.Mesh(new THREE.PlaneGeometry(9000, 9000), new THREE.MeshBasicMaterial({
  map: cao,
  side: THREE.BackSide
}))
// grass.position.set(0,0,0)
grass.rotateX(Math.PI / 2)
scene.add(grass)

// 渲染
renderer.render(scene, camera);

