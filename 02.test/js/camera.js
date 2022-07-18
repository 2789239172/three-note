/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大

//创建透视相机对象
var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000000);
camera.position.set(0, 0, 1000); //设置相机位置
camera.lookAt(new THREE.Vector3(0, 0, 0)); //设置相机方向(指向的场景对象)
