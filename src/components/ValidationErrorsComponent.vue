<template>
  <div v-if="showErrors" class="alert bg-danger px-4 py-2 mb-4">
    <ul class="list-unstyled mb-0">
      <li v-for="(error, index) in errorMessages" :key="index">
        <small class="text-white">{{ error }}</small>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ValidationErrorInterface } from "../interfaces/validation-error.interface";
import { computed } from "vue";

interface Props {
  errors: ValidationErrorInterface;
}

const props = defineProps<Props>();

const showErrors = computed(() => Object.keys(props.errors).length > 0);

const errorMessages = computed(() => {
  let errorValues: string[] = [];
  for (const errorKey in props.errors) {
    errorValues = errorValues.concat(props.errors[errorKey]);
  }
  return errorValues;
});
</script>
