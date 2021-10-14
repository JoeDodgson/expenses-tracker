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
  }
};
</script>
