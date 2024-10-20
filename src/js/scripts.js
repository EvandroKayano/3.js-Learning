import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';


// SET UP
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 6, 6);
orbit.update();



const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);
directionalLight.position.set(0, 50, 0);

const helper = new THREE.AxesHelper(20);
scene.add(helper);

const mouse = new THREE.Vector2(); // normalize position of the cursor
const intersectionPoint = new THREE.Vector3(); // hold the coords of the point where the plane intersects the ray
const planeNormal = new THREE.Vector3(); // plane normal (where it is facing)
const plane = new THREE.Plane();
const rayCaster = new THREE.Raycaster(); // ray between the ray and the cursor

window.addEventListener('mousemove', function(e){
    mouse.x = (e.clientX/ window.innerWidth) * 2 -1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    rayCaster.setFromCamera(mouse,camera);
    rayCaster.ray.intersectPlane(plane, intersectionPoint);
});

window.addEventListener('click', function(e){
    const sphereGeo = new THREE.SphereGeometry(0.125, 30, 30);
    const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xffea00,
        metalness: 0,
        roughness: 0
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);
    sphere.position.copy(intersectionPoint);
});


function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);


window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});