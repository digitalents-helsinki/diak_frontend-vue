export default function(Vue, options) {
  ((d, s, id) => {
    if (d.getElementById(id)) return
    const [fjs] = d.getElementsByTagName(s)
    const js = d.createElement(s)
    js.id = id
    js.src = 'https://apis.google.com/js/api.js?onload=initGapi'
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'google-api-javascript-client')

  window.initGapi = () => window.gapi.load('auth2', () => window.gapi.auth2.init({
      discoveryDocs: ['https://accounts.google.com/.well-known/openid-configuration'],
      ...options
    })
  )

  Object.defineProperties(Vue.prototype, {
    $gapi: {
      get: () => window.gapi
    }
  })
}