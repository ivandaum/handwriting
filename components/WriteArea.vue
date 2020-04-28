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
            default: 2,
        },
        color: {
            type: String,
            default: '#000',
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
        this.coords = []

        this.ctx = this.$el.getContext('2d')
        this.ctx.lineJoin = 'round'
        this.ctx.lineCap = 'round'

        this.RafManager.addQueue(this.draw.bind(this))
    },

    methods: {
        onMouseMove(e) {
            if (!this.canDraw) return false

            const mouse = this.setMouse(e)
            this.saveCoords(mouse)
        },
        onMouseDown(e) {
            this.canDraw = true

            const mouse = this.setMouse(e)
            this.saveCoords(mouse)
        },
        onMouseUp() {
            this.canDraw = false
            this.saveCoords(this.mouse)
            this.saveCoords([null, null])

            this.$emit('stopDrawing', this.coords)
        },
        saveCoords(coord) {
            this.coords.push(coord)
        },
        setMouse(e) {
            const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
            const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY
            this.mouse = [x, y]

            return this.mouse
        },

        draw() {
            const ctx = this.ctx
            const length = this.coords.length
            this.ctx.clearRect(0, 0, this.width, this.height)

            if (!length) {
                return false
            }

            const start = this.coords[0]
            ctx.beginPath()
            ctx.moveTo(start[0], start[1])

            for (let i = 1; i < length; i++) {
                const point = this.coords[i]
                const nextP = this.coords[i + 1]

                if (point[0] === null && nextP) {
                    ctx.moveTo(nextP[0], nextP[1])
                } else if (point[0] !== null) {
                    ctx.lineTo(point[0], point[1])
                    ctx.moveTo(point[0], point[1])
                }
            }

            ctx.closePath()
            ctx.stroke()
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
