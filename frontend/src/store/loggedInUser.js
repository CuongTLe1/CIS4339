import { defineStore } from 'pinia'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

//defining a store
export const useLoggedInUserStore = defineStore({
  // id 
  id: 'loggedInUser',
  //central part of the store
  state: () => {
    return {
      role: '', //Viewer or Editor
      isLoggedIn: false,
    }
  },

  //action to login the user
  actions: {
    async login(username, password) {
       try {
        await axios.post(`${apiURL}/users/login`, {
          username: username,
          password: password
        })
        .then(response => {
          //if response is "Success" then username and password is valid
          if (response.data.message === 'Success') {
            alert('Login Success');
            this.$patch({
              isLoggedIn: true,
              role: response.data.role 
            })
            // route to the home page/dashboard
            this.$router.push('/');
          } else {
            // Login failed, show error message
            alert('Invalid Credentials');
          }
        })
      } catch(error) {
        console.log(error)
      }
    },
    logout() {
      this.$patch({
        role:'',
        isLoggedIn: false
      });

      
    }
  }
});

