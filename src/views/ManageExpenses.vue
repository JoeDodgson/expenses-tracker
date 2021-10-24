<template>
  <div class="manage-expenses">
    <h2 class="title-left">Search for expenses</h2>
    <SearchExpense />
    <SortBy />
    <ExpensesContainer :expenses="expenses" />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchExpense from "@/components/SearchExpense.vue";
import ExpensesContainer from "@/components/ExpensesContainer.vue";
import SortBy from "@/components/SortBy.vue";

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
  name: "Home",
  components: {
    SearchExpense,
    ExpensesContainer,
    SortBy,
  },
  data() {
    return {
      expenses: [],
      balance: 0,
    }
  },
  created() {
    this.expenses = [
      {
        id: 1,
        name: 'Arup September pay',
        date: '2021-09-15',
        cost: 2000,
        type: 'income',
      },
      {
        id: 2,
        name: 'Tesco food shopping',
        date: '2021-10-01',
        cost: 50.99,
        type: 'expenditure',
      },
      {
        id: 3,
        name: 'Red Hot Chili Peppers tickets',
        date: '2021-10-13',
        cost: 190,
        type: 'expenditure',
      },
    ];
    for (let i = 0; i < this.expenses.length; i++) {
      const expenseItem = this.expenses[i];
      if (expenseItem['cost']) {
        const priceFormattedUK = formatCurrency(expenseItem['cost'], 'en-GB', 'GBP')
        this.expenses[i]['costFormatted'] = priceFormattedUK;
      }
    }
    this.balance = formatCurrency(this.expenses.reduce((a,b) => b['type'] == 'income' ? a + b['cost'] : a - b['cost'], 0), 'en-GB', 'GBP');
  }
};
</script>

<style>
</style>