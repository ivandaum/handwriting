<template>
    <div class="Index">
        <!-- <Button :text="prediction" /> -->
        <WriteTools :color="color" :size="size" @onChange="onOptionsUpdate" />
        <WriteArea
            ref="WriteArea"
            :lineWidth="size"
            :color="color"
            @stopDrawing="onStopDrawing"
            :width="width"
            :height="height"
        />
    </div>
</template>

<script>
import WriteTools from '~/components/WriteTools'
import WriteArea from '~/components/WriteArea'
import { recognize } from '~/assets/scripts/GoogleInputTools'

export default {
    components: { WriteArea, WriteTools },
    data() {
        return {
            width: 0,
            height: 0,
            prediction: 'Default word',
            size: 10,
            color: '#000',
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
            const language = navigator.language
            const resp = await recognize({ coords, width, height, language })

            try {
                const data = JSON.parse(resp.data)
                this.prediction = data[1][0][1][0]

                console.log(this.prediction)
            } catch (e) {
                console.log(e)
            }
        },

        onOptionsUpdate(data) {
            if (data.size) {
                this.size = parseFloat(data.size)
            }

            if (data.color) {
                this.color = data.color
            }

            if (data.erase) {
                this.$refs.WriteArea.clear()
            }

            if (data.ctrlZ) {
                this.$refs.WriteArea.removeLastCurve()
            }
        },
    },
}
</script>

<style lang="scss">
.Index {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
