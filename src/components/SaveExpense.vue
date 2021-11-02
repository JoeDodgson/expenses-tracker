<template>
  <form id="expenses-form" @submit="onSubmit">
    <label for="ename">Expense name</label>
    <input type="text" v-model="name" id="name" name="name" />
    <br>
    <br>
    <label for="date">Date</label>
    <input type="date" v-model="date" id="date" name="date" />
    <br>
    <br>
    <label for="cost">Cost</label>
    <input type="text" v-model="cost" id="cost" name="cost" />
    <br>
    <br>
    <label for="income">Income</label><br>
    <input type="radio" v-model="type" id="income" name="type" value="income" />
    <label for="expense">Expense</label><br>
    <input type="radio" v-model="type" id="expense" name="type" value="expense" checked/>
    <br>
    <input type="submit" value="Save Expense">
  </form>
</template>

<script>
const formatCurrency = (value, language, currency) => {
  const formattedCurrency = new Intl.NumberFormat(
    language, // BCP 47 language tag 
    {
      style: 'currency', // we want a currency
      currency // ISO 4217 currency code
    }
  ).format(value);
  return formattedCurrency;
}

export default {
  name: 'SaveExpense',
  data() {
    return {
      ename: '',
      date: '',
      cost: '',
      type: 'expense',
    }
  },
  emits: ['add-expense'],
  methods: {
    onSubmit(event) {
      event.preventDefault();

      if(!this.name) {
        alert('Please enter an expense name');
        return;
      }

      if(!this.date) {
        alert('Please select a date');
        return;
      }

      if(!this.cost) {
        alert('Please enter a cost');
        return;
      }

      const newCost = Math.round(this.cost * 100) / 100;
      const newFormattedCost = formatCurrency(newCost, 'en-GB', 'GBP');

      const newExpense = {
        id: Math.floor(Math.random() * 100000),
        name: this.name,
        date: this.date,
        cost: newCost,
        formattedCost: newFormattedCost,
        type: this.type,
      }

      this.$emit('add-expense', newExpense)

      this.name = '';
      this.date = '';
      this.cost = '';
      this.type = 'expense';
    }
  }
}
</script>

<style>
</style>