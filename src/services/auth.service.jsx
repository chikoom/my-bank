import axios from 'axios'
import { AUTH_URL } from './constants'

class AuthService {
  login = async (username, password) => {
    const response = await axios.post(AUTH_URL + 'signin', {
      username,
      password,
    })
    if (response.data.accessToken) {
      localStorage.setItem('spendUser', JSON.stringify(response.data))
    }
    return response.data
  }
  logout = () => {
    localStorage.removeItem('spendUser')
  }
  register = async (username, password, email) => {
    const response = await axios.post(AUTH_URL + 'signup', {
      username,
      email,
      password,
    })
    if (response.data.accessToken) {
      localStorage.setItem('spendUser', JSON.stringify(response.data))
    }
    return response.data
  }
  getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('spendUser'))
  }
}

export default new AuthService()
