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
        v-model="name"
        label-slot
        ref="nameRef"
        id="name"
        name="name"
        :rules="[(val) => !!val || 'Field is required']"
      >
        <template v-slot:label>
          <span class="text-primary">Expense name</span>
        </template>
      </q-input>
      <q-input
        standout="bg-secondary"
        input-class="text-primary text-weight-bold"
        prefix="Date:"
        filled
        v-model="date"
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
                v-model="date"
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
      <q-input
        standout="bg-secondary"
        input-class="text-primary text-weight-bold"
        prefix-class="text-primary"
        prefix="£"
        v-model.number="cost"
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
    const { resetName, resetDate, resetCost, resetType } =
      this.getResetInputs();
    return {
      name: resetName,
      date: resetDate,
      cost: resetCost,
      type: resetType,
    };
  },
  emits: ["add-expense"],
  methods: {
    onSubmit(event) {
      event.preventDefault();

      // Round cost to 2.d.p and format to £'s
      // TODO - add functionality to change currency
      const newCost = Math.round(this.cost * 100) / 100;
      const newFormattedCost = formatCurrency(newCost, "en-GB", "GBP");

      // TODO - increment expense id's
      const newExpense = {
        id: Math.floor(Math.random() * 100000),
        name: this.name,
        date: this.date,
        cost: newCost,
        formattedCost: newFormattedCost,
        type: this.type,
      };
      this.$emit("add-expense", newExpense);
      // TODO - only reset inputs when expense has been added successfully
      this.resetInputs();
    },
    // Regex to validate a date in the format DD/MM/YYYY (includes days of month and leap years)
    validDate(str) {
      return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
        str
      );
    },
    // Method to prevent user from entering negative number in cost input field
    costKeyDownHandler(event) {
      if (this.cost < 1 && event.key === "ArrowDown") {
        event.preventDefault();
      }
      if (event.key === "-") {
        event.preventDefault();
      }
      if (this.cost <= 0) {
        const { resetCost } = this.getResetInputs();
        this.cost = resetCost;
      }
    },
    // Returns reset input field values
    getResetInputs() {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const formattedDate = `${dd}/${mm}/${yyyy}`;

      return {
        resetName: "",
        resetDate: formattedDate,
        resetCost: 0.01,
        resetType: "expense",
      };
    },
    // Sets input field values using the reset values
    resetInputs() {
      const { resetName, resetDate, resetCost, resetType } =
        this.getResetInputs();
      this.name = ref(resetName);
      this.date = ref(resetDate);
      this.cost = ref(resetCost);
      this.type = ref(resetType);
    },
  },
};
</script>

<style></style>
