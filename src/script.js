import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { LoadGhost } from '../static/models/ghost/ghost.js'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Models
const ghostLight1 = new THREE.PointLight('#ff00ff', 2, 3)
const ghostLight2 = new THREE.PointLight('#00ffff', 2, 3)
const ghostLight3 = new THREE.PointLight('#ffff00', 2, 3)

const baseGhostModel = await LoadGhost()
const ghost1 = new THREE.Group()
ghost1.add(SkeletonUtils.clone(baseGhostModel))
ghost1.add(ghostLight1)
scene.add(ghost1)

const ghost2 = new THREE.Group()
ghost2.add(SkeletonUtils.clone(baseGhostModel))
ghost2.add(ghostLight2)
scene.add(ghost2)

const ghost3 = new THREE.Group()
ghost3.add(SkeletonUtils.clone(baseGhostModel))
ghost3.add(ghostLight3)
scene.add(ghost3)

/**
 * Textures
 */
// DOOR TEXTURES
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg'
)
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// DOOR TEXTURES
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load(
  '/textures/bricks/ambientOcclusion.jpg'
)
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load(
  '/textures/bricks/roughness.jpg'
)

// GROUND TEXTURES
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load(
  '/textures/grass/ambientOcclusion.jpg'
)
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load(
  '/textures/grass/roughness.jpg'
)

//threejs.org/docs/#api/en/textures/Texture.wrapS
https: grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

/**
 * House
 */
const house = new THREE.Group()

// walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
)
walls.position.y = 1.25

// roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: '#b35f45' })
)
// height of walls + roof height
roof.position.y = 2.5 + 0.5
roof.rotation.y = Math.PI * 0.25

// door
// alphaMap requires transparent = true
// aoMap needs a UV2 attribute
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
)
door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)
// same position as wall, but + 0.01 to avoid z-clash
door.position.z = 2 + 0.01
door.position.y = 1

house.add(walls)
house.add(roof)
house.add(door)
scene.add(house)

const houseFolder = gui.addFolder('House')
const housePositionFolder = houseFolder.addFolder('Position')
housePositionFolder.add(house.position, 'x').min(-7).max(7).step(0.01)
housePositionFolder.add(house.position, 'z').min(-7).max(7).step(0.01)
const houseRotationFolder = houseFolder.addFolder('Rotation')
houseRotationFolder
  .add(house.rotation, 'y')
  .min(-Math.PI * 2)
  .max(Math.PI * 2)
  .step(0.01)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// HEADSTONES
const graveyard = new THREE.Group()
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2
  const radius = 3 + Math.random() * 6
  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius

  const grave = new THREE.Mesh(graveGeometry, graveMaterial)

  grave.position.set(x, 0.3, z)
  grave.rotation.y = (Math.random() - 0.5) * 0.4
  grave.rotation.z = (Math.random() - 0.5) * 0.4

  grave.castShadow = true
  graveyard.add(grave)
}

scene.add(graveyard)

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
)
floor.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
)
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, -2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
scene.add(moonLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
const doorLightFolder = houseFolder.addFolder('Door Light')
const doorLightPositionFolder = doorLightFolder.addFolder('position')
doorLightPositionFolder.add(doorLight.position, 'x').min(-1).max(1)
doorLightPositionFolder.add(doorLight.position, 'y').min(0).max(2.5)

doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)
// const doorLightHelper = new THREE.PointLightHelper(doorLight)
// scene.add(doorLightHelper)

// Fog
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 5
camera.position.y = 3
camera.position.z = 5
scene.add(camera)

// Music
const listener = new THREE.AudioListener()
camera.add(listener)
const sound = new THREE.Audio(listener)

const audioLoader = new THREE.AudioLoader()
audioLoader.load(
  'music/Y2Mate.is - ghost choir 👻🎵-kXF3VYYa5TI-128k-1654880903031.mp3',
  function (buffer) {
    sound.setBuffer(buffer)
    sound.setLoop(true)
    sound.setVolume(0.4)
    sound.play()
  }
)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.autoRotate = true
controls.autoRotateSpeed = 0.5
controls.enablePan = false
controls.maxZoom = 3

controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')

// SHADOWS AND OPTIMIZATION
renderer.shadowMap.enabled = true

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15

// ...

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

renderer.shadowMap.type = THREE.PCFSoftShadowMap

floor.receiveShadow = true

/**
 * Animate
 */
const clock = new THREE.Clock()
console.log(ghost1.children[0].material)
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  const ghost1Angle = elapsedTime * 0.5
  ghost1.position.x = Math.cos(ghost1Angle) * 4
  ghost1.position.z = Math.sin(ghost1Angle) * 4
  ghost1.position.y = Math.abs(Math.sin(ghost1Angle))
  ghost1.children[1].intensity = Math.abs(Math.sin(ghost1Angle * 4))

  ghost1.rotation.y = ghost1.position.x * Math.PI * 0.25
  ghost1.rotation.z = Math.sin(ghost1Angle * 4) * Math.PI * 0.25

  const ghost2Angle = -elapsedTime * 0.32
  ghost2.position.x = Math.cos(ghost2Angle) * 5
  ghost2.position.z = Math.sin(ghost2Angle) * 5
  ghost2.position.y = Math.abs(
    Math.sin(elapsedTime * 2) + Math.sin(elapsedTime * 2.5)
  )

  ghost2.rotation.y = ghost2.position.x * Math.PI * 0.25
  ghost2.rotation.z = Math.sin(ghost2Angle * 2) * Math.PI * 0.25

  const ghost3Angle = -elapsedTime * 0.18
  ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
  ghost3.position.y = Math.abs(
    Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)
  )

  ghost3.rotation.y = Math.sin(ghost3Angle * 4) * Math.PI * 0.25
  ghost3.rotation.z = Math.sin(ghost3Angle * 4) * Math.PI * 0.25

  //slowly rotate camera
  camera.lookAt(house.position)

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
