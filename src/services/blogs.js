import axios from 'axios'
import Blog from '../components/Blog'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}


// const getAll = () => {
//     const request = axios.get(baseUrl)
//     return request.then(response => response.data)
// }

const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async(newObject) => {
    const config = {
        headers: {Authorization: token}
    }
    const response =  await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async(object) => {

    const update = {likes: object.likes + 1}
    console.log(update)

    const response = await axios.put(`${baseUrl}/${object.id}`, update)
    return response.data
}

export default { 
    getAll,
    create,
    setToken,
    update
}