<template>
    <canvas
        @mousemove="onMouseMove"
        @mousedown="onMouseDown"
        @mouseup="onMouseUp"
        @touchmove="onMouseMove"
        @touchstart="onMouseDown"
        @touchleave="onMouseUp"
        @touchend="onMouseUp"
        @touchcancel="onMouseUp"
        :width="width"
        :height="height"
        class="WriteArea"
    />
</template>
<script>
export default {
    name: 'WriteArea',
    props: {
        lineWidth: {
            type: Number,
            default: 0,
        },
        color: {
            type: String,
            default: '',
        },
        width: {
            type: Number,
            default: 0,
        },
        height: {
            type: Number,
            default: 0,
        },
    },

    watch: {
        lineWidth() {
            this.ctx.lineWidth = this.lineWidth
        },
        color() {
            this.ctx.strokeStyle = this.color
        },
    },
    mounted() {
        this.canDraw = false
        this.mouse = [0, 0]
        this.curves = [[]]

        this.ctx = this.$el.getContext('2d')
        this.$nextTick(() => {
            this.ctx.lineJoin = 'round'
            this.ctx.lineCap = 'round'
            this.ctx.lineWidth = this.lineWidth
            this.ctx.strokeStyle = this.color
        })
        this.RafManager.addQueue(this.draw.bind(this))
    },

    methods: {
        onMouseMove(e) {
            if (!this.canDraw) return false

            const mouse = this.setMouse(e)
            this.savePoint(mouse)
        },
        onMouseDown(e) {
            this.canDraw = true

            const mouse = this.setMouse(e)
            this.savePoint(mouse)
        },
        onMouseUp() {
            this.canDraw = false
            this.savePoint(this.mouse)
            this.savePoint(null)

            this.$emit('stopDrawing', this.curvesToList(this.curves))
        },
        savePoint(point) {
            if (point !== null) {
                this.curves[this.curves.length - 1].push(point)
            } else {
                this.curves.push([])
            }
        },
        curvesToList(curves) {
            const coords = []
            this.curves.map(curve => {
                curve.map(point => {
                    coords.push(point)
                })
                coords.push([null, null])
            })
            return coords
        },
        setMouse(e) {
            const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
            const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY
            this.mouse = [x, y]

            return this.mouse
        },

        clear() {
            this.ctx.clearRect(0, 0, this.width, this.height)
            let erasing = setInterval(() => {
                let empty = true
                this.curves.map(curve => {
                    curve.splice(0, 1)
                    if (curve.length) {
                        empty = false
                    }
                })

                if (empty) {
                    this.curves = [[]]
                    clearInterval(erasing)
                    erasing = null
                }
            }, 20)
        },

        removeLastCurve() {
            this.curves.splice(this.curves.length - 2, 1)
        },

        draw() {
            const ctx = this.ctx
            const length = this.curves.length
            ctx.clearRect(0, 0, this.width, this.height)

            if (!length || !this.curves[0].length) {
                return false
            }

            ctx.beginPath()
            for (let i = 0; i < length; i++) {
                const curve = this.curves[i]
                this.regularDraw(curve)
                // this.smoothDraw(curve)
            }
            ctx.stroke()
            ctx.closePath()
        },
        smoothDraw(curve) {
            const ctx = this.ctx
            const step = 3
            for (let a = 0; a < curve.length; a += step) {
                const start = curve[a]
                const cp = curve[a + Math.floor(step / 2)]
                const end = curve[a + step]

                ctx.moveTo(start[0], start[1])
                if (cp && end) {
                    ctx.quadraticCurveTo(cp[0], cp[1], end[0], end[1])
                } else if (cp && !end) {
                    ctx.lineTo(cp[0], cp[1])
                }
            }
        },
        regularDraw(curve) {
            const ctx = this.ctx

            if (curve[0]) {
                ctx.moveTo(curve[0][0], curve[0][1])
            }

            for (let a = 1; a < curve.length; a++) {
                const point = curve[a]
                ctx.lineTo(point[0], point[1])
                ctx.moveTo(point[0], point[1])
            }
        },
    },
}
</script>
<style lang="scss">
.WriteArea {
    height: 100vh;
    width: 100vw;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
}
</style>
