import axios from 'axios'

const API_URL = 'http://localhost:3000/auth/'

class AuthService {
  login = async (username, password) => {
    const response = await axios.post(API_URL + 'signin', {
      username,
      password,
    })
    if (response.data.accessToken) {
      localStorage.setItem('spendUser', JSON.stringify(response.data))
    }
    console.log('login response', response)
    return response.data
  }
  logout = () => {
    localStorage.removeItem('spendUser')
  }
  register = async (username, password, email) => {
    const response = await axios.post(API_URL + 'signup', {
      username,
      email,
      password,
    })
    if (response.data.accessToken) {
      localStorage.setItem('spendUser', JSON.stringify(response.data))
    }
    console.log('register response', response)
    return response.data
  }
  getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('spendUser'))
  }
}

export default new AuthService()
