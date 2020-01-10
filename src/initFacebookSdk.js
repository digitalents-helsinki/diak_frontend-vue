export default function() {
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: process.env.VUE_APP_FACEBOOK_APP_ID,
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v5.0'
    })
  }
  
  ((d, s, id) => {
    if (d.getElementById(id)) return
    const [fjs] = d.getElementsByTagName(s)
    const js = d.createElement(s)
    js.id = id
    js.src = "https://connect.facebook.net/en_US/sdk.js"
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')

  return new Promise(resolve => {
    (function waitForFB() {
      if (window.FB) resolve(window.FB)
      else setTimeout(waitForFB)
    })()
  })
}