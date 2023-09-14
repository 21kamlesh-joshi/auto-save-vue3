import { createRouter, createWebHistory } from 'vue-router';
import UserForm from "../components/UserForm.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "userForm",
      component: UserForm,
    },
  ]
})

export default router
