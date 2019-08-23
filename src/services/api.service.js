import axios from 'axios'
import { TokenService } from '../services/storage.service'

const ApiService = {
  init(baseURL) {
      axios.defaults.baseURL = baseURL;
  },

  setHeader() {
      axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`
  },

  removeHeader() {
      axios.defaults.headers.common = {}
  }
}

export default ApiService