import React, { useState} from 'react' 

const CreateBlogForm = ({addNewBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleInput = (event) => {
        event.preventDefault()
        setTitle(event.target.value)
    }
    const handleAuthorInput = (event) => {
        event.preventDefault()
        setAuthor(event.target.value)
    }
    const handleUrlInput = (event) => {
        event.preventDefault()
        setUrl(event.target.value)
    }

    const createNewBlog = (event) =>{
        event.preventDefault()

        addNewBlog({
            title:title, 
            author:author, 
            url:url})
        setTitle('')
        setAuthor('')
        setUrl('')
    }



    return (
        <form onSubmit={createNewBlog}>
            <h2>create new</h2>
            <p>title:
                <input
                    value={title}
                    onChange={handleTitleInput}></input>
            </p>
            <p>author:
                <input
                    value={author}
                    onChange={handleAuthorInput}></input>
            </p>
            <p>url:
                <input
                    value={url}
                    onChange={handleUrlInput}></input>
            </p>
            <button type='submit'>create</button>
        </form>

    )
}

export default CreateBlogForm