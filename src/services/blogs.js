import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}


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
    const response = await axios.put(`${baseUrl}/${object.id}`, update)
    return response.data
}

const remove = async(object) => {
    const config = {
        headers: {Authorization: token}
    }

    // delete() 第二个参数 直接是 token!!!
    await axios.delete(`${baseUrl}/${object.id}`,config)
    return null
}

export default { 
    getAll,
    create,
    setToken,
    update,
    remove
}