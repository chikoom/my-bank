import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:3001/auth/'

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all')
  }

  getUserContent() {
    return axios.get(API_URL + 'user', { headers: authHeader() })
  }
}
