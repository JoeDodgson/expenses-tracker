<template>
    <button :style="{ background: color }" :type="type">
        {{ text }}
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: String,
        color: String,
        type: String
    }
}
</script>

