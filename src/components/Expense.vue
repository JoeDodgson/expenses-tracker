<template>
  <div>
    <h3>{{ name }} - £{{ cost }} - {{ date }}</h3>
  </div>
</template>

<script>
export default {
  name: "Expense",
  props: ["name", "title", "date"],
};
</script>
