<template>
  <div class="q-pa-md">
    <form
      class="q-gutter-md"
      items-start
      id="expenses-form"
      @submit.prevent.stop="onSubmit"
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
        ref="dateRef"
        :rules="[
          (val) => validDate(val) || 'Date is required in format DD/MM/YYYY',
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
        ref="costRef"
        :rules="[(val) => validCost(val) || 'Positive 2.d.p number required']"
        @keydown="costKeyDownHandler"
      >
        <template v-slot:label>
          <span class="text-primary">Cost</span>
        </template>
      </q-input>
      <div class="q-pa-md">
        <div class="q-gutter-sm">
          <q-radio
            ref="typeRef"
            v-model="type"
            val="income"
            label="Income"
            color="primary"
          />
          <q-radio
            ref="typeRef"
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
  emits: ["add-expense"],
  methods: {
    // Regex to validate a date in the format DD/MM/YYYY (includes days of month and leap years)
    validDate(str) {
      return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(
        str
      );
    },
    // Check if an input is a positive number with no more than 2.d.p
    validCost(num) {
      return (
        !isNaN(num) &&
        (Math.floor(num) === num || num.toString().split(".")[1].length <= 2) &&
        num > 0
      );
    },
    // Prevent user from entering negative number in cost input field
    costKeyDownHandler(event) {
      if (this.cost <= 0.01 && event.key === "ArrowDown") {
        event.preventDefault();
      }
      if (event.key === "-") {
        event.preventDefault();
      }
      if (this.cost < 0.01) {
        const { resetCost } = this.getResetInputs();
        this.cost = resetCost;
      }
    },
  },
  setup(_, { emit }) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}/${mm}/${yyyy}`;

    const name = ref("");
    const nameRef = ref(null);

    const date = ref(formattedDate);
    const dateRef = ref(null);

    const cost = ref(0.01);
    const costRef = ref(null);

    const type = ref("expense");
    const typeRef = ref(null);

    return {
      name,
      nameRef,
      date,
      dateRef,
      cost,
      costRef,
      type,
      typeRef,
      onSubmit(event) {
        event.preventDefault();
        nameRef.value.validate();
        dateRef.value.validate();
        costRef.value.validate();

        // TODO - notify user that their expense has or has not been saved
        if (!nameRef.value.hasError && !dateRef.value.hasError && !costRef.value.hasError) {
          // Round cost to 2.d.p and format to £'s
          // TODO - add functionality to change currency
          const newCost = Math.round(cost.value * 100) / 100;
          const newFormattedCost = formatCurrency(newCost, "en-GB", "GBP");

          // TODO - increment expense id's
          const newExpense = {
            id: Math.floor(Math.random() * 100000),
            name: name.value,
            date: date.value,
            cost: newCost,
            formattedCost: newFormattedCost,
            type: type.value,
          };
          emit("add-expense", newExpense);

          this.onReset();
        }
      },
      onReset() {
        name.value = "";
        date.value = formattedDate;
        cost.value = 0.01;
        type.value = "expense";

        nameRef.value.resetValidation();
        dateRef.value.resetValidation();
        costRef.value.resetValidation();
        typeRef.value.resetValidation();
      },
    };
  },
};
</script>

<style></style>
