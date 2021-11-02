<template>
  <Navbar />
  <Header />
  <router-view
    :expenses="expenses"
    :balance="balance"
    @add-expense="addExpense($event)"
    @delete-expense="deleteExpense($event)"
  />
  <Footer />
</template>

<script>
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Navbar,
    Footer,
  },
  data() {
    return {
      expenses: [],
      balance: 0,
    }
  },
  methods: {
    deleteExpense(id) {
      this.expenses = this.expenses.filter(expense => expense.id !== id);
      this.updateBalance()
    },
    addExpense(expense) {
      this.expenses = [...this.expenses, expense];
      this.updateBalance()
    },
    formatCurrency (value, language, currency) {
      const formattedCurrency = new Intl.NumberFormat(
        language, // BCP 47 language tag 
        {
          style: 'currency', // we want a currency
          currency // ISO 4217 currency code
        }
      ).format(value);
      return formattedCurrency;
    },
    updateBalance() {
      console.log(this.balance);
      console.log(this.expenses);
      this.balance = this.formatCurrency(this.expenses.reduce((a,b) => b['type'] == 'income' ? a + b['cost'] : a - b['cost'], 0), 'en-GB', 'GBP');
    },
  },
  created() {
    this.expenses = [
      {
        id: 1,
        name: 'Arup September pay',
        date: '2021-09-15',
        cost: 2000,
        formattedCost: '£2000.00',
        type: 'income',
      },
      {
        id: 2,
        name: 'Tesco food shopping',
        date: '2021-10-01',
        cost: 50.99,
        formattedCost: '£50.99',
        type: 'expenditure',
      },
      {
        id: 3,
        name: 'Red Hot Chili Peppers tickets',
        date: '2021-10-13',
        cost: 190,
        formattedCost: '£190.00',
        type: 'expenditure',
      },
    ];
    for (let i = 0; i < this.expenses.length; i++) {
      const expenseItem = this.expenses[i];
      if (expenseItem['cost']) {
        const priceFormattedUK = this.formatCurrency(expenseItem['cost'], 'en-GB', 'GBP')
        this.expenses[i]['costFormatted'] = priceFormattedUK;
      }
    };
    this.updateBalance();
  },
}
</script>

<style lang="scss">
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
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
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.title-left {
  text-align: left;
}

.home, .manage-expenses, #nav {
  padding: 15px;
}
</style>
