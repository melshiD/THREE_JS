import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const scene2 = new THREE.Scene();
scene.background = new THREE.Color('#0c0018');
const camera1 = new THREE.PerspectiveCamera(
    75,
    // window.innerWidth / window.innerHeight,
    1,
    0.1,
    1000
);
const camera2 = new THREE.OrthographicCamera(-2, 2, 2, -2);
const camera3 = new THREE.OrthographicCamera(-2, 2, 2, -2);
const camera4 = new THREE.OrthographicCamera(-2, 2, 2, -2);

camera1.position.z = 2;
camera2.position.y = 2;
camera2.lookAt(new THREE.Vector3());
camera3.position.x = -3;
camera3.lookAt(new THREE.Vector3());
camera4.position.z = 4;

const canvas1 = document.getElementById('c1') as HTMLCanvasElement;
const renderer1 = new THREE.WebGLRenderer({canvas: canvas1});
const canvas2 = document.getElementById('c2') as HTMLCanvasElement;
const renderer2 = new THREE.WebGLRenderer({canvas: canvas2});
const canvas3 = document.getElementById('c3') as HTMLCanvasElement;
const renderer3 = new THREE.WebGLRenderer({canvas: canvas3});
const canvas4 = document.getElementById('c4') as HTMLCanvasElement;
const renderer4 = new THREE.WebGLRenderer({canvas: canvas4});
renderer1.setSize(250, 250);
renderer2.setSize(250, 250);
renderer3.setSize(250, 250);
renderer4.setSize(250, 250);
// // renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer1.domElement);
// document.body.appendChild(renderer2.domElement);

new OrbitControls(camera1, renderer1.domElement);
// new OrbitControls(camera2, renderer2.domElement);


const geometry = new THREE.TorusKnotGeometry();
const material = new THREE.MeshBasicMaterial({
    color: '#39ff15',
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material);
cube.scale.z = .5;
cube.scale.y = .5;
cube.scale.x = .5;
scene.add(cube);
const cube2 = new THREE.Mesh(geometry, material);
scene2.add(cube2);

// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    cube2.rotation.y += 0.03

    render()
}

function render() {
    renderer1.render(scene, camera1);
    renderer2.render(scene, camera2);
    renderer3.render(scene2, camera3);
    renderer4.render(scene, camera4);
}
// render();
animate();