<template>
  <div class="home">
    <div class="row">
      <h1 class="col text-h2 text-center">
        {{ balance }}
        <q-tooltip anchor="top middle" self="bottom middle" class="text-body2">
          Balance is calculated as the sum of income minus the sum of
          expenditure
        </q-tooltip>
      </h1>
    </div>
    <div class="row justify-center">
      <div class="mw-1000 col-grow text-center reverse-wrap items-center">
        <div class="row">
          <div class="col-12 col-sm-9">
            <h4 class="text-h4 q-ma-sm">My Expenses</h4>
          </div>
          <div class="col-12 col-sm-3 q-my-auto">
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
      </div>
    </div>
    <ExpensesContainer
      :expenses="expenses"
      @delete-expense="$emit('delete-expense', $event)"
      @update-expense="$emit('update-expense', $event)"
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
  emits: ["create-expense", "update-expense", "delete-expense"],
  setup() {
    return {
      createExpenseDialog: ref(false),
    };
  },
};
</script>
