import axios from "axios"
// https://pb-backend.fly.dev/api/persons
const baseurl = "/api/persons"

const getAll = () => {
    const req = axios.get(baseurl)
    return req.then(res => res.data)
}

const create = newObject => {
    const req = axios.post(baseurl, newObject)
    return req.then(res => res.data)
}

const deletePerson = id => {
    const req = axios.delete(`${baseurl}/${id}`)
    return req.then(res => res.data)
}

const update = (id, newObject) => {
    const req = axios.put(`${baseurl}/${id}`, newObject)
    return req.then(res => res.data)
}

const exports = { getAll, create, deletePerson, update }

export default exports