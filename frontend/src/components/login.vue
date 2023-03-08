

<template>
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
    >Login Page
    </h1>
  <div class="row justify-content-center">
      <div class="col-md-4">
        <form @submit.prevent="store.login(username, password)" novalidate="true">
          <div class="px-20 py-5">
            <label>User name:</label>
            <input type="text" class="form-control" v-model="username" placeholder="username" required>
          </div>
          <div class="px-20 py-5">
            <label>Password:</label>
            <input type="password" class="form-control" v-model="password" placeholder="password" required>
          </div>
      <div class="px-20 py-10">
      <button class="bg-red-700 text-white rounded" type="submit">
          submit
        </button>
      </div>
    </form>
    </div>
  </div>  
  </template>
  
  
  
  <script>
  import { useLoggedInUserStore } from "@/store/loggedInUser";
  
  export default {
    data: () => {
      return {
        username: "",
        password: "",
      };
    },
    setup() {
      const store = useLoggedInUserStore()
      return {
        // you can return the whole store instance to use it in the template
        store,
      }
    }
  };
  </script>