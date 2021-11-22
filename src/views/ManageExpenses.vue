<template>
  <div class="manage-expenses">
    <h4 class="text-h4 title-left">Search for expenses</h4>
    <SearchExpense
      @search-name="updateTextFilter('name', $event)"
      @search-type="updateTextFilter('type', $event)"
      @search-start-date="updateDateFilter('startDate', $event)"
      @search-end-date="updateDateFilter('endDate', $event)"
      @search-min-cost="updateCostFilter('minCost', $event)"
      @search-max-cost="updateCostFilter('maxCost', $event)"
      @sort-expenses="sortExpenses($event)"
    />
    <ExpensesContainer
      :expenses="filteredExpenses"
      @delete-expense="deleteExpense($event)"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchExpense from "@/components/SearchExpense.vue";
import ExpensesContainer from "@/components/ExpensesContainer.vue";

export default {
  name: "Home",
  components: {
    SearchExpense,
    ExpensesContainer,
  },
  props: {
    expenses: Array,
    balance: String,
  },
  data() {
    return {
      filteredExpenses: [],
      textFilters: {
        name: "",
        type: "",
      },
      dateFilters: {
        startDate: null,
        endDate: null,
      },
      costFilters: {
        minCost: null,
        maxCost: null,
      },
    };
  },
  created() {
    this.filteredExpenses = this.expenses;
  },
  methods: {
    updateTextFilter(property, value) {
      this.textFilters[property] = value.toLowerCase();
      this.filterExpenses();
    },
    updateDateFilter(property, value) {
      this.dateFilters[property] = value;
      this.filterExpenses();
    },
    updateCostFilter(property, value) {
      this.costFilters[property] = value;
      this.filterExpenses();
    },
    filterExpenses() {
      let updatedFilteredExpenses = this.expenses;
      // Filter by all the values in the textFilters object
      for (const filterProperty in this.textFilters) {
        const filterValue = this.textFilters[filterProperty];
        updatedFilteredExpenses = updatedFilteredExpenses.filter((expense) => {
          return expense[filterProperty].toLowerCase().includes(filterValue);
        });
      }
      // Filter by the start and end dates in the dateFilters object
      updatedFilteredExpenses = updatedFilteredExpenses
        .filter((expense) => {
          // If both startDate and endDate filters
          if (this.dateFilters["startDate"] && this.dateFilters["endDate"]) {
            return (
              Date.parse(expense["date"]) > this.dateFilters["startDate"] &&
              Date.parse(expense["date"]) < this.dateFilters["endDate"]
            );
          }
          // If only startDate filter
          if (this.dateFilters["startDate"] && !this.dateFilters["endDate"]) {
            return Date.parse(expense["date"]) > this.dateFilters["startDate"];
          }
          // If only endDate filter
          if (!this.dateFilters["startDate"] && this.dateFilters["endDate"]) {
            return Date.parse(expense["date"]) < this.dateFilters["endDate"];
          }
          return true;
        })

        // Filter by the min and max cost in the costFilters object
        .filter((expense) => {
          // If both minCost and maxCost filters
          if (this.costFilters["minCost"] && this.costFilters["maxCost"]) {
            return (
              expense["cost"] > this.costFilters["minCost"] &&
              expense["cost"] < this.costFilters["maxCost"]
            );
          }
          // If only minCost filter
          if (this.costFilters["minCost"] && !this.costFilters["maxCost"]) {
            return expense["cost"] > this.costFilters["minCost"];
          }
          // If only maxCost filter
          if (!this.costFilters["minCost"] && this.costFilters["maxCost"]) {
            return expense["cost"] < this.costFilters["maxCost"];
          }
          return true;
        });

      this.filteredExpenses = updatedFilteredExpenses;
    },
    sortExpenses(sortType) {
      switch (sortType) {
        case "date-n-o":
          this.filteredExpenses = this.filteredExpenses.sort(
            (a, b) => new Date(b["date"]) - new Date(a["date"])
          );
          break;
        case "date-o-n":
          this.filteredExpenses = this.filteredExpenses.sort(
            (a, b) => new Date(a["date"]) - new Date(b["date"])
          );
          break;
        case "name-a-z":
          this.filteredExpenses = this.filteredExpenses.sort((a, b) =>
            a["name"] < b["name"] ? -1 : 1
          );
          break;
        case "name-z-a":
          this.filteredExpenses = this.filteredExpenses.sort((a, b) =>
            a["name"] < b["name"] ? 1 : -1
          );
          break;
        case "value-l-h":
          this.filteredExpenses = this.filteredExpenses.sort(
            (a, b) => a["cost"] - b["cost"]
          );
          break;
        case "value-h-l":
          this.filteredExpenses = this.filteredExpenses.sort(
            (a, b) => b["cost"] - a["cost"]
          );
          break;
      }
    },
  },
};
</script>
