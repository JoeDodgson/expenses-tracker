<template>
  <div class="home">
    <div class="row">
      <h1 class="col text-h2 text-center">{{ balance }}</h1>
    </div>
    <div class="row text-center reverse-wrap items-center">
      <div class="col-12 col-sm-9">
        <h4 class="text-h4 q-ma-sm">My Expenses</h4>
      </div>
      <div class="col-12 col-sm-3">
        <q-btn
          label="Add expense"
          color="primary"
          @click="createExpenseDialog = true"
        />

        <q-dialog v-model="createExpenseDialog">
          <q-card>
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">New expense</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section class="q-pt-none">
              <SaveExpense
                saveType="create"
                @create-expense="$emit('create-expense', $event)"
              />
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
    <ExpensesContainer
      :expenses="expenses"
      @delete-expense="$emit('delete-expense', $event)"
      @edit-expense="$emit('edit-expense', $event)"
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
  emits: ["create-expense", "edit-expense", "delete-expense"],
  setup() {
    return {
      createExpenseDialog: ref(false),
    };
  },
};
</script>
