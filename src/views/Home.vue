<template>
  <div class="home">
    <h4 class="text-h4 title-left">Add expense</h4>
    <SaveExpense @add-expense="$emit('add-expense', $event)" />
    <div>
      <h3>Balance: {{ balance }}</h3>
    </div>
    <ExpensesContainer
      :expenses="expenses"
      @delete-expense="$emit('delete-expense', $event)"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import SaveExpense from "@/components/SaveExpense.vue";
import ExpensesContainer from "@/components/ExpensesContainer.vue";

export default {
  name: "Home",
  components: {
    SaveExpense,
    ExpensesContainer,
  },
  props: {
    expenses: Array,
    balance: String,
  },
  emits: ["add-expense", "delete-expense"],
};
</script>
