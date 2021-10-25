<template>
  <form id="expenses-form" action="./expense-processing">
    <label for="ename">Expense name</label>
    <input type="text" id="" name="" value=""/>
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
    <input type="radio" id="income" name="etype" value="income">
    <label for="income">Income</label><br>
    <input type="radio" id="expense" name="etype" value="expense">
    <label for="expense">Expense</label><br>
    <input type="radio" id="expense" name="etype" value="both">
    <label for="both">Both</label><br>
    <br>
    <Button text="Search" color="white" type="submit"></Button>
  </form>
</template>

<script>
import Button from './Button'
export default {
  name: 'NewExpense',
  components: {
    Button
  }
}
</script>

<style>
</style>