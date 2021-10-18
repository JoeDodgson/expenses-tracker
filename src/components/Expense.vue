<template>
  <div class="expense-card">
    <h3>{{ name }} - {{ cost }} - {{ date }}</h3>
    <div>
      <Button text="Modify" color="grey"/>
      <Button text="Delete" color="red"/>
    </div>
  </div>
</template>

<script>
import Button from './Button';
export default {
  name: "Expense",
  components: {
    Button
  },
  props: ["name", "cost", "date"],
};
</script>

<style>
  .expense-card {
    background: #f4f4f4;
    margin: 5px 10px;
    padding: 10px 20px;
    cursor: pointer;
    border: 2px solid #000;
    border-radius: 2.5px;
    display: flex;
    justify-content: space-between;
  }
</style>