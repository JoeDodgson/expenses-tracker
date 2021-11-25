<template>
  <div class="row q-py-sm" @click="editExpenseDialog = true">
    <div class="col-grow">
      <q-card class="my-card bg-grey-1">
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
            <div class="col-6 col-md-1 text-left">
              <q-btn flat @click="$emit('delete-expense', id)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </q-btn>
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
          @create-expense="$emit('create-expense', $event)"
          @edit-expense="$emit('edit-expense', $event)"
          saveType="edit"
          :id="id"
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
    type: String,
    formattedCost: String,
  },
  components: {
    SaveExpense,
  },
  emits: ["create-expense", "edit-expense"],
  setup() {
    return {
      editExpenseDialog: ref(false),
    };
  },
};
</script>

<style></style>
