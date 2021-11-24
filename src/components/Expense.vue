<template>
  <div class="row">
    <div class="col-grow">
      <q-card class="my-card">
        <q-card-section class="justify-between">
          <div class="row">
            <div class="col-1 text-left">
              <q-btn flat @click="$emit('delete-expense', expense.id)">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </q-btn>
            </div>
            <div class="col-8 text-left">
              <div class="text-h5">{{ expense.name }}</div>
              <div class="text-subtitle2">{{ expense.date }}</div>
            </div>
            <div
              :class="[
                expense.type === 'income' ? 'text-positive' : 'text-negative',
                'text-h6',
                'col-3',
                'text-right',
              ]"
            >
              {{ expense.type === "income" ? "+" : "-" }}
              {{ expense.formattedCost }}
            </div>
          </div>
        </q-card-section>
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
