<template>
  <div :key="expense.id" v-for="expense in expenses">
    <Expense :name="expense.name" :cost="expense.cost" :date="expense.date" />
  </div>
</template>

<script>
import Expense from "@/components/Expense.vue";
export default {
  name: "ExpensesContainer",
  components: Expense,
  props: {
    expenses: Array,
  },
};
</script>
