<template>
  <div>
    <p>© Joe Dodgson {{ date }}</p>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      date: new Date().getFullYear(),
    };
  },
};
</script>

<style>
</style>
