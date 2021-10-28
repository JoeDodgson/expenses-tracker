<template>
  <div class="manage-expenses">
    <h2 class="title-left">Search for expenses</h2>
    <SearchExpense @search-name="filterExpenses('name', $event)"/>
    <SortBy />
    <ExpensesContainer :expenses="filteredExpenses" @delete-expense="deleteExpense($event)"/>
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
  },
  data() {
    return {
      filteredExpenses: Array,
    }
  },
  created() {
    this.filteredExpenses = this.expenses;
  },
  methods: {
    filterExpenses(filterProperty, text) {
      this.filteredExpenses = this.expenses
        .filter((expense => {
          return expense[filterProperty].toLowerCase().includes(text.toLowerCase());
        }));
    },
  },

};
</script>