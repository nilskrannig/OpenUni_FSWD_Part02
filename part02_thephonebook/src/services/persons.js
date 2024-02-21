import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
        .then(response => response.data)
        .catch(error => console.log("Couldn't create person", error))
}

const getAllPersons = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
        .catch(error => console.log("Couldn't get all persons", error))
}

const deleteEntry = id => {
    const url = baseUrl.concat(`/${id}`)
    return axios.delete(url)
        .then(response => response.data)
        .catch(error => console.log(`Couldn't delete person with id ${id}`, error))
}

export default { create, getAllPersons, deleteEntry }