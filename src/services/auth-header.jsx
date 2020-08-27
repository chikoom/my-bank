export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('spendUser'))
  if (user && user.accessToken) {
    return {
      'x-access-token': user.accessToken,
      'Content-Type': 'application/json',
    }
  }
  return {}
}
