<template>
  <section class="min-vh-100 h-custom bg-light">
    <div class="container py-5">
      <div class="row justify-content-center align-items-center">
        <div class="col d-flex justify-content-center align-items-center">
          <div class="card shadow rounded-5 border-0 w-100">
            <div class="card-body p-5">
              <h2 class="mb-3 fw-bold border-bottom border-3 pb-3 fs-1">User Details</h2>
              <div class="mb-3">
                <h4>Progress Bar</h4>
                <div class="progress rounded-pill">
                <div class="progress-bar" :style="{ width: formCompletionPercentage + '%' }">
                  {{ formCompletionPercentage }}%
                </div>
              </div>
              </div>
              <form @submit.prevent="addUserDetails">
                <!-- First Name Input -->
                <div class="mb-3">
                  <label for="firstName" class="form-label fw-bold">First name</label>
                  <ErrorComponent :form-control="userForm.get('first_name')">
                  <input v-model="userForm.get('first_name').value" placeholder="First Name"  @input="debouncedSave" type="text" class="form-control py-2 fs-5" id="firstName">
                  </ErrorComponent>
                </div>
                <!-- Last Name Input -->
                <div class="mb-3">
                  <label for="lastName" class="form-label fw-bold">Last name</label>
                  <ErrorComponent :form-control="userForm.get('last_name')">
                  <input v-model="userForm.get('last_name').value" @input="debouncedSave" type="text" placeholder="Last Name" class="form-control py-2 fs-5" id="lastName">
                  </ErrorComponent>
                </div>
                <!-- Email Input -->
                <div class="mb-3">
                  <label for="email" class="form-label fw-bold">Email</label>
                  <ErrorComponent :form-control="userForm.get('email')">
                  <input v-model="userForm.get('email').value" placeholder="Email" type="email" @input="debouncedSave" class="form-control py-2 fs-5" id="email">
                  </ErrorComponent>
                </div>
                <!-- Age Input -->
                <div class="mb-3">
                  <label for="age" class="form-label fw-bold">Age</label>
                  <ErrorComponent :form-control="userForm.get('age')">
                  <input v-model="userForm.get('age').value" placeholder="Age" type="number" @input="debouncedSave" step="1" class="form-control py-2 fs-5" id="age">
                  </ErrorComponent>
                </div>
                <!-- Password Input -->
                <div class="mb-3">
                  <label for="address" class="form-label fw-bold">Address</label>
                  <ErrorComponent :form-control="userForm.get('address')">
                  <input v-model="userForm.get('address').value" type="text" @input="debouncedSave" placeholder="Address" class="form-control py-2 fs-5" id="address">
                  </ErrorComponent>
                </div>
                  <button class="btn btn-primary rounded-pill w-100" type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { FormControl, FormGroup } from "universal-reactive-forms";
import { Required, Email} from "../utils/validations";
import ErrorComponent from "../components/ErrorComponent.vue";
import { UserService }  from '../services/user.service';
import { UserInterface } from '../interfaces/user.interface';

const userForm = new FormGroup({
  first_name: new FormControl("", [Required]),
  last_name: new FormControl("", [Required]),
  email: new FormControl("", [Required, Email]),
  age: new FormControl("", [Required]),
  address: new FormControl("", [Required]),
});

const userObject = new  UserService();

onMounted(() => {
  initUserDetails();
});

function initUserDetails() {
  userObject.getUserDetails().subscribe((details: UserInterface) => {
    userForm.get("first_name").value = details?.first_name;
    userForm.get("last_name").value = details?.last_name;
    userForm.get("email").value = details?.email;
    userForm.get("age").value = details?.age;
    userForm.get("address").value = details?.address;
    calculateFormCompletion();
  })  
}

function addUserDetails() {
  calculateFormCompletion();
  userObject.addUserDetails(userForm.getRawValue()).subscribe((data:any) => console.log("add", data));
}

// Debounce the auto-saving function
let timeoutId: number | null = null;
const debouncedSave = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    addUserDetails();
  }, 1000); // Adjust the debounce delay as needed
};

// Initialize the form completion percentage
const formCompletionPercentage = ref(0);

function calculateFormCompletion() {
  const fieldsCompleted = Object.values(userForm.getRawValue()).filter((value) => value !== '').length;
  const totalFields = Object.keys(userForm.getRawValue()).length;
  formCompletionPercentage.value =  (fieldsCompleted / totalFields) * 100;  
};

</script>

<style scoped>

.card{
  max-width: 550px;
}

.progress {
  height: 25px;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease-in-out;
}
</style>

<script setup lang="ts">
</script>
