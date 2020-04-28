<template>
    <button v-html="text" class="Button" />
</template>
<script>
export default {
    name: 'Button',
    props: {
        text: {
            type: String,
            default: '',
        },
    },
}
</script>
<style lang="scss">
.Button {
    position: fixed;
    background: darkgreen;
    display: block;
    width: 20rem;
    height: auto;
    bottom: 5rem;
}
</style>
