<template>
  <div
    :class="[expense.type === 'income' ? 'income' : 'expense', 'expense-card']"
  >
    <div>
      <h3>
        {{ expense.type === "income" ? "+" : "-" }} {{ expense.formattedCost }}
      </h3>
      <p>{{ expense.name }}</p>
      <p>{{ expense.date }}</p>
    </div>
    <div>
      <Button
        text="Delete"
        color="rgb(200 200 200)"
        @click="$emit('delete-expense', expense.id)"
      />
    </div>
  </div>
</template>

<script>
import Button from "./Button";
export default {
  name: "Expense",
  components: {
    Button,
  },
  props: {
    expense: Object,
  },
  emits: ["delete-expense"],
};
</script>

<style>
</style>
