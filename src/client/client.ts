import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const light = new THREE.PointLight()
light.position.set(2.5, 7.5, 15)
scene.add(light)
const lightGui = new GUI();
lightGui.add(light.position, 'x', 0.1, 100);
lightGui.add(light.position, 'y', 0.1, 100);
lightGui.add(light.position, 'z', 0.1, 100);

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

camera.position.z = 74;
camera.position.x = 100;
camera.position.y = 10;
const cameraGui = new GUI();
cameraGui.add(camera.position, "x", 0, 1000);
cameraGui.add(camera.position, "y", 0, 1000);
cameraGui.add(camera.position, "z", 0, 1000);

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const material = new THREE.MeshPhongMaterial({ color: 0x00ff00})


let myHead;
const objLoader = new OBJLoader()
objLoader.load(
    'models/head_blender.obj',
    (object) => {
        myHead = object;
        (myHead.children[0] as THREE.Mesh).material = material
        myHead.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                (child as THREE.Mesh).material = material
            }
        })
        scene.add(myHead as THREE.Group)
        // (object.children[0] as THREE.Mesh).material = material
        // object.traverse(function (child) {
        //     if ((child as THREE.Mesh).isMesh) {
        //         (child as THREE.Mesh).material = material
        //     }
        // })
        // scene.add(object)
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
    //culp 3
    if ((myHead as THREE.Mesh) !== undefined) { 
        (myHead as THREE.Mesh).scale.set (0.2,0.2,0.2);
    }
    //end culp 3
    requestAnimationFrame(animate)
    controls.update()
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()