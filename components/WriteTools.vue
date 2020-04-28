<template>
    <div class="WriteTools is-flex">
        <div class="WriteTools__tool is-baseline is-flex">
            <p class="is-block">Pencil size</p>
            <input
                ref="size"
                @input="$emit('onChange', { size: $refs.size.value })"
                value="2"
                name="size"
                step="0.01"
                type="range"
                min="1"
                max="10"
            />
        </div>
        <div class="WriteTools__tool is-baseline is-flex">
            <Color v-show="colorPickerOpen" @change="updateColor" @click="colorPickerOpen = true" />
            <p
                @click="colorPickerOpen = !colorPickerOpen"
                :class="{ active: colorPickerOpen }"
                class="is-flex is-center is-activable is-baseline"
            >
                Color
                <span
                    :style="{ backgroundColor: color }"
                    class="WriteTools__colorViewer is-block"
                />
            </p>
        </div>
        <!-- <div class="WriteTools__tool is-flex is-center">
            <button class="button">Clear text</button>
        </div> -->
    </div>
</template>
<script>
import Color from '~/components/Color'

export default {
    name: 'WriteTools',
    components: {
        Color,
    },
    data() {
        return {
            color: '#000000',
            colorPickerOpen: false,
        }
    },
    mounted() {
        // window.addEventListener('click', () => (this.colorPickerOpen = false))
    },
    methods: {
        updateColor(color) {
            this.color = color
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
    z-index: 20;

    &__tool {
        margin-left: 2.5em;
    }

    p {
        line-height: 1.5em;
        font-size: 1.6rem;
        padding: 0 0.4em;

        &.active {
            background: var(--color-grey);
            border-radius: 0.3rem;
        }
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
        transform: translateY(-0.4rem);
        background: var(--color-black);
        -webkit-appearance: none !important;
        height: 0.2rem;

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

    input[type='text'] {
        width: 5rem;
        border: none;
    }
}
</style>
