import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import {GUI} from 'dat.gui'
import { MeshBasicMaterial } from 'three'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const light = new THREE.SpotLight()
light.position.set(2.5, 7.5, 15)
scene.add(light)

camera.position.y = 1
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const menuPanel = document.getElementById('menuPanel') as HTMLDivElement
const startButton = document.getElementById('startButton') as HTMLInputElement
startButton.addEventListener(
    'click',
    function () {
        controls.lock()
    },
    false
)

const controls = new PointerLockControls(camera, renderer.domElement)
controls.addEventListener('change', () => console.log("Controls Change"))
controls.addEventListener('lock', () => (menuPanel.style.display = 'none'))
controls.addEventListener('unlock', () => (menuPanel.style.display = 'block'))

const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50)
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})
const plane = new THREE.Mesh(planeGeometry, material)
plane.rotateX(-Math.PI / 2)
scene.add(plane)

const cubes: THREE.Mesh[] = []
for (let i = 0; i < 100; i++) {
    const geo = new THREE.BoxGeometry(
        Math.random() * 4,
        Math.random() * 16,
        Math.random() * 4
    )
    const mat = new THREE.MeshBasicMaterial({ wireframe: true })
    switch (i % 3) {
        case 0:
            mat.color = new THREE.Color(0xff0000)
            break
        case 1:
            mat.color = new THREE.Color(0xffff00)
            break
        case 2:
            mat.color = new THREE.Color(0x0000ff)
            break
    }
    const cube = new THREE.Mesh(geo, mat)
    cubes.push(cube)
}
// cubes.forEach((c) => {
//     c.position.x = Math.random() * 100 - 50
//     c.position.z = Math.random() * 100 - 50
//     c.geometry.computeBoundingBox()
//     c.position.y =
//         ((c.geometry.boundingBox as THREE.Box3).max.y -
//             (c.geometry.boundingBox as THREE.Box3).min.y) /
//         2
//     scene.add(c)
// })

const materialForHead = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
const objLoader = new OBJLoader()
objLoader.load(
    'models/head_blender.obj',
    (object) => {
        (object.children[0] as THREE.Mesh).material = materialForHead
        object.traverse(function (child) {
            if ((child as THREE.Mesh).isMesh) {
                (child as THREE.Mesh).material = materialForHead;
            }
        })
        object.position.x = 0;
        object.position.y = 0;
        object.position.z = 200;
        object.rotateOnAxis(new THREE.Vector3(1,1,1), 50 )
        scene.add(object)
        scene.updateMatrixWorld(true)
        // object.matrixWorld.setPosition(new THREE.Vector3(1000000, -1000000, 1000000))
        scene.updateMatrix()
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)
const gui = new GUI();

const materialFolder = gui.addFolder('OBJ Object');
// materialFolder.add((transferObject[0]), 'z', 10, 1000);
materialFolder.open();

// const orbitControls = new OrbitControls(camera, renderer.domElement)

// const dragControls = new DragControls([objLoader], camera, renderer.domElement)
// dragControls.addEventListener('dragstart', function (event) {
//     orbitControls.enabled = false
//     event.object.material.opacity = 0.33
// })
// dragControls.addEventListener('dragend', function (event) {
//     orbitControls.enabled = true
//     event.object.material.opacity = 1
// })

const onKeyDown = function (event: KeyboardEvent) {
    switch (event.code) {
        case 'KeyW':
            controls.moveForward(0.25)
            break
        case 'KeyA':
            controls.moveRight(-0.25)
            break
        case 'KeyS':
            controls.moveForward(-0.25)
            break
        case 'KeyD':
            controls.moveRight(0.25)
            break
    }
}
document.addEventListener('keydown', onKeyDown, false)

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

    //controls.update()

    render()

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()