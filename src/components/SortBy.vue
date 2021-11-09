<template>
  <form action="/">
    <label for="sort-by">Sort by:</label>
    <select name="sort-by" id="sort-by" @change="sortExpenses">
      <option value="date-n-o">Date: Newest to Oldest</option>
      <option value="date-o-n">Date: Oldest to Newest</option>
      <option value="name-a-z">Name: A to Z</option>
      <option value="name-z-a">Name: Z to A</option>
      <option value="value-l-h">Value: Low to High</option>
      <option value="value-h-l">Value: High to Low</option>
    </select>
    <br /><br />
  </form>
</template>

<script>
export default {
  name: "SortBy",
  emits: ["sort-expenses"],
  methods: {
    sortExpenses(event) {
      const sortType = event.target.value;
      this.$emit("sort-expenses", sortType);
    },
  },
};
</script>

<style></style>
