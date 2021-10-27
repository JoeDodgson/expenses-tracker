<template>
  <div class="manage-expenses">
    <h2 class="title-left">Search for expenses</h2>
    <SearchExpense />
    <SortBy />
    <ExpensesContainer :expenses="expenses" @delete-expense="deleteExpense($event)"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchExpense from "@/components/SearchExpense.vue";
import ExpensesContainer from "@/components/ExpensesContainer.vue";
import SortBy from "@/components/SortBy.vue";

export default {
  name: "Home",
  components: {
    SearchExpense,
    ExpensesContainer,
    SortBy,
  },
  props: {
    expenses: Array,
    balance: String
  }
};
</script>