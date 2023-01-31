const { STAGING_API_URL } = require('./constants')

const getApiUrl = () => process.env.BROWSER_BASE_URL ?? STAGING_API_URL

const getDomain = () => {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.SITE_URL) {
      return process.env.SITE_URL
    } else if (process.env.HEROKU_APP_NAME) {
      return `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
    } else if (process.env.RENDER_APP_NAME) {
      return `https://${process.env.RENDER_APP_NAME}.onrender.com`
    } else if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`
    } else if (getApiUrl() === STAGING_API_URL) {
      return 'https://staging.modrinth.com'
    } else {
      return 'https://modrinth.com'
    }
  } else {
    return 'http://localhost:3000'
  }
}

module.exports = {
  getApiUrl,
  getDomain,
}
