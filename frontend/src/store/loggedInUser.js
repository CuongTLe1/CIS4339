import { defineStore } from 'pinia'

//defining a store
export const useLoggedInUserStore = defineStore({
  // id 
  id: 'loggedInUser',
  //central part of the store
  state: () => {
    return {
      role: '',
      isLoggedIn: false,
      name:''
    }
  },

  actions: {
    async login(username, password) {
      try {
        const response = await apiLogin(username, password);
        this.$patch({
          
          isLoggedIn: response.isAllowed,
          role: response.role,
          name: response.name,
          
        })
        this.$router.push('/');
      } catch(error) {
        console.log(error)
      }
    },
    logout() {
      this.patch({
        name: '',
        isLoggedIn: false
      });

      
    }
  }
});

//simulate a login
function apiLogin(u, p) {
  if (u === "ab" && p === "ab") return Promise.resolve({ isAllowed: true, role:"Viewer", name: "John Doe" });
  if (u === "cb" && p === "cb") return Promise.resolve({ isAllowed: true, role:"Editor", name: "John Doe" });
  if (p === "ab") return Promise.resolve({ isAllowed: false });
  return Promise.reject(new Error("invalid credentials"));
}

