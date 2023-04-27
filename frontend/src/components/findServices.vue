<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { useLoggedInUserStore } from "@/store/loggedInUser";

export default {
  setup(){
    const user = useLoggedInUserStore();

    return{
      user
    }
  },
  data() {
    return {
      services: [], //array to hold all arrays
      // Parameter for search to occur
      searchBy: '',
      name: '',
      status: ''
    } 
  },
  mounted() {
    this.getServices()
  },
  methods: {
    // different endpoints depending on the selected search by option by the user
    handleSubmitForm() {
      let endpoint = ''
      if (this.searchBy === 'Service Name') {
        endpoint = `services/search/?name=${this.name}&searchBy=name`
      } else if (this.searchBy === 'Service Status') {
        endpoint = `services/search/?status=${this.status}&searchBy=status`
      }
      axios.get(`${apiURL}/${endpoint}`).then((res) => {
        this.services = res.data
      })
    },
    // get all services
    getServices() {
      axios.get(`${apiURL}/services`).then((res) => {
        this.services = res.data
      })
      window.scrollTo(0, 0)
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.name = ''
      this.status = ''

      this.getServices()
    },
    //route to the update service page with id parameter
    editService(serviceID) {
      this.$router.push({ name: 'updateservice', params: { id: serviceID } })
    }
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
            <option value="Service Status">Service Status</option>
          </select>
        </div>

        <!-- Displays Service Name search field -->
        <div class="flex flex-col" v-if="searchBy === 'Service Name'">
          <label class="block">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="name"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter service name"
            />  
          </label>
        </div>
        <!-- Displays status option box -->
        <div class="flex-col" v-if="searchBy === 'Service Status'">
          <!-- Users choose if Active or Not Active-->
          <input type="radio" name="status" v-model="status" value="Active" >Active
          <input type="radio" name="status" v-model="status" value="Not Active" >Not Active
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
              <th class="p-4 text-left">Service Name</th>
              <th class="p-4 text-left">Status</th>
            </tr>
          </thead>
          <!-- When user clicks on a row, navigate to the update service page
            to update the selected row item-->
          <tbody class="divide-y divide-gray-300">
            <!-- when row is clicked, checks if the current logged in user is an editor-->
            <!-- then call function (editService) and pass argument (id of service to be updated)-->
            <tr
            @click="user.role == 'Editor'? editService(service._id): null"
              v-for="service in services"
              :key="service._id"
            >
              <td class="p-2 text-left">{{ service.name }}</td>
              <td class="p-2 text-left">{{ service.status }}</td>
            </tr>
          </tbody>
        </table>
        <br>
      </div>
    </div>
  </main>
</template>

<!--reference: https://stackoverflow.com/questions/40901552/can-i-make-some-condition-inside-v-onclick-->