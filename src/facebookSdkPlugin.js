export default function(Vue, options) {
  window.fbAsyncInit = () => {
    window.FB.init(options)
  }
  
  ((d, s, id) => {
    if (d.getElementById(id)) return
    const [fjs] = d.getElementsByTagName(s)
    const js = d.createElement(s)
    js.id = id
    js.src = "https://connect.facebook.net/en_US/sdk.js"
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')

  Object.defineProperties(Vue.prototype, {
    $fb: {
      get: () => window.FB
    }
  })
}