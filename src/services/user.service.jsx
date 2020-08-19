import axios from 'axios'
import authHeader from './auth-header'
import { API_URL } from './constants'

class UserService {
  async getUserTransactions() {
    return await axios.get(API_URL + 'usertransactions', {
      headers: authHeader(),
    })
  }

  async getUserTransactionsForCategoryName(user, categoryName) {
    return await axios.get(
      `${API_URL}/user/transactions/categories/${categoryName}/${user.id}`,
      {
        headers: authHeader(),
      }
    )
  }

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

  getUserSummary = async user => {
    return await axios.get(`${API_URL}/user/summary/${user.id}`, {
      headers: authHeader(),
    })
  }
}

export default new UserService()

// TEST FOR EXPENSES BY SPECIFIC CATEGORY
// const response = await axios.get(
//   `${API_URL}/user/transactions/categories/fun/${user.id}`,
//   {
//     headers: {
//       'x-access-token': user.accessToken,
//       'Content-Type': 'application/json',
//     },
//   }
// )

// TEST FOR EXPENSES BY SPECIFIC CATEGORY
// const response = await axios.get(
//   `${API_URL}/user/transactions/categories/fun/${user.id}`,
//   {
//     headers: {
//       'x-access-token': user.accessToken,
//       'Content-Type': 'application/json',
//     },
//   }
// )

// TEST FOR EXPENSES BY CATEGORIES
// const response = await axios.get(
//   `${API_URL}/user/transactions/categories/${user.id}`,
//   {
//     headers: {
//       'x-access-token': user.accessToken,
//       'Content-Type': 'application/json',
//     },
//   }
// )

// TEST FOR USER CATEGORIES
// const response = await axios.get(
//   `${API_URL}/user/categories/${user.id}`,
//   {
//     headers: {
//       'x-access-token': user.accessToken,
//       'Content-Type': 'application/json',
//     },
//   }
// )
// USE FOR USER SUMMARY
// const response = await axios.get(`${API_URL}/user/summary/${user.id}`, {
//   headers: {
//     'x-access-token': user.accessToken,
//     'Content-Type': 'application/json',
//   },
// })
