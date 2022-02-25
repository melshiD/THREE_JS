import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import {GUI} from 'dat.gui'

let loadedObject = null;
const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const light = new THREE.PointLight()
light.lookAt(new THREE.Vector3(0, 0, 0))
light.position.set(50,50,50)
scene.add(light)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 40
camera.position.x = 40
camera.position.y = 40


const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

const material = new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: false })

const objLoader = new OBJLoader()
objLoader.load(
    '/models/head_blender.obj',
    (object) => {
        loadedObject = object;
        (object.children[0] as THREE.Mesh).material = material
        object.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                (child as THREE.Mesh).material = material
            }
        })
        
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

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
// cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
// cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
// cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
// cubeFolder.open()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 10, 100)
cameraFolder.open()

animate()