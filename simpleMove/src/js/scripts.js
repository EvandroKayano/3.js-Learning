import * as THREE from 'three';
import gsap from 'gsap';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0xa3a3a3);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
//const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 2, 5);
camera.lookAt(0,0,0);
//orbit.update();


const ambientLight = new THREE.AmbientLight(0xededed, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x0000,1);
scene.add(directionalLight);
directionalLight.position.set(0,20,-20);

const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper);

const box = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshPhongMaterial({color: 0x00ff00})
);
box.position.y = 0.5
scene.add(box);

// let z;
// const zFinal = 14;
const t1 = gsap.timeline();
window.addEventListener('mousedown', function(){
    // z = camera.position.z;
    t1.to(camera.position, {
        z: 14,
        duration: 1.5,
        onUpdate: function() {
            camera.lookAt(0, 0, 0)
        }
    })

    .to(camera.position, {
        y: 10,
        duration: 1.5,
        onUpdate: function() {
            camera.lookAt(0, 0, 0)
        }
    })

    .to(camera.position, {
        x: 10,
        y: 5,
        z: 3,
        duration: 1.5,
        onUpdate: function() {
            camera.lookAt(0, 0, 0)
        }
    })

    .to(camera.position, {
        x: 0,
        y: 2,
        z: 5,
        duration: 1.5,
        onUpdate: function() {
            camera.lookAt(0, 0, 0)
        }
    });
});

function animate() {
    // z+=1;
    // if(z < zFinal)
    //     camera.position.z = z;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});