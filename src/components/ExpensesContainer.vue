<template>
  <div class="items-start">
    <Expense
      :key="expense.id"
      v-for="expense in expenses"
      :id="expense.id"
      :name="expense.name"
      :date="expense.date"
      :cost="expense.cost"
      :formattedCost="expense.formattedCost"
      :type="expense.type"
      @create-expense="$emit('create-expense', $event)"
      @update-expense="$emit('update-expense', $event)"
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
  emits: ["create-expense", "update-expense", "delete-expense"],
};
</script>

<style></style>
