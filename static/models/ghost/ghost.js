import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export async function LoadGhost() {
  const loader = new GLTFLoader()
  const ghost_model = await loader.loadAsync('/models/ghost/scene.gltf')
  const model = ghost_model.scene
  model.scale.set(0.01, 0.01, 0.01)

  return model
}
