<template>
  <div class="expense-card">
    <h3>{{ name }} - £{{ cost }} - {{ date }}</h3>
  </div>
</template>

<script>
export default {
  name: "Expense",
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
  }
</style>