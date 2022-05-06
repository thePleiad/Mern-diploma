import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [user, setUser] = useState({
        email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/login', {...user})

            localStorage.setItem('firstLogin', true)
            
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Логін</h2>
                <input type="email" name="email" required
                placeholder="Введіть свій Email..." value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Введіть свій пароль..." value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Увійти</button>
                    <Link to="/register">Реєстрація</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
