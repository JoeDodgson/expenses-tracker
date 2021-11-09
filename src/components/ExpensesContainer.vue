<template>
  <div >
    <h3 >Saved Expenses</h3>
    <Expense
      :key="expense.id"
      v-for="expense in expenses"
      :expense="expense"
      @delete-expense="$emit('delete-expense', $event)"
    />
  </div>
</template>

<script>
import Expense from "@/components/Expense.vue";
export default {
  name: "ExpensesContainer",
  components: {
    Expense,
  },
  props: {
    expenses: Array,
  },
  emits: ["delete-expense"],
};
</script>

<style>
</style>
