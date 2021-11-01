<template>
  <form id="expenses-form" action="./expense-processing">
    <label for="ename">Expense name</label>
    <input type="text" id="" name="" value="" @keyup="searchName"/>
    <br>
    <br>
    <label for="startDate">Start date</label>
    <input type="date" id="" name="" value=""/>
    <br>
    <label for="endDate">End date</label>
    <input type="date" id="" name="" value=""/>
    <br>
    <br>
    <label for="minCost">Minimum cost</label>
    <input type="text" id="" name="" value=""/>
    <br>
    <label for="maxCost">Maximum cost</label>
    <input type="text" id="" name="" value=""/>
    <br>
    <br>
    <input type="radio" id="income" name="etype" value="income" @change="searchType">
    <label for="income">Income</label><br>
    <input type="radio" id="expense" name="etype" value="expenditure" @change="searchType">
    <label for="expense">Expenditure</label><br>
    <input type="radio" id="expense" name="etype" value="" @change="searchType">
    <label for="both">Both</label><br>
    <br>
  </form>
</template>

<script>
export default {
  name: 'SaveExpense',
  emits: ['search-name', 'search-type'],
  methods: {
    searchName(event) {
      const text = event.target.value;
      this.$emit('search-name', text)
    },
    searchType(event) {
      const type = event.target.value;
      this.$emit('search-type', type);
    }
  }
}
</script>

<style>
</style>