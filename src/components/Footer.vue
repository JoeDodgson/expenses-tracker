<template>
  <div id="footer">
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
#footer {
  text-align: center;
  border-top: 2px solid #2c3e50;
  padding: 10px;
}
</style>
