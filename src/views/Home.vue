<template>
  <div class="home">
    <h2 class="title-left">Add expense</h2>
    <NewExpense />
    <div>
      <h3>Balance: {{ balance }}</h3>
    </div>
    <ExpensesContainer :expenses="expenses" @delete-expense="deleteExpense($event)"/>
  </div>
</template>

<script>
// @ is an alias to /src
import NewExpense from "@/components/NewExpense.vue";
import ExpensesContainer from "@/components/ExpensesContainer.vue";

export default {
  name: "Home",
  components: {
    NewExpense,
    ExpensesContainer,
  },
  props: {
    expenses: Array,
    balance: String,
  },
};
</script>
