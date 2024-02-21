import axios from 'axios'

const create = newPerson => {
    return axios.post('http://localhost:3001/persons', newPerson)
        .then(response => response.data)
        .catch(error => console.log("Couldn't create person", error))
}

const getAllPersons = () => {
    return axios.get('http://localhost:3001/persons')
        .then(response => response.data)
        .catch(error => console.log("Couldn't get all persons", error))
}

export default { create, getAllPersons }