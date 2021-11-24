<template>
  <div class="row">
    <div class="col-grow">
      <q-card class="my-card">
        <q-card-section
          :class="[expense.type === 'income' ? 'bg-green' : 'bg-red', 'text-white']"
        >
          <div class="text-h6">
            {{ expense.type === "income" ? "+" : "-" }} {{ expense.formattedCost }}
          </div>
          <div class="text-subtitle2">{{ expense.name }}</div>
          <div class="text-subtitle2">{{ expense.date }}</div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat @click="$emit('delete-expense', expense.id)"> Delete </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Expense",
  props: {
    expense: Object,
  },
  emits: ["delete-expense"],
};
</script>

<style></style>
