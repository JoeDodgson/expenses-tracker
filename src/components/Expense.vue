<template>
  <div :class="[type === 'income' ? 'income' : 'expense', 'expense-card']">
    <div class="expense-details">
      <h3>{{ type === 'income' ? '+' : '-'}} {{ cost }}</h3>
      <p>{{ name }}</p>
      <p>{{ date }}</p>
    </div>
    <div>
      <Button text="Modify" color="rgb(200 200 200)"/>
      <Button text="Delete" color="rgb(200 200 200)"/>
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
  props: ["name", "cost", "date", "type"],
};
</script>

<style>
  .expense-card {
    margin: 5px 0;
    padding: 10px 20px;
    cursor: pointer;
    border: 2px solid #000;
    border-radius: 2.5px;
    display: flex;
    justify-content: space-between;
  }
  .expense-details > h3, .expense-details > p {
    margin: 5px 0;
    text-align: left;
  }

  .income {
    background: rgb(0, 128, 0, 0.2)
  }

  .expense {
    background: rgba(255, 0, 0, 0.2)
  }
</style>