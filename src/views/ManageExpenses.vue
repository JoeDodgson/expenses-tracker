<template>
  <div class="manage-expenses">
    <h2 class="title-left">Search for expenses</h2>
    <SearchExpense @search-name="filterName($event)" @search-type="filterType($event)"/>
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
      filterValues: {
        'name': '',
        'type': '',
      },
      filterProperties: ['name', 'type'],
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
    filterType(type) {
      console.log(this.expenses);
      this.filterValues['type'] = type.toLowerCase();
      this.filterExpenses();
    },
    filterExpenses() {
      let updatedFilteredExpenses = this.expenses;
      for (let i = 0; i < this.filterProperties.length; i++) {
        const filterProperty = this.filterProperties[i];
        const filterValue = this.filterValues[filterProperty];
        console.log(filterProperty);
        console.log(filterValue);
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