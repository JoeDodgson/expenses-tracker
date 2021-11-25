<template>
  <div class="items-start">
    <Expense
      :key="expense.id"
      v-for="expense in expenses"
      :id="expense.id"
      :name="expense.name"
      :date="expense.date"
      :type="expense.type"
      :formattedCost="expense.formattedCost"
      @create-expense="$emit('create-expense', $event)"
      @edit-expense="$emit('edit-expense', $event)"
    />
    <q-dialog v-model="newExpenseDialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">New expense</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <SaveExpense @create-expense="$emit('create-expense', $event)" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Expense from "@/components/Expense.vue";
export default {
  name: "ExpensesContainer",
  components: {
    Expense,
  },
  props: {
    expenses: Array,
  },
  emits: ["create-expense", "edit-expense"],
};
</script>

<style></style>
