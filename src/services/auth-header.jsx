export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('spendUser'))
  if (user && user.accessToken) {
    console.log('usr found', user.accessToken)
    return {
      'x-access-token': user.accessToken,
      'Content-Type': 'application/json',
    }
  }
  return {}
}
