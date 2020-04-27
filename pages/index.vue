<template>
    <div class="Index">
        <WriteArea @stopDrawing="onStopDrawing" :width="width" :height="height" />
    </div>
</template>

<script>
import WriteArea from '~/components/WriteArea'
import { recognize } from '~/assets/scripts/GoogleInputTools'

export default {
    components: { WriteArea },
    data() {
        return {
            width: 0,
            height: 0,
        }
    },
    mounted() {
        this.width = window.innerWidth
        this.height = window.innerHeight
    },
    methods: {
        async onStopDrawing(coords) {
            const width = this.width
            const height = this.height
            const resp = await recognize({ coords, width, height })

            try {
                const data = JSON.parse(resp.data)
                const predictions = data[1][0][1]
            } catch (e) {
                console.log(e)
            }
        },
    },
}
</script>

<style lang="scss"></style>
