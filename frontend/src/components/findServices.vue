<script>
import { ref } from 'vue'
import { useServiceStore } from "@/store/serviceCart";

export default {
  data(){
    return{
    searchBy: '',
    searchstatus: '',
    searchname: '',
    queryData: []
    } 
  },
  setup() {
    const cart = useServiceStore();
    const servicename = ref("");
    const status = ref("");

    return {
      servicename,
      status,
      cart
    };
  },
  methods: {
    // route to the update service page with id parameter
    editService(serviceID) {
      this.$router.push({ name: 'updateservice', params: { id: serviceID } })
    },
    getServices(){
      this.queryData = this.cart.getAll
    },
    handleSubmitForm() {
      if (this.searchBy === 'Status') {
        this.queryData = this.cart.searchByStatus(this.searchstatus) 
      }else if (this.searchBy === 'Service Name') {
        this.queryData = this.cart.searchByName(this.searchname) 
      }
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.servicename = ''
      this.status = ''

      this.getServices()
    },
  },
  mounted(){
    this.getServices()
  }
}
</script>
<template>
  <main>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Find Services 
      </h1>
    </div>
    <div class="px-10 pt-20">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <h2 class="text-2xl font-bold">Search Service By</h2>
        <div class="flex flex-col">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchBy"
          >
            <option value="Service Name">Service Name</option>
            <option value="Status">Status</option>
          </select>
        </div>

        <!-- Displays Service Name search field -->
        <div class="flex flex-col" v-if="searchBy === 'Service Name'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="searchname"
              placeholder="Enter Service Name"
              v-on:keyup.enter="handleSubmitForm"
            />
          </label>
        </div>
        <!-- Displays status option box-->
        <div class="flex flex-col" v-if="searchBy === 'Status'">
          <select
            class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="searchstatus"
            placeholder="Choose Service Status"
            v-on:keyup.enter="handleSubmitForm"
          >
          <!-- Users choose if Active or Not Active-->
            <option value="" disabled selected>Choose one   </option>
            <option value="Active">Active</option>
            <option value="Not Active">Not Active</option>
          </select>
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div></div>
        <div></div>
        <div class="mt-5 grid-cols-2">
          <button
            class="mr-10 border border-red-700 bg-white text-red-700 rounded"
            @click="clearSearch"
            type="submit"
          >
            Clear Search
          </button>
          <button
            class="bg-red-700 text-white rounded"
            @click="handleSubmitForm"
            type="submit"
          >
            Search Service
          </button>
        </div>
      </div>

    </div>
    
    <hr class="mt-10 mb-10" />
    <!-- Display All Services Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
    >
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Services</h2>
        <h3 class="italic">Click table row to edit/display an entry</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Service</th>
              <th class="p-4 text-left">Status</th>
            </tr>
          </thead>
          <!-- When user clicks on a row, navigate to the update service-->
          <tbody class="divide-y divide-gray-300">
            <!--when row is click, call function and pass argument-->
            <tr     
            @click="editService(item.id)"       
            v-for="item in queryData">
              <td class="p-2 text-left">
                {{ item.servicename }} 
              </td>
              <td class="p-2 text-left">
                {{ item.status }}
              </td>
            </tr>
          </tbody>
        </table>
        <br>
      </div>
    </div>
  </main>
</template>
