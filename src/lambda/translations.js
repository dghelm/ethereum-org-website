const axios = require("axios")

const handler = async () => {
  try {
    const baseURL = "https://api.crowdin.com/api/project/ethereum-org/status"
    const { CROWDIN_API_KEY } = process.env

    const resp = await axios.get(`${baseURL}?key=${CROWDIN_API_KEY}&json`)

    if (resp.status < 200 || resp.status >= 300) {
      return { statusCode: resp.status, body: resp.statusText }
    }

    const data = await resp.data
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    }
  }
}

module.exports = { handler }
