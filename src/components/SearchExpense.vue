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
        v-model="searchName"
        label-slot
        ref="searchNameRef"
        id="searchName"
        name="searchName"
        @keyup="filterName"
      >
        <template v-slot:label>
          <span class="text-primary">Expense name</span>
        </template>
      </q-input>
      <q-input
        standout="bg-secondary"
        input-class="text-primary text-weight-bold"
        prefix="Start date:"
        filled
        v-model="searchStartDate"
        ref="searchStartDateRef"
        :rules="[
          (val) => validDate(val) || 'Date is required in format DD/MM/YYYY',
        ]"
        @update:model-value="(val) => filterDate(val, 'start')"
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
                v-model="searchStartDate"
                mask="DD/MM/YYYY"
                @update:model-value="(val) => filterDate(val, 'start')"
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
        prefix="End date:"
        filled
        v-model="searchEndDate"
        ref="searchEndDateRef"
        :rules="[
          (val) => validDate(val) || 'Date is required in format DD/MM/YYYY',
        ]"
        @update:model-value="(val) => filterDate(val, 'end')"
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
                v-model="searchEndDate"
                mask="DD/MM/YYYY"
                @update:model-value="(val) => filterDate(val, 'end')"
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
        v-model.number="searchCost"
        type="number"
        step=".01"
        label-slot
        id="searchCost"
        name="searchCost"
        ref="costRef"
        :rules="[(val) => validCost(val) || 'Positive 2.d.p number required']"
        @keydown="costKeyDownHandler"
      >
        <template v-slot:label>
          <span class="text-primary">Cost</span>
        </template>
      </q-input>
      <div class="bg-grey-2 q-pa-sm rounded-borders">
        Expense type:
        <q-option-group
          ref="searchTypeRef"
          name="searchType"
          v-model="searchType"
          :options="searchTypeOptions"
          color="primary"
          inline
        />
      </div>
      <div class="q-pa-md" style="max-width: 300px">
        <div class="q-gutter-md">
          <q-select
            ref="sortByRef"
            name="sortBy"
            v-model="sortBy"
            :options="sortByOptions"
            label="Sort by"
            color="primary"
            @input="
              (val) => {
                sortExpenses(val);
              }
            "
          />
        </div>
      </div>
      <!-- <form id="expenses-form" action="./expense-processing">

    <br />
    <br />
    <label for="startDate">Start date</label>
    <input type="date" id="" name="" value="" @change="searchStartDate" />
    <br />
    <label for="endDate">End date</label>
    <input type="date" id="" name="" value="" @change="searchEndDate" />
    <br />
    <br />
    <label for="minCost">Minimum cost</label>
    <input type="text" id="" name="" value="" @keyup="searchMinCost" />
    <br />
    <label for="maxCost">Maximum cost</label>
    <input type="text" id="" name="" value="" @keyup="searchMaxCost" />
    <br />
    <br />
    <input
      type="radio"
      id="income"
      name="etype"
      value="income"
      @change="searchType"
    />
    <label for="income">Income</label><br />
    <input
      type="radio"
      id="expense"
      name="etype"
      value="expenditure"
      @change="searchType"
    />
    <label for="expense">Expenditure</label><br />
    <input
      type="radio"
      id="expense"
      name="etype"
      value=""
      @change="searchType"
    />
    <label for="both">Both</label><br />
    <br />
  </form> -->
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "SaveExpense",
  emits: [
    "search-name",
    "search-type",
    "search-start-date",
    "search-end-date",
    "search-min-cost",
    "search-max-cost",
    "sort-expenses",
  ],
  methods: {
    filterName(event) {
      const text = event.target.value;
      this.$emit("search-name", text);
    },
    // searchType(event) {
    //   const type = event.target.value;
    //   this.$emit("search-type", type);
    // },
    filterDate(event, dateType) {
      // Parse date into MM/DD/YYYY format
      const dateSplit = event.split("/");
      const datePreParse = `${dateSplit[1]}/${dateSplit[0]}/${dateSplit[2]}`
      const parsedDate = Date.parse(datePreParse);
      // If date was parsed into a number (i.e. valid date) then emit search-start-date / search-end-date
      if (!isNaN(parsedDate)) {
        this.$emit(`search-${dateType}-date`, parsedDate);
      }
    },
    // searchEndDate(event) {
    //   const endDate = Date.parse(event.target.value);
    //   this.$emit("search-end-date", endDate);
    // },
    // searchMinCost(event) {
    //   const minCost = event.target.value;
    //   this.$emit("search-min-cost", minCost);
    // },
    // searchMaxCost(event) {
    //   const maxCost = event.target.value;
    //   this.$emit("search-max-cost", maxCost);
    // },
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
    sortExpenses(event) {
      const sortType = event.target.value;
      this.$emit("sort-expenses", sortType);
    },
  },
  setup() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}/${mm}/${yyyy}`;

    const searchName = ref("");
    const searchNameRef = ref(null);

    const searchStartDate = ref(formattedDate);
    const searchStartDateRef = ref(null);

    const searchEndDate = ref(formattedDate);
    const searchEndDateRef = ref(null);

    const searchCost = ref(0.01);
    const searchCostRef = ref(null);

    const searchType = ref("expense");
    const searchTypeRef = ref(null);

    const sortBy = ref("Date: Newest to Oldest");
    const sortByRef = ref(null);

    return {
      searchName,
      searchNameRef,
      searchStartDate,
      searchStartDateRef,
      searchEndDate,
      searchEndDateRef,
      searchCost,
      searchCostRef,
      searchType,
      searchTypeRef,
      searchTypeOptions: [
        {
          label: "Income",
          value: "income",
        },
        {
          label: "Expense",
          value: "expense",
        },
        {
          label: "Both",
          value: "both",
        },
      ],
      sortBy,
      sortByRef,
      sortByOptions: [
        {
          label: "Date: Newest to Oldest",
          value: "date-n-o",
        },
        {
          label: "Date: Oldest to Newest",
          value: "date-o-n",
        },
        {
          label: "Name: A to Z",
          value: "name-a-z",
        },
        {
          label: "Name: Z to A",
          value: "name-z-a",
        },
        {
          label: "Value: Low to High",
          value: "value-l-h",
        },
        {
          label: "Value: High to Low",
          value: "value-h-l",
        },
      ],
      // onSubmit(event) {
      //   event.preventDefault();
      //   nameRef.value.validate();
      //   dateRef.value.validate();
      //   costRef.value.validate();

      //   // TODO - notify user that their expense has or has not been saved
      //   if (
      //     !nameRef.value.hasError &&
      //     !dateRef.value.hasError &&
      //     !costRef.value.hasError
      //   ) {
      //     // Round cost to 2.d.p and format to £'s
      //     // TODO - add functionality to change currency
      //     const newCost = Math.round(cost.value * 100) / 100;
      //     const newFormattedCost = formatCurrency(newCost, "en-GB", "GBP");

      //     // TODO - increment expense id's
      //     const newExpense = {
      //       id: Math.floor(Math.random() * 100000),
      //       name: name.value,
      //       date: date.value,
      //       cost: newCost,
      //       formattedCost: newFormattedCost,
      //       type: type.value,
      //     };
      //     emit("add-expense", newExpense);

      //     this.onReset();
      //   }
      // },
    };
  },
};
</script>

<style></style>
