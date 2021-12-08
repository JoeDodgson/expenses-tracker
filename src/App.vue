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
import { useQuasar } from "quasar";

const alerts = {
  create: {
    color: "positive",
    icon: "fas fa-check",
    message: "New expense was added",
    timeout: 5000,
  },
  update: {
    color: "positive",
    message: "Expense was updated",
    icon: "fas fa-check",
    timeout: 5000,
  },
  delete: {
    color: "positive",
    icon: "fas fa-check",
    message: "Expense was deleted",
    timeout: 5000,
  },
};

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
      this.showNotif("create", "bottom");
    },
    editExpense(updatedExpense) {
      console.log("editExpense");
      this.expenses = this.expenses.filter(
        (expense) => expense.id !== updatedExpense.id
      );
      this.expenses = [...this.expenses, updatedExpense];
      this.updateBalance();
      this.showNotif("update", "bottom");
    },
    deleteExpense(id) {
      this.expenses = this.expenses.filter((expense) => expense.id !== id);
      this.updateBalance();
      this.showNotif("delete", "bottom");
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
        name: "September pay",
        date: "15/09/2021",
        cost: 1000,
        formattedCost: "£1000.00",
        type: "income",
      },
      {
        id: 2,
        name: "Tesco food shopping",
        date: "01/10/2021",
        cost: 50.99,
        formattedCost: "£50.99",
        type: "expenditure",
      },
      {
        id: 3,
        name: "Concert tickets",
        date: "13/10/2021",
        cost: 190,
        formattedCost: "£190.00",
        type: "expenditure",
      },
      {
        id: 4,
        name: "October pay",
        date: "15/10/2021",
        cost: 1100,
        formattedCost: "£1100.00",
        type: "income",
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
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      showNotif(type, position) {
        const { color, textColor, multiLine, icon, message, avatar, actions, timeout } =
          alerts[type];

        $q.notify({
          color,
          textColor,
          icon,
          message,
          position,
          avatar,
          multiLine,
          actions,
          timeout,
        });
      },
    };
  },
};
</script>

<style lang="scss"></style>
