<template>
  <div class="expenses-container">
    <h3 class="left-title">Saved Expenses</h3>
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
.left-title {
  text-align: left;
}
</style>
