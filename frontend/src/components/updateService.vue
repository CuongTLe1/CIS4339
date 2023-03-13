<script>
import { ref } from 'vue'
import { useServiceStore } from "@/store/serviceCart"
import { useRouter} from "vue-router"

export default {
  props: ['id'],
  setup(props) {
    const router = useRouter();
    const cart = useServiceStore();
    const servicename = ref("");
    const status = ref("");

    // function to edit service
    function editService() {
      //call store action (updateitem) and pass arguments: updated service name and status
      // navigate to "find services page" after updating a service
      cart.updateitem(props.id, this.servicename, this.status); 
      servicename.value = "";
      status.value = "";
      router.push({ path: '/findservices' }); 
    }

    return {
      // call the store getters(getId) to get the current servicename and status to be updated
      // and to display them on the form
      servicename: cart.getId(props.id).servicename, 
      status: cart.getId(props.id).status,
      cart,
      editService
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
        Update Service
        </h1>
      <div class="px-10 py-20">
        <!--calls the editservice function on submitting form-->
      <form @submit.prevent="editService">
      <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <!-- form field -->   
          <h2 class="text-2xl font-bold">Service Details</h2>
            <div class="flex flex-col">
              <label class="block">
              <span class="text-gray-700">Service Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model= "servicename"
                required
              />
              </label>
            </div>
            <!--choose whether if its Active or Not Active-->
            <div >
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
          <button class="bg-green-700 text-white rounded" type="submit">
            Update Service
          </button>
        </div>
      </form>
    </div>
    
    </div>
  </main>
  </template>