<template>
  <div class="home">
    <div class="q-pa-md q-gutter-sm">
      <q-btn
        label="Add expense"
        color="primary"
        @click="newExpenseDialog = true"
      />

      <q-dialog v-model="newExpenseDialog">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">New expense</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <SaveExpense @add-expense="$emit('add-expense', $event)" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <h3>Balance: {{ balance }}</h3>
    </div>
    <ExpensesContainer
      :expenses="expenses"
      @delete-expense="$emit('delete-expense', $event)"
    />
  </div>
</template>

<script>
import SaveExpense from "@/components/SaveExpense.vue";
import ExpensesContainer from "@/components/ExpensesContainer.vue";
import { ref } from "vue";

export default {
  name: "Home",
  components: {
    SaveExpense,
    ExpensesContainer,
  },
  props: {
    expenses: Array,
    balance: String,
  },
  emits: ["add-expense", "delete-expense"],
  setup() {
    return {
      newExpenseDialog: ref(false),
    };
  },
};
</script>
