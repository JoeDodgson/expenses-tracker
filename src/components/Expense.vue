<template>
  <div
    :class="[expense.type === 'income' ? 'income' : 'expense', 'expense-card']"
  >
    <div class="expense-details">
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
.expense-card {
  margin: 5px 0;
  padding: 10px 20px;
  cursor: pointer;
  border: 2px solid #000;
  border-radius: 2.5px;
  display: flex;
  justify-content: space-between;
}
.expense-details > h3,
.expense-details > p {
  margin: 5px 0;
  text-align: left;
}

.income {
  background: rgb(0, 128, 0, 0.2);
}

.expense {
  background: rgba(255, 0, 0, 0.2);
}
</style>
