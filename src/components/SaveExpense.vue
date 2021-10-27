<template>
  <form id="expenses-form" action="./expense-processing">
    <label for="ename">Expense name</label>
    <input type="text" id="" name="" value=""/>
    <br>
    <br>
    <label for="date">Date</label>
    <input type="date" id="" name="" value=""/>
    <br>
    <br>
    <label for="cost">Cost</label>
    <input type="text" id="" name="" value=""/>
    <br>
    <br>
    <input type="radio" id="income" name="etype" value="income">
    <label for="income">Income</label><br>
    <input type="radio" id="expense" name="etype" value="Expense">
    <label for="expense">Expense</label><br>
    <br>
    <Button text="Confirm Expense" color="white" type="submit"></Button>
  </form>
</template>

<script>
import Button from './Button'
export default {
  name: 'SaveExpense',
  components: {
    Button
  }
}
</script>

<style>
</style>