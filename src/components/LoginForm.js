import React, { useState} from 'react' 

const LoginForm = ({loginAction}) => {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameInput = (event) => {
        setUserName(event.target.value)
    }

    const handlePasswordInput = (event) => {
        setPassword(event.target.value)
    }

    const handleLogIn = (event) => {
        event.preventDefault()

        loginAction({username, password})

        setUserName('')
        setPassword('')
    }


    return (
        <div>

            <h2> Log in </h2>
            <form onSubmit={handleLogIn}>
                <p>username: 
                    <input 
                        type='text'
                        value={username}
                        onChange={handleUsernameInput}>
                    </input>
                </p>
                <p>password:
                    <input
                        type='password'
                        value={password}
                        onChange={handlePasswordInput}>
                    </input>
                </p>
                <button type='submit'>log in</button>
            </form>
        </div>
    )
}

export default LoginForm