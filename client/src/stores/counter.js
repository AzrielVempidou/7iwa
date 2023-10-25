import { defineStore } from 'pinia'
import axios from 'axios'

export const useCounterStore = defineStore('counter', {
  state: () => ({ 
    baseUrl: 'http://localhost:3000',
    categories: [],
    counselors: [],
    dataCounselor: {},
    dataCustomer: {}
  }),
  actions: {
    async handleLoginCust(formLogin){
      try {
        const { data } = await axios({
          url: `${this.baseUrl}/cust/login`,
          method: "POST",
          data: formLogin
        })
        console.log(data, "<< ini data");

        localStorage.setItem("id", data.id)
        localStorage.setItem("name", data.name)
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("email", data.email)
        localStorage.setItem("role", data.role)
        this.$router.push('/')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `welcome ${data.email}`,
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.log(error);
        // console.log(error.response.data, "<<<");
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.msg,
        }) 
      }
    },
    async handleLoginCons(formLogin){
      try {
        const { data } = await axios({
          url: `${this.baseUrl}/counselor/login`,
          method: "POST",
          data: formLogin
        })
        // console.log(data, "<< ini data");
        localStorage.setItem("id", data.id)
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("name", data.name)
        localStorage.setItem("email", data.email)
        localStorage.setItem("role", data.role)
        this.$router.push('/talk-cons')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `welcome ${data.username}`,
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        console.log(error, "<<<");
        // console.log(error.response.data, "<<<");
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: error.response.data.msg,
        // }) 
      }
    },
    async getCounsellorById(){
      try {
        const counselorId = localStorage.getItem("counselorId");

        if (!counselorId) {
          console.error("counselorId tidak ditemukan di localStorage");
          return;
        }

        const { data } = await axios({
          url: `${this.baseUrl}/counselor/${counselorId}`,
          method: "GET"
        })
        console.log(">>>", data, "<<")
        this.dataCounselor = data
      } catch (error) {
        console.log(error);
      }
    },
    async getCustomerById(customerId){
      try {
        const { data } = await axios({
          url: `${this.baseUrl}/cust/${customerId}`,
          method: "GET"
        })
        // console.log(data, "<<<");
        this.dataCustomer = data
      } catch (error) {
        console.log(error);
      }
    },
    // async posHistory(obj){
    //   try {
    //     console.log(obj);
    //     // const { data } = await axios({
    //     //   url:`${this.baseUrl}/cust/histories/${counselorId}`,
    //     //   method:'post',
    //     //   data: {
    //     //     price,
    //     //     email: localStorage.getItem("email")
    //     //   },
    //     //   headers: { access_token: localStorage.access_token}
    //     // })
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async handleFetchCategory(){
      try {
        // console.log(page);
        const {data} = await axios({
          url: `${this.baseUrl}/cust/categories`,
          method: "GET"
        })
        console.log(data, "<<ini data category");
        // this.totalPage = data.totalPage
        this.categories = data
        console.log(this.categories, "<<ini data state");
      } catch (error) {
        console.log(error,"<<<");
      }
    },
    async CategoryByConsellor(categoryId){
      try {
        // console.log(categoryId , "<<gggggg");
        const { data } = await axios({
          url: `${this.baseUrl}/cust/counselor/${categoryId}`,
          method: "GET",
          headers: { access_token: localStorage.access_token}
        })
        // console.log(">>>",data[0]);
        this.counselors = data
        // this.ratings = data.movie.rating
        // this.qrcode = data.QRcode
        // this.singleMovie = data.movie
      } catch (error) {
        console.log(error);
      }
    },
    async buyTicket(obj){
      try {
        console.log(">>>",obj);
        const {price, counselorId} = obj
        const { data } = await axios({
          url:`${this.baseUrl}/cust/${counselorId}/generateInvoice`,
          method:'post',
          data: {
            price,
            email: localStorage.getItem("email")
          },
          headers: { access_token: localStorage.access_token}
        })
        // console.log(data, "<<<");
        if (data.data.invoice_url) {
          window.open(data.data.invoice_url, '_blank')        
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
})
