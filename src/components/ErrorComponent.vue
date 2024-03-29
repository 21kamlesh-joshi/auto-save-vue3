<script lang="ts" setup>
import { AbstractControl, FormControl } from "universal-reactive-forms";
import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { ErrorKeys } from "../utils/validations";
import { Subscription } from "rxjs";
import { ValidationErrorInterface } from "../interfaces/validation-error.interface";

export interface ErrorComponentProps {
  formControl: FormControl | AbstractControl;
}

const props = defineProps<ErrorComponentProps>();
const isTouched = ref(false);
const isValid = ref(true);
const controlErrors = ref<ValidationErrorInterface>({});

const instance = getCurrentInstance();

let formControlUpdateSubscription: Subscription | null = null;

onMounted(() => {
  formControlUpdateSubscription = (
    props.formControl as FormControl
  ).valueChanges.subscribe(() => {
    isTouched.value = props.formControl.touched;
    isValid.value = props.formControl.valid;
    instance?.proxy?.$forceUpdate();
    controlErrors.value = JSON.parse(
      JSON.stringify(props.formControl.errors)
    ) as any;
  }) as any;
});

onBeforeUnmount(() => formControlUpdateSubscription?.unsubscribe());

const hasErrors = computed<boolean>(() => isTouched.value && !isValid.value);

const errors = computed<string[]>(() => {
  const errorValues: string[] = [];
  for (const key of Object.keys(controlErrors.value) as ErrorKeys[]) {
    switch (key) {
      case ErrorKeys.Email:
        errorValues.push("The email is invalid.");
        break;
      case ErrorKeys.Required:
        errorValues.push("This field is required.");
        break;
      case ErrorKeys.Password:
        errorValues.push("The password does not match the requirements.");
        break;
      case ErrorKeys.Min:
        errorValues.push(
          `This field must have min value of ${
            props.formControl.errors[ErrorKeys.Min]
          }`
        );
        break;
      case ErrorKeys.Max:
        errorValues.push(
          `This field must have max value of ${
            props.formControl.errors[ErrorKeys.Max]
          }`
        );
        break;
      case ErrorKeys.MinLength:
        errorValues.push(
          `The field must have a min length of ${
            props.formControl.errors[ErrorKeys.MinLength]
          }`
        );
        break;
      case ErrorKeys.MaxLength:
        errorValues.push(
          `The field must have a max length of ${
            props.formControl.errors[ErrorKeys.MaxLength]
          }`
        );
        break;
      case ErrorKeys.Url:
        errorValues.push("This filed must have a valid url.");
        break;
      case ErrorKeys.MinAge:
        errorValues.push(
          `Date of birth must be at least ${
            props.formControl.errors[ErrorKeys.MinAge]
          } years.`
        );
        break;
      case ErrorKeys.MatchConfirmPassword:
        errorValues.push("The password doesn't match.");
        break;
      case ErrorKeys.WhiteSpace:
        errorValues.push("The white space is not allowed.");
        break;
      default:
        errorValues.push("This field is invalid.");
    }
  }
  return errorValues;
});
</script>

<template>
  <slot></slot>
  <div class="invalid-feedback d-block" v-if="hasErrors">
    <ul class="list-unstyled mb-0">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>
</template>
