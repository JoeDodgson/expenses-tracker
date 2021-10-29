<template>
  <div class="manage-expenses">
    <h2 class="title-left">Search for expenses</h2>
    <SearchExpense @search-name="filterName($event)"/>
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
      filteredExpenses: [],
      filterValues: {},
      filterProperties: ['name'],
    }
  },
  created() {
    this.filteredExpenses = this.expenses;
  },
  methods: {
    filterName(text) {
      this.filterValues['name'] = text.toLowerCase();
      this.filterExpenses();
    },
    filterExpenses() {
      let updatedFilteredExpenses = this.expenses;
      for (let i = 0; i < this.filterProperties.length; i++) {
        const filterProperty = this.filterProperties[i];
        const filterValue = this.filterValues[filterProperty];
        updatedFilteredExpenses = updatedFilteredExpenses
          .filter((expense => {
            return expense[filterProperty].toLowerCase().includes(filterValue);
          }));
      }
      this.filteredExpenses = updatedFilteredExpenses;
    },
  },

};
</script>