<template>
  <div class="home">
    <h2 class="title-left">Add expense</h2>
    <SaveExpense @add-expense="$emit('add-expense', $event)"/>
    <div>
      <h3>Balance: {{ balance }}</h3>
    </div>
    <ExpensesContainer :expenses="expenses" @delete-expense="deleteExpense($event)"/>
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
  emits: ['add-expense'],
};
</script>
