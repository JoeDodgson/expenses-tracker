<template>
  <div class="items-start">
    <Expense
      :key="expense.id"
      v-for="expense in expenses"
      :id="expense.id"
      :name="expense.name"
      :date="expense.date"
      :cost="expense.cost"
      :formattedCost="expense.formattedCost"
      :type="expense.type"
      @create-expense="$emit('create-expense', $event)"
      @update-expense="$emit('update-expense', $event)"
      @delete-expense="$emit('delete-expense', $event)"
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
  emits: ["create-expense", "update-expense", "delete-expense"],
};
</script>

<style></style>
