<script>
import { ref } from 'vue'
import { useServiceStore } from "@/store/serviceCart";
import { useLoggedInUserStore } from "@/store/loggedInUser";

export default {
  data(){
    return{
    searchBy: '', //the search by field whether to search by name or status
    searchstatus: '', //field to search by status
    searchname: '', //field to search by name
    queryData: [] //query data for services
    } 
  },
  setup() {
    const cart = useServiceStore();
    const servicename = ref("");
    const status = ref("");
    const user = useLoggedInUserStore();

    return {
      servicename,
      status,
      cart,
      user
    };
  },
  methods: {
    // route to the update service page with id parameter
    editService(serviceID) {
      this.$router.push({ name: 'updateservice', params: { id: serviceID } })
    },
    // call store getter (getServies) to get all services
    getServices(){
      this.queryData = this.cart.getAll
    },
    // call different store actions depending on the selected search by option by the user
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
      this.searchname = ''
      this.searchstatus = ''

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
          <!-- When user clicks on a row, navigate to the update service page
            to update the selected row item-->
          <tbody class="divide-y divide-gray-300">
            <!-- when row is clicked, checks if the current logged in user is an editor-->
            <!-- then call function (editService) and pass argument (id of service to be updated)-->
            <tr     
            @click="user.role == 'Editor'? editService(item.id): null"       
            v-for="item in queryData">
              <!-- displays the queried data depending on the search of the user-->
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

<!--reference: https://stackoverflow.com/questions/40901552/can-i-make-some-condition-inside-v-onclick-->