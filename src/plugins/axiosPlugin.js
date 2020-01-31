import axios from 'axios'

export default (Vue, axiosInstance) => {
  Vue.$axios = axiosInstance || axios
  
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get: () => axiosInstance || axios
    }
  })
}
