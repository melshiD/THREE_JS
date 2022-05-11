import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const light = new THREE.PointLight()
light.position.set(49,  8, 77)
scene.add(light)
const lightGui = new GUI();
lightGui.add(light.position, 'x', 0.1, 10000);
lightGui.add(light.position, 'y', 0.1, 10000);
lightGui.add(light.position, 'z', 0.1, 10000);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    .1,
    1000
)
// const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// )

// camera.position.z = 74;
// camera.position.x = 100;
// camera.position.y = 10;
camera.position.set(-74, -100, 10)
// const rotateCameraAxis = new THREE.Vector3(1,0,0);
// camera.rotateOnAxis(rotateCameraAxis, 0);
// camera.updateProjectionMatrix();
const cameraGui = new GUI();
cameraGui.add(camera.position, "x", -100, 1000);
cameraGui.add(camera.position, "y", -100, 1000);
cameraGui.add(camera.position, "z", -100, 1000);

// const rotateCameraX = {
//     changeX: function(value){
//                 camera.rotation.x = value;
//                 renderer.render(scene, camera);
//             }
// }
// cameraGui.add(rotateCameraX, changeX, -100, 1000);

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(20, 10, 20)
controls.enableDamping = true

const material = new THREE.MeshPhongMaterial({ color: 0x00ff00})


const objLoader = new OBJLoader()
objLoader.load(
    'models/Head_Sculpt_1.obj',
    (object) => {
        // myHead = object;
        // (myHead.children[0] as THREE.Mesh).material = material
        // myHead.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         (child as THREE.Mesh).material = material
        //     }
        // })

        // scene.add(myHead as THREE.Group)
        (object.children[0] as THREE.Mesh).material = material
        object.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                (child as THREE.Mesh).material = material
            }
        })
        // const rotateHeadVector = new THREE.Vector3(0, 1, 1);
        // object.rotateOnAxis(rotateHeadVector, 90)
        scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {

    requestAnimationFrame(animate)
    controls.update()
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()