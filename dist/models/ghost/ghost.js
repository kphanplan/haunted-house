import{GLTFLoader}from"three/examples/jsm/loaders/GLTFLoader.js";export async function LoadGhost(){const e=new GLTFLoader,o=(await e.loadAsync("/models/ghost/scene.gltf")).scene;return o.scale.set(.01,.01,.01),o}