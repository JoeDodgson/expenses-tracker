<template>
  <div class="manage-expenses">
    <h2 class="title-left">Search for expenses</h2>
    <SearchExpense @search-name="updateFilter('name', $event)" @search-type="updateFilter('type', $event)"/>
    <SortBy @sort-expenses="sortExpenses($event)"/>
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
      textFilters: {
        'name': '',
        'type': '',
      },
    }
  },
  created() {
    this.filteredExpenses = this.expenses;
  },
  methods: {
    updateFilter(property, value) {
      this.textFilters[property] = value.toLowerCase();
      this.filterExpenses();
    },
    filterExpenses() {
      let updatedFilteredExpenses = this.expenses;
      for (const filterProperty in this.textFilters) {
        const filterValue = this.textFilters[filterProperty];
        updatedFilteredExpenses = updatedFilteredExpenses
          .filter((expense => {
            return expense[filterProperty].toLowerCase().includes(filterValue);
          }));
      }
      this.filteredExpenses = updatedFilteredExpenses;
    },
    sortExpenses(sortType) {
      switch (sortType) {
        case "date-n-o":
          this.filteredExpenses = this.filteredExpenses.sort((a,b) => new Date(b['date']) - new Date(a['date']));
          break;
        case "date-o-n":
          this.filteredExpenses = this.filteredExpenses.sort((a,b) => new Date(a['date']) - new Date(b['date']));
          break;
        case "name-a-z":
          this.filteredExpenses = this.filteredExpenses.sort((a,b) => a['name'] < b['name'] ? -1 : 1);
          break;
        case "name-z-a":
          this.filteredExpenses = this.filteredExpenses.sort((a,b) => a['name'] < b['name'] ? 1 : -1);
          break;
        case "value-l-h":
          this.filteredExpenses = this.filteredExpenses.sort((a,b) => a['cost'] - b['cost']);
          break;
        case "value-h-l":
          this.filteredExpenses = this.filteredExpenses.sort((a,b) => b['cost'] - a['cost']);
          break;
      }
    },
  },

};
</script>