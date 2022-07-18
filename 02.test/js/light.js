/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(9000, 9000, 9000); //点光源位置
scene.add(point); //点光源添加到场景中

//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);