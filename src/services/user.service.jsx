import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from './constants'

class UserService {
  async getUserTransactionsByCategories(user) {
    return await axios.get(
      `${API_URL}/user/transactions/categories/${user.id}`,
      {
        headers: authHeader(),
      }
    )
  }

  async getUserCategoriesList(user) {
    return await axios.get(`${API_URL}/user/categories/${user.id}`, {
      headers: authHeader(),
    })
  }

  async getUserCategoriesSummary(user, timeframeArray) {
    return await axios.get(`${API_URL}/user/categories/summary/${user.id}`, {
      headers: authHeader(),
      params: {
        from: timeframeArray[0],
        until: timeframeArray[1],
      },
    })
  }

  getUserSummary = async (user, timeframeArray) => {
    return await axios.get(`${API_URL}/user/summary/${user.id}`, {
      headers: authHeader(),
      params: {
        from: timeframeArray[0],
        until: timeframeArray[1],
      },
    })
  }

  getUserTransactions = async timeframeArray => {
    const user = JSON.parse(localStorage.getItem('spendUser'))
    if (user && user.accessToken) {
      const response = await axios.get(
        `${API_URL}/user/transactions/${user.id}`,
        {
          headers: authHeader(),
          params: {
            from: timeframeArray[0],
            until: timeframeArray[1],
          },
        }
      )
      return response.data
    }
  }

  async postNewTransaction(submission) {
    const user = JSON.parse(localStorage.getItem('spendUser'))
    if (user && user.accessToken) {
      const response = await axios.post(
        `${API_URL}/transaction/user/${user.id}`,
        JSON.stringify(submission),
        {
          headers: authHeader(),
        }
      )
      return response
    }
  }

  deleteTransaction = async transactionID => {
    const response = await fetch(`${API_URL}/transaction/${transactionID}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    return response.data
  }

  async getUserTransactionsForCategoryName(user, categoryName) {
    return await axios.get(
      `${API_URL}/user/transactions/categories/${categoryName}/${user.id}`,
      {
        headers: authHeader(),
      }
    )
  }
}

export default new UserService()
