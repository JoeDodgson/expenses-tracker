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
        prefix="Min cost: £"
        v-model.number="searchMinCost"
        type="number"
        step=".01"
        id="searchMinCost"
        name="searchMinCost"
        ref="costMinRef"
        :rules="[(val) => validCost(val) || 'Positive 2.d.p number required']"
        @keydown="(event) => costKeyDownHandler(event, searchMinCost)"
        @update:model-value="(val) => filterCost(val, 'min')"
      >
      </q-input>
      <q-input
        standout="bg-secondary"
        input-class="text-primary text-weight-bold"
        prefix-class="text-primary"
        prefix="Max cost: £"
        v-model.number="searchMaxCost"
        type="number"
        step=".01"
        id="searchMaxCost"
        name="searchMaxCost"
        ref="costMaxRef"
        :rules="[(val) => validCost(val) || 'Positive 2.d.p number required']"
        @keydown="(event) => costKeyDownHandler(event, searchMaxCost)"
        @update:model-value="(val) => filterCost(val, 'max')"
      >
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
          @update:model-value="(val) => filterType(val)"
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
            @update:model-value="(val) => sortExpenses(val)"
          />
        </div>
      </div>
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
    filterDate(event, dateType) {
      // Parse date into MM/DD/YYYY format
      const dateSplit = event.split("/");
      const datePreParse = `${dateSplit[1]}/${dateSplit[0]}/${dateSplit[2]}`;
      const parsedDate = Date.parse(datePreParse);
      // If date was parsed into a number (i.e. valid date) then emit search-start-date / search-end-date
      if (!isNaN(parsedDate)) {
        this.$emit(`search-${dateType}-date`, parsedDate);
      }
    },
    filterCost(cost, costType) {
      // If valid cost was entered (> 0) then emit search-min-cost / search-max-cost
      if (cost > 0) {
        this.$emit(`search-${costType}-cost`, cost);
      }
    },
    filterType(type) {
      this.$emit(`search-type`, type);
    },
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
    costKeyDownHandler(event, cost) {
      // Prevent user from incrementing cost to 0
      if (cost <= 0.01 && event.key === "ArrowDown") {
        event.preventDefault();
      }
      // Prevent user from entering negative cost
      if (event.key === "-") {
        event.preventDefault();
      }
    },
    sortExpenses(event) {
      const sortType = event.value;
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

    const searchMinCost = ref(0.01);
    const searchMinCostRef = ref(null);

    const searchMaxCost = ref(0.01);
    const searchMaxCostRef = ref(null);

    const searchType = ref(null);
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
      searchMinCost,
      searchMinCostRef,
      searchMaxCost,
      searchMaxCostRef,
      searchType,
      searchTypeRef,
      searchTypeOptions: [
        {
          label: "Income",
          value: "income",
        },
        {
          label: "Expenditure",
          value: "expenditure",
        },
        {
          label: "Both",
          value: null,
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
    };
  },
};
</script>

<style></style>
