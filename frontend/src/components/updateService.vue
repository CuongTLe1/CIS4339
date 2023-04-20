<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  props: ['id'],
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      service: {
        name: '',
        status: ''
      }
    }
  },
  created(){
    axios.get(`${apiURL}/services/id/${this.$route.params.id}`).then((res) => {
      this.service = res.data
    })
  },
  methods: {
    //function to edit service
    // navigate to "find services page" after updating a service
    async updateService() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        axios
          .put(`${apiURL}/services/update/${this.id}`, this.service)
          .then(() => {
            alert('Update has been saved.')
            this.$router.back()
          })
      }
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      service: {
        name: { required },
        status: { required }
      }
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
        Update Service 
        </h1>
      <div class="px-10 py-20">
        <!--calls the editservice function on submitting form-->
      <form @submit.prevent="editService">
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
                v-model="service.name"
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
              <input type="radio" name="status" v-model="service.status" value="Active" >Active
              <input type="radio" name="status" v-model="service.status" value="Not Active" >Not Active
              </label>
            </div>
        </div>

        <div class="flex justify-between mt-10 mr-20">
          <button
              @click="updateService"
              type="submit"
              class="bg-green-700 text-white rounded"
            >
            Update Service
          </button>
        </div>
      </form>
    </div>
    
    </div>
  </main>
  </template>