<template>
  <div class="home">
    <ExpenseForm msg="Welcome to Your Vue.js App" />
    <Expenses :expenses="expenses"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ExpenseForm from "@/components/ExpenseForm.vue";
import Expenses from "@/components/Expenses.vue";

export default {
  name: "Home",
  components: {
    ExpenseForm,
    Expenses
  },
  data() {
    return {
      expenses: []
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
    ]
  }
};
</script>
