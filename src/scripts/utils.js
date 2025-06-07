// utils/smoothScroll.js
import Lenis from 'lenis'

class SmoothScroll {
  constructor() {
    this.lenis = null
    this.init()
  }

  init() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    // Start the animation loop
    this.raf()

    // Debug (optional)
    // this.lenis.on('scroll', (e) => {
    //   console.log(e)
    // })
  }

  raf(time) {
    this.lenis.raf(time)
    requestAnimationFrame((time) => this.raf(time))
  }

  // Utility methods
  scrollTo(target, options = {}) {
    this.lenis.scrollTo(target, options)
  }

  stop() {
    this.lenis.stop()
  }

  start() {
    this.lenis.start()
  }

  destroy() {
    this.lenis.destroy()
  }
}

export default SmoothScroll