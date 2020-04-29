<template>
    <div class="WriteTools is-flex is-justified-x">
        <div class="is-flex">
            <div class="WriteTools__tool is-flex is-center">
                <button @click="$emit('onChange', { erase: true })" class="button">Erase</button>
            </div>
            <div class="WriteTools__tool is-flex is-center">
                <button @click="$emit('onChange', { ctrlZ: true })" class="button">
                    ↺
                </button>
            </div>
        </div>
        <div class="is-flex">
            <div class="WriteTools__tool is-center is-flex">
                <p class="is-block">Size</p>
                <input
                    ref="size"
                    @input="$emit('onChange', { size: $refs.size.value })"
                    :value="size"
                    name="size"
                    step="0.1"
                    type="range"
                    min="1"
                    max="50"
                />
            </div>
            <div class="WriteTools__tool is-center is-flex">
                <Color
                    v-show="colorPickerOpen"
                    @change="updateColor"
                    @click="colorPickerOpen = true"
                />
                <button
                    @click="colorPickerOpen = !colorPickerOpen"
                    :class="{ active: colorPickerOpen }"
                    class="is-flex is-center is-activable is-baseline"
                >
                    Color
                    <span
                        :style="{ backgroundColor: currentColor }"
                        class="WriteTools__colorViewer is-block"
                    />
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import Color from '~/components/Color'

export default {
    name: 'WriteTools',
    components: {
        Color,
    },
    props: {
        size: {
            type: Number,
            default: 5,
        },
        color: {
            type: String,
            default: '#000000',
        },
    },
    data() {
        return {
            currentColor: null,
            colorPickerOpen: false,
        }
    },
    mounted() {
        this.currentColor = this.color
        window.addEventListener('click', e => {
            if (e.target.classList.contains('WriteArea')) {
                this.colorPickerOpen = false
            }
        })
    },
    methods: {
        updateColor(color) {
            this.currentColor = color
            this.$emit('onChange', { color })
        },
    },
}
</script>
<style lang="scss">
@import '~/assets/styles/base';

@mixin thumb {
    font-size: 1.6rem;
    height: 1em;
    width: 1em;
    background: var(--color-black);
    cursor: move;
    border-radius: 50%;
    border: none;
    -webkit-appearance: none !important;
    -ms-appearance: none !important;
    -moz-appearance: none !important;

    @include touch {
        font-size: 0.8rem;
    }
}

.WriteTools {
    position: fixed;
    bottom: 5rem;
    right: 5rem;
    left: 5rem;
    z-index: 20;

    &__tool {
        margin-left: 1.5em;
    }

    p,
    button {
        line-height: 1.5em;
        font-size: 1.6rem;
    }

    &__colorViewer {
        height: 1rem;
        width: 1rem;
        border: 0.1rem solid var(--color-black);
        margin-left: 0.4rem;
    }

    .Color {
        position: absolute;
        bottom: 4rem;
        right: 0;
    }

    input[type='range'] {
        transform: translateY(0.2rem);
        background: var(--color-black);
        -webkit-appearance: none !important;
        height: 0.2rem;
        margin-left: 1rem;

        &::-webkit-slider-thumb {
            @include thumb;
        }

        &::-ms-thumb {
            @include thumb;
        }

        &::-moz-range-thumb {
            @include thumb;
        }
    }
}
</style>
