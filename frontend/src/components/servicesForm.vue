<script>
import { ref } from 'vue'
import { useServiceStore } from "@/store/serviceCart";
import { useRouter} from "vue-router"

export default {
  // composition api
  setup() {
    const router = useRouter();
    const cart = useServiceStore();
    const servicename = ref("");

    // function for adding a service
    // navigates to the find services page after submitting form
    function addServiceToCart() {
      // call store action (addItem) passing arguments(new service and its status)
      cart.addItem(this.servicename, this.status); 
      this.servicename = "";
      this.status = "";
      router.push({ path: '/findservices' });
    }

    return {
      servicename,
      status: 'Active', //default value for status
      cart,
      addServiceToCart,
    };
    
  }
};
</script>
<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Create New Service
        </h1>
      <div class="px-10 py-20">
      <form @submit.prevent="addServiceToCart">
      <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <!-- form field -->
          <!--Requires service name and status using the required attribute-->
          <h2 class="text-2xl font-bold">Service Details</h2>
            <div class="flex flex-col">
              <label class="block">
              <span class="text-gray-700">Service Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="servicename"
                required
              />
              </label>
            </div>
            <!--radio button whether new service is active or not active-->
            <div>
              <label class="block">
              <span class="text-gray-700">Status</span>
              <span style="color: #ff0000">*</span>
              <br>
              <input type="radio" name="status" v-model="status" value="Active" >Active
              <input type="radio" name="status" v-model="status" value="Not Active" >Not Active
              </label>
            </div>
        </div>

        <div class="flex justify-between mt-10 mr-20">
          <button class="bg-red-700 text-white rounded" type="submit">
            Add New Service
          </button>
        </div>
      </form>
    </div>
    
    </div>
  </main>
  </template>