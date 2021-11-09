<template>
  <form id="expenses-form" action="./expense-processing">
    <label for="ename">Expense name</label>
    <input type="text" id="" name="" value="" @keyup="searchName" />
    <br />
    <br />
    <label for="startDate">Start date</label>
    <input type="date" id="" name="" value="" @change="searchStartDate" />
    <br />
    <label for="endDate">End date</label>
    <input type="date" id="" name="" value="" @change="searchEndDate" />
    <br />
    <br />
    <label for="minCost">Minimum cost</label>
    <input type="text" id="" name="" value="" @keyup="searchMinCost" />
    <br />
    <label for="maxCost">Maximum cost</label>
    <input type="text" id="" name="" value="" @keyup="searchMaxCost" />
    <br />
    <br />
    <input
      type="radio"
      id="income"
      name="etype"
      value="income"
      @change="searchType"
    />
    <label for="income">Income</label><br />
    <input
      type="radio"
      id="expense"
      name="etype"
      value="expenditure"
      @change="searchType"
    />
    <label for="expense">Expenditure</label><br />
    <input
      type="radio"
      id="expense"
      name="etype"
      value=""
      @change="searchType"
    />
    <label for="both">Both</label><br />
    <br />
  </form>
</template>

<script>
export default {
  name: "SaveExpense",
  emits: [
    "search-name",
    "search-type",
    "search-start-date",
    "search-end-date",
    "search-min-cost",
    "search-max-cost",
  ],
  methods: {
    searchName(event) {
      const text = event.target.value;
      this.$emit("search-name", text);
    },
    searchType(event) {
      const type = event.target.value;
      this.$emit("search-type", type);
    },
    searchStartDate(event) {
      const startDate = Date.parse(event.target.value);
      this.$emit("search-start-date", startDate);
    },
    searchEndDate(event) {
      const endDate = Date.parse(event.target.value);
      this.$emit("search-end-date", endDate);
    },
    searchMinCost(event) {
      const minCost = event.target.value;
      this.$emit("search-min-cost", minCost);
    },
    searchMaxCost(event) {
      const maxCost = event.target.value;
      this.$emit("search-max-cost", maxCost);
    },
  },
};
</script>

<style></style>
