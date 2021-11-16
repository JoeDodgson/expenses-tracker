<template>
  <div class="q-pa-md">
    <form
      class="q-gutter-md"
      items-start
      id="expenses-form"
      @submit="onSubmit"
      style="max-width: 300px"
    >
      <q-input
        filled
        standout="bg-secondary"
        input-class="text-primary text-weight-bold"
        v-model="nameModel"
        label-slot
        id="name"
        name="name"
        :rules="[(val) => !!val || 'Field is required']"
      >
        <template v-slot:label>
          <span class="text-primary">Expense name</span>
        </template>
      </q-input>
      <!-- <label for="ename">Expense name</label>
      <input type="text" v-model="name" />
      <br />
      <br /> -->
      <q-input
        standout="bg-secondary"
        input-class="text-primary text-weight-bold"
        prefix="Date:"
        filled
        v-model="dateModel"
        :rules="[
          (v) => validDate(v) || 'Date is required in format DD/MM/YYYY',
        ]"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                today-btn
                color="primary"
                v-model="dateModel"
                mask="DD/MM/YYYY"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <!-- <label for="date">Date</label>
      <input type="date" v-model="date" id="date" name="date" />
      <br />
      <br /> -->

      <q-input
        standout="bg-secondary"
        input-class="text-primary text-weight-bold"
        prefix-class="text-primary"
        prefix="£"
        v-model.number="costModel"
        type="number"
        step=".01"
        label-slot
        id="cost"
        name="cost"
        @keydown="costKeyDownHandler"
      >
        <template v-slot:label>
          <span class="text-primary">Cost</span>
        </template>
      </q-input>

      <!-- <label for="cost">Cost</label>
      <input type="text" v-model="cost" id="cost" name="cost" />
      <br />
      <br /> -->

      <div class="q-pa-md">
        <div class="q-gutter-sm">
          <q-radio v-model="type" val="income" label="Income" color="primary" />
          <q-radio
            v-model="type"
            val="expense"
            label="Expense"
            color="primary"
          />
        </div>
      </div>

      <!-- <label for="income">Income</label><br />
      <input type="radio" v-model="type" id="income" name="type" value="income" />
      <label for="expense">Expense</label><br />
      <input
        type="radio"
        v-model="type"
        id="expense"
        name="type"
        value="expense"
        checked
      />
      <br /> -->
      <q-btn
        type="submit"
        :loading="submitting"
        label="Save"
        class="q-mt-md"
        color="primary"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
      <!-- <input type="submit" value="Save Expense" /> -->
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

const formatCurrency = (value, language, currency) => {
  const formattedCurrency = new Intl.NumberFormat(
    language, // BCP 47 language tag
    {
      style: "currency", // we want a currency
      currency, // ISO 4217 currency code
    }
  ).format(value);
  return formattedCurrency;
};

export default {
  name: "SaveExpense",
  data() {
    return {
      ename: "",
      date: "",
      cost: "",
      type: "expense",
    };
  },
  emits: ["add-expense"],
  methods: {
    onSubmit(event) {
      console.log(`this.name: ${this.name}`);
      console.log(`this.date: ${this.date}`);
      console.log(`this.cost: ${this.cost}`);
      event.preventDefault();

      if (!this.name) {
        alert("Please enter an expense name");
        return;
      }

      if (!this.date) {
        alert("Please select a date");
        return;
      }

      if (!this.cost) {
        alert("Please enter a cost");
        return;
      }

      const newCost = Math.round(this.cost * 100) / 100;
      const newFormattedCost = formatCurrency(newCost, "en-GB", "GBP");

      const newExpense = {
        id: Math.floor(Math.random() * 100000),
        name: this.name,
        date: this.date,
        cost: newCost,
        formattedCost: newFormattedCost,
        type: this.type,
      };

      this.$emit("add-expense", newExpense);

      this.name = "";
      this.date = "";
      this.cost = "";
      this.type = "expense";
    },
    validDate(str) {
      return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
        str
      );
    },
    costKeyDownHandler(event) {
      if (this.costModel < 1 && event.key === "ArrowDown") {
        event.preventDefault();
      }
      if (event.key === "-") {
        event.preventDefault();
      }
      if (this.costModel < 0) {
        this.costModel = 0;
      }
    },
  },
  setup() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}/${mm}/${yyyy}`;

    return {
      dateModel: ref(formattedDate),
      nameModel: ref(""),
      costModel: ref(0),
    };
  },
};
</script>

<style></style>
