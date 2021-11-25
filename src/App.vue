<template>
  <q-layout view="lHh Lpr lFf" class="q-pa-lg">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Expenses Tracker </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in this.linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view
        :expenses="expenses"
        :balance="balance"
        @create-expense="createExpense($event)"
        @edit-expense="editExpense($event)"
        @delete-expense="deleteExpense($event)"
      />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import EssentialLink from "./components/EssentialLink.vue";

export default {
  name: "App",
  components: {
    EssentialLink,
  },
  data() {
    return {
      expenses: [],
      balance: 0,
      linksList: [
        {
          title: "Home",
          caption: "",
          icon: "fas fa-home",
          link: "#/",
          newTab: false,
        },
        {
          title: "Manage Expenses",
          caption: "",
          icon: "fas fa-edit",
          link: "#/manage-expenses",
          newTab: false,
        },
        {
          title: "About",
          caption: "",
          icon: "fas fa-info",
          link: "#/about",
          newTab: false,
        },
        {
          title: "Github Repo",
          caption: "github.com/JoeDodgson/expenses-tracker",
          icon: "fab fa-github",
          link: "https://github.com/JoeDodgson/expenses-tracker",
          newTab: true,
        },
      ],
    };
  },
  methods: {
    createExpense(expense) {
      this.expenses = [...this.expenses, expense];
      this.updateBalance();
    },
    editExpense(updatedExpense) {
      console.log("editExpense");
      this.expenses = this.expenses.filter(
        (expense) => expense.id !== updatedExpense.id
      );
      this.expenses = [...this.expenses, updatedExpense];
      this.updateBalance();
    },
    deleteExpense(id) {
      this.expenses = this.expenses.filter((expense) => expense.id !== id);
      this.updateBalance();
    },
    formatCurrency(value, language, currency) {
      const formattedCurrency = new Intl.NumberFormat(
        language, // BCP 47 language tag
        {
          style: "currency", // we want a currency
          currency, // ISO 4217 currency code
        }
      ).format(value);
      return formattedCurrency;
    },
    updateBalance() {
      this.balance = this.formatCurrency(
        this.expenses.reduce(
          (a, b) => (b["type"] == "income" ? a + b["cost"] : a - b["cost"]),
          0
        ),
        "en-GB",
        "GBP"
      );
    },
  },
  created() {
    this.expenses = [
      {
        id: 1,
        name: "Arup September pay",
        date: "2021-09-15",
        cost: 2000,
        formattedCost: "£2000.00",
        type: "income",
      },
      {
        id: 2,
        name: "Tesco food shopping",
        date: "2021-10-01",
        cost: 50.99,
        formattedCost: "£50.99",
        type: "expenditure",
      },
      {
        id: 3,
        name: "Red Hot Chili Peppers tickets",
        date: "2021-10-13",
        cost: 190,
        formattedCost: "£190.00",
        type: "expenditure",
      },
    ];
    for (let i = 0; i < this.expenses.length; i++) {
      const expenseItem = this.expenses[i];
      if (expenseItem["cost"]) {
        const priceFormattedUK = this.formatCurrency(
          expenseItem["cost"],
          "en-GB",
          "GBP"
        );
        this.expenses[i]["costFormatted"] = priceFormattedUK;
      }
    }
    this.updateBalance();
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>

<style lang="scss"></style>
