import Vue from 'vue'
const MAX_FPS = 60
const FPS_INTERVAL = 1000 / MAX_FPS

const RafManager = class {
    constructor() {
        this.callbacks = []
        this.raf = []

        this.lastDate = Date.now()
        this.dt = 0
        this.now = 0
        this.render()
    }

    addQueue(func) {
        this.callbacks.push(func)
        return this.callbacks.length
    }

    removeQueue(index) {
        if (this.callbacks[index]) {
            this.callbacks.splice(index, 1)
            return true
        }

        return false
    }

    render(delta) {
        this.raf = window.requestAnimationFrame(this.render.bind(this))

        this.now = Date.now()
        this.dt = this.now - this.lastDate
        if (this.dt > FPS_INTERVAL) {
            this.lastDate = this.now - (this.dt % FPS_INTERVAL)
            this.callbacks.map(callback =>
                typeof callback === 'function' ? callback(delta) : null,
            )
        }
    }

    stop() {
        window.cancelAnimationFrame(this.raf)
        this.raf = null
    }
}

Vue.prototype.RafManager = new RafManager()
