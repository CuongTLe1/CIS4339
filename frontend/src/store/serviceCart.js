import { defineStore } from "pinia";

//defining a store
export const useServiceStore = defineStore({
  id: "cart",
  state: () => ({
    //holds all the services
    //added sample data
    services: [
      {
        servicename: "Family Support",
        status: "Active",
        id:  Math.random() * 100
      }, 
      {
        servicename: "Adult Education",
        status: "Active",
        id:  Math.random() * 100
      }, 
      {
        servicename: "Youth Services Program",
        status: "Not Active",
        id:  Math.random() * 100
      }, 
      {
        servicename: "Early Childhood Education",
        status: "Active",
        id:  Math.random() * 100
      }, 
    ]
  }),
  getters: {
    //gets all the services in state
    getAll(state) {
      return state.services;
    },

    //filters any services that has an Active Status
    filterActive: (state) =>
    {
      return state.services.filter((service) =>
      {
        return service.status === "Active";
      });
    },

    //search the store by status
    searchByStatus: (state) => (status) => {
      return state.services.filter(service => service.status == status)
    },

    //search the store by service name
    searchByName: (state) => (name) => {
      return state.services.filter(service => service.servicename.toLocaleUpperCase().search(name.toUpperCase()) >= 0)
    },

    //gets the id of the service for updating
    getId: (state) => (id) => {
      return state.services.find(thing => thing.id == id)
    }
  },

  actions: {
    // adds a new service
    addItem(name, status) {
      this.services.push({servicename: name, status: status, id: Math.random() * 100});
    },

    //updates the service by id
    updateitem(id, name, status) {
      this.services = this.services.map(item => {
        if (item.id == id) {
          return {
            ...item,
            servicename: name,
            status: status
          };
        } else {
          return item;
        }
      });
    }
  }
});

//references:
//https://stackoverflow.com/questions/41503527/vuexjs-getter-with-argument
//https://pinia.vuejs.org/core-concepts/getters.html
//https://www.youtube.com/watch?v=1LEHy6HY91M&ab_channel=CodeWithTony
//https://www.youtube.com/watch?v=sKGh2wp4QfM&t=692s&ab_channel=AaronSaunders