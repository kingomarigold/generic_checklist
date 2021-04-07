import ApiCall from './ApiCall'

const TokenRefresh = () => {
  return (
    ApiCall(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_REFRESH_TOKEN_URI,
    'POST', {}).
    then(res => {
      console.log('Token response: ', res)
      if (res.status == 200) {
        return res.json()
      }
      else {
        return new Promise((resolve, reject) => {
          resolve(null)
        })
      }
    })
    .then(json => {
      console.log('Token is: ', json)
      if (json) {
        localStorage.setItem('token', json.token)
      }
      return new Promise((resolve, reject) => {
        resolve(json !== null)
      })
    })
    .catch(err =>  err)
  )
}

export default TokenRefresh
