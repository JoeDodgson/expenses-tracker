<template>
  <Navbar />
  <Header />
  <router-view />
</template>

<script>
import Header from './components/Header'
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Header,
    Navbar
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 576px;
  margin: auto;
  border: 2px solid #2c3e50;
  border-radius: 5px;
}

#nav {
  padding: 15px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
