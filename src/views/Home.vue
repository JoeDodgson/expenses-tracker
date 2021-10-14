<template>
  <div class="home">
    <ExpenseForm msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import ExpenseForm from "@/components/ExpenseForm.vue";

export default {
  name: "Home",
  components: {
    ExpenseForm,
  },
};
</script>
