

const getAuthHeader = () => {
  return 'Bearer ' + localStorage.getItem('token')
}

const callLoadingCallback = (loadingCallback, value) => {
  if (loadingCallback) {
    loadingCallback(value)
  }
}

const getFetcher = (authToken, url, method, params) => {
  return method === 'GET' || method === 'HEAD'?fetch(
    url,
    {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Authorization': authToken
      }
    }
  ):
  fetch(
    url,
    {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      },
      body: JSON.stringify(params)
    }
  )
}

const ApiCall = (url, method, params, loadingCallback)  => {
  callLoadingCallback(loadingCallback, true)
  let authToken = getAuthHeader()
  let  fetcher = getFetcher(authToken, url, method, params)

  return fetcher
  .then(response => {
    callLoadingCallback(loadingCallback, false)
    return response
  })
  .catch(err => {
    callLoadingCallback(loadingCallback, false)
    console.log('Error occured: ', err)
    return new Promise((resolve, reject) => {
      resolve(null)
    })
  })
}

export default ApiCall
