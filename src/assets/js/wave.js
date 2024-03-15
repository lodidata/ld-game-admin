var THREE = window.THREE
const SEPARATION = 100
const AMOUNTX = 70
const AMOUNTY = 50
let container
let camera, scene, renderer
let particles
let particle
let count = 0
let mouseX = 85
let mouseY = -342
let windowHalfX = window.innerWidth / 2
let windowHalfY = window.innerHeight / 2
let runing = true // 是否允许
let flag = true // 60帧 => 30帧

const moveEvent = throttle(onDocumentMouseMove, 200)
const touchEvent = throttle(onDocumentTouchStart, 200)
const touchMoveEvent = throttle(onDocumentTouchMove, 200)
const resizeEvent = throttle(onWindowResize, 200)

// 函数节流
function throttle(func, delay) {
  let lastCall = new Date()
  return function(...args) {
    const now = new Date()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    return func.apply(this, args)
  }
}

function init() {
  const loginBox = document.getElementById('Login')
  if (!loginBox) return destroyed()
  runing = true
  container = document.createElement('div')
  loginBox.appendChild(container)

  camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000)
  camera.position.z = 1000
  scene = new THREE.Scene()
  particles = []

  const PI2 = Math.PI * 2
  const material = new THREE.ParticleCanvasMaterial({
    color: 0xe1e1e1,
    program: function(context) {
      context.beginPath()
      context.arc(0, 0, 0.6, 0, PI2, true)
      context.fill()
    }
  })

  let i = 0
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++] = new THREE.Particle(material)
      particle.position.x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
      particle.position.z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2
      scene.add(particle)
    }
  }

  renderer = new THREE.CanvasRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.appendChild(renderer.domElement)
  document.addEventListener('mousemove', moveEvent, false)
  document.addEventListener('touchstart', touchEvent, false)
  document.addEventListener('touchmove', touchMoveEvent, false)
  window.addEventListener('resize', resizeEvent, false)

  animate()
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2
  windowHalfY = window.innerHeight / 2
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX
  mouseY = event.clientY - windowHalfY
}

function onDocumentTouchStart(event) {
  if (event.touches.length === 1) {
    event.preventDefault()
    mouseX = event.touches[0].pageX - windowHalfX
    mouseY = event.touches[0].pageY - windowHalfY
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length === 1) {
    event.preventDefault()
    mouseX = event.touches[0].pageX - windowHalfX
    mouseY = event.touches[0].pageY - windowHalfY
  }
}

function animate() {
  if (!runing) return
  if (flag) render()
  flag = !flag
  requestAnimationFrame(animate)
}

function render() {
  if (!runing) return
  camera.position.x += (mouseX - camera.position.x) * 0.05
  camera.position.y += (-mouseY - camera.position.y) * 0.05
  camera.lookAt(scene.position)
  let i = 0
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++]
      particle.position.y = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50
      particle.scale.x = particle.scale.y =
        (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2
    }
  }

  renderer.render(scene, camera)
  count += 0.1
}

function destroyed() {
  runing = false
  container = camera = scene = renderer = particles = particle = null
  document.removeEventListener('mousemove', moveEvent, false)
  document.removeEventListener('touchstart', touchEvent, false)
  document.removeEventListener('touchmove', touchMoveEvent, false)
  window.removeEventListener('resize', resizeEvent, false)
}

export default {
  init,
  destroyed
}
