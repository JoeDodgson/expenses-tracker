<template>
  <div class="expenses-container">
    <h3 class="left-title">Saved Expenses</h3>
    <Expense :key="expense.id" v-for="expense in expenses" :name="expense.name" :cost="expense.costFormatted" :date="expense.date" :type="expense.type"/>
  </div>
</template>

<script>
import Expense from "@/components/Expense.vue";
export default {
  name: "ExpensesContainer",
  components: {
    Expense
  },
  props: {
    expenses: Array,
  },
};
</script>

<style>
.left-title {
  text-align: left;
}
</style>
