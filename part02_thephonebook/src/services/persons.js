import axios from 'axios'

const baseUrl = '/api/persons'

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
        .then(response => response.data)
}

const getAllPersons = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
}

const deleteEntry = id => {
    const url = baseUrl.concat(`/${id}`)
    return axios.delete(url)
        .then(response => response.data)
}

const updatePerson = (id, changedPerson) => {
    const url = baseUrl.concat(`/${id}`)
    return axios.put(url, changedPerson)
        .then(res => res.data)
}

export default { create, getAllPersons, deleteEntry, updatePerson }