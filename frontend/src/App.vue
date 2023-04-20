<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<script>
import axios from 'axios'
import { useLoggedInUserStore } from "@/store/loggedInUser";
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  name: 'App',
  setup() {
    const user = useLoggedInUserStore();
    return { user };
  },
  data() {
    return {
      orgName: 'Dataplatform'
    }
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.orgName = res.data.name
    })
  }
}
</script>
<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <!--If the user is already logged in, dont show the login nav link-->
            <li v-if="!user.isLoggedIn">
              <router-link  class="nav-link" to="/Login">
                <span 
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >login</span
                >
                Login
              </router-link>
            </li>
            <li>
              <router-link to="/">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >dashboard</span
                >
                Dashboard
              </router-link>
            </li>
            <!--certain links are displayed only when the role of the logged in user is an Editor -->
            <li v-if="user.isLoggedIn && user.role=='Editor'">
              <router-link   to="/intakeform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >people</span
                >
                Client Intake Form
              </router-link>
            </li>
            <li v-if="user.isLoggedIn && user.role=='Editor'">
              <router-link  to="/eventform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >event</span
                >
                Create Event
              </router-link>
            </li>
            <li v-if="user.isLoggedIn && user.role=='Editor'">
              <router-link to="/servicesform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >local_activity</span
                >
                Add Service
              </router-link>
            </li>
            <!--Certain links are displayed only if the user logged in is a viewer or editor-->
            <li v-if="user.isLoggedIn">
              <router-link  to="/findclient">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Client
              </router-link>
            </li>
            <li v-if="user.isLoggedIn">
              <router-link   to="/findevents">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Event
              </router-link>
            </li>
            <li v-if="user.isLoggedIn">
              <router-link  to="/findServices">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Service
              </router-link>
            </li>
            <!--logs out the user by calling store action (logout) and routes to the home page-->
            <li v-if="user.isLoggedIn"> 
              <router-link  to="/" @click="user.logout()">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >login</span
                >
                Logout
              </router-link>
              </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)"
      >
        <h1 class="mr-20 text-3xl text-white">{{ this.orgName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<style>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>
