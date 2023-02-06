import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return await response.data
}

const update = async newObject => {
  try {
    const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
// eslint-disable-next-line
export default { getAll, setToken, create, update, remove }