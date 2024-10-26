import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const hdrTextureURL = new URL('../img/MR_INT-004_BigWindowTree_Thea.hdr', import.meta.url);

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
camera.position.set(0, 0, 7);
orbit.update();

// gamma correction
renderer.outputEncoding = THREE.sRGBEncoding
// tone mapping algorithym
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.8;

//RGBE
const loader = new RGBELoader();
loader.load(hdrTextureURL, function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    //scene.environment = texture;

    // reflective ball
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 50, 50),
        // we get light information from de hdr
        new THREE.MeshStandardMaterial({
            roughness: 0,
            color: 0xa3a3a3,
            metalness: 0.8,
            envMap: texture
        })
    );
    scene.add(sphere);
    sphere.position.x = 1.5;

    const sphere2 = new THREE.Mesh(
        new THREE.SphereGeometry(1, 50, 50),
        new THREE.MeshStandardMaterial({
            roughness: 0,
            color: 0x000000,
            metalness: 0.8,
            envMap: texture
        })
    );
    scene.add(sphere2);
    sphere2.position.x = -1.5;

    const sphere3 = new THREE.Mesh(
        new THREE.SphereGeometry(1, 50, 50),
        new THREE.MeshStandardMaterial({
            roughness: 0,
            color: 0x000000,
            metalness: 0.8
        })
    );
    scene.add(sphere3);
    sphere3.position.z = -1.5;
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