import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then((response) => response.data)
}

const create = (newObj) => {
  const request = axios.post(baseURL, newObj)
  return request.then((response) => response.data)
}

const update = (id, newObj) => {
  const request = axios.put(`${baseURL}/${id}`, newObj)
  return request.then((response) => response.data)
}

const remove = (id) => {
  // You can't use the name delete for a variable because
  // it's a reserved word in JavaScript.
  const request = axios.delete(`${baseURL}/${id}`)
  return request.then(() => true)
}

export default { getAll, create, update, remove }
