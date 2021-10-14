<template>
    <div :key="expense.id" v-for="expense in expenses">
        <h3>{{ expense.name }}</h3>
    </div>
</template>

<script>
    export default {
        name: 'Expenses',
        props: {
            expenses: Array,
        }
    }
</script>