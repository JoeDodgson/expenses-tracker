<template>
  <div class="row">
    <h3>Saved Expenses</h3>
  </div>
  <div class="q-pa-md items-start q-gutter-md">
    <Expense
      :key="expense.id"
      v-for="expense in expenses"
      :id="expense.id"
      :name="expense.name"
      :date="expense.date"
      :type="expense.type"
      :formattedCost="expense.formattedCost"
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

<style></style>
