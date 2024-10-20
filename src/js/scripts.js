import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui';

const fileUrl = new URL('../assets/Donkey.gltf', import.meta.url);
// SET UP
const renderer = new THREE.WebGLRenderer({antialias: true});
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
camera.position.set(10, 10, 10);
orbit.update();

//optional
renderer.setClearColor(0xA3A3A3);

//optional
const grid = new THREE.GridHelper(30, 30);
scene.add(grid);

const ambientLight = new THREE.AmbientLight(0xededed, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
scene.add(directionalLight);
directionalLight.position.set(10, 11, 7);

const gui = new dat.GUI();

const options = {
    'Main': 0x787a79,
    'Main Light': 0x7c7c7c,
    'Main Dark': 0x383838,
    'Hooves': 0x46423c,
    'Hair': 0x383838,
    'Muzzle': 0x3d3426,
    'Eye Dark': 0x181818,
    'Eye White': 0xe0e0e0
};

const assetLoader = new GLTFLoader();
assetLoader.load(fileUrl.href, function(gltf) {
    const model = gltf.scene;
    scene.add(model);
    // getting a specific mesh
    console.log(model.getObjectByName('Cube_1'));
    
    //changing the mesh color
    gui.addColor(options,'Main').onChange(function(e) {
        model.getObjectByName('Cube').material.color.setHex(e);
    });
    gui.addColor(options,'Main Light').onChange(function(e) {
        model.getObjectByName('Cube_1').material.color.setHex(e);
    });
    gui.addColor(options,'Main Dark').onChange(function(e) {
        model.getObjectByName('Cube_2').material.color.setHex(e);
    });
    gui.addColor(options,'Hooves').onChange(function(e) {
        model.getObjectByName('Cube_3').material.color.setHex(e);
    });
    gui.addColor(options,'Hair').onChange(function(e) {
        model.getObjectByName('Cube_4').material.color.setHex(e);
    });
    gui.addColor(options,'Muzzle').onChange(function(e) {
        model.getObjectByName('Cube_5').material.color.setHex(e);
    });
    gui.addColor(options,'Eye Dark').onChange(function(e) {
        model.getObjectByName('Cube_6').material.color.setHex(e);
    });
    gui.addColor(options,'Eye White').onChange(function(e) {
        model.getObjectByName('Cube_7').material.color.setHex(e);
    });


}, undefined, function(error) {
    console.error(error);
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