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
        class="WriteArea"
    />
</template>
<script>
export default {
    name: 'WriteArea',
    mounted() {
        this.canDraw = false
        this.mouse = [0, 0]
        this.coords = []

        this.ctx = this.$el.getContext('2d')
        this.ctx.lineJoin = 'round'
        this.ctx.lineWidth = 2
        this.ctx.lineCap = 'round'
        this.ctx.strokeStyle = '#000'
    },

    methods: {
        onMouseMove(e) {
            if (!this.canDraw) return false

            const ctx = this.ctx
            const prevMouse = [...this.mouse]
            const mouse = this.setMouse(e)

            this.saveCoords(mouse)

            ctx.beginPath()
            ctx.moveTo(prevMouse[0], prevMouse[1])
            ctx.lineTo(mouse[0], mouse[1])
            ctx.stroke()
            ctx.closePath()
        },
        onMouseDown(e) {
            this.canDraw = true

            const mouse = this.setMouse(e)
            this.ctx.moveTo(mouse[0], mouse[1])
            this.saveCoords(mouse)
        },
        onMouseUp() {
            this.canDraw = false
            this.saveCoords(this.mouse)
            this.saveCoords([null, null])

            this.$emit('stopDrawing', this.coords)
        },
        saveCoords(coord) {
            const [x, y] = coord
            this.coords.push([x, y])
        },
        setMouse(e) {
            const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
            const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY
            this.mouse = [x, y]
            return this.mouse
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
}
</style>
