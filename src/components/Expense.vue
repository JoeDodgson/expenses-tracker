<template>
  <div
    class="row justify-center q-py-sm animate__pulse"
    @click="editExpenseDialog = true"
  >
    <div class="mw-1000 col-grow">
      <q-card class="my-card bg-grey-1 expense-card">
        <q-card-section class="justify-between">
          <div class="row">
            <div class="col-6 col-md-8 text-left">
              <div class="text-h5">{{ name }}</div>
              <div class="text-subtitle2">{{ date }}</div>
            </div>
            <div
              :class="[
                type === 'income' ? 'text-positive' : 'text-negative',
                'text-h6',
                'col-md-3',
                'col-6',
                'text-right',
              ]"
            >
              {{ type === "income" ? "+" : "-" }}
              {{ formattedCost }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-dialog v-model="editExpenseDialog">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Edit expense</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <SaveExpense
          @edit-expense="$emit('edit-expense', $event)"
          @delete-expense="$emit('delete-expense', $event)"
          saveType="edit"
          :existingId="id"
          :existingName="name"
          :existingDate="date"
          :existingCost="cost"
          :existingType="type"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import SaveExpense from "@/components/SaveExpense.vue";

export default {
  name: "Expense",
  props: {
    id: Number,
    name: String,
    date: String,
    cost: Number,
    type: String,
    formattedCost: String,
  },
  components: {
    SaveExpense,
  },
  emits: ["create-expense", "edit-expense", "delete-expense"],
  setup() {
    return {
      editExpenseDialog: ref(false),
    };
  },
};
</script>

<style></style>
