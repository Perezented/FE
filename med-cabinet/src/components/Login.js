import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'
import * as yup from 'yup';

//set up the form schema
const loginSchema = yup.object().shape({
    name: yup.string().min(2).required("Please Enter a Name Longer Than 2 Characters."),
    email: yup.string().email().required("Please Enter A Valid Email"),
    password: yup.string().min(6).required('Please Enter A Password Of 6 Characters Or More')
})

const signSchema = yup.object().shape({
    name: yup.string().min(2).required("Please Enter a Name Longer Than 2 Characters."),
    email: yup.string().email().required("Please Enter A Valid Email"),
    password: yup.string().min(6).required('Please Enter A Password Of 6 Characters Or More')
})
const Login = () => {

    //login state
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });


    //sign up state
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',

    })

    //error state
    const [error, setError] = useState({
        name: '',
        email: '',
        password: '',

    })

    const { push } = useHistory();


    //handle changes on login form
    const handleChange = event => {
        event.persist()
        setUser({

            ...user,
            [event.target.name]: event.target.value

        })

        validateLoginChange(event)
    }

    const [addDisabled, setAddDisabled] = useState(true)

    //handles changes on sign up form
    const handleSignChange = event => {
        event.persist()
        setNewUser({

            ...newUser,
            [event.target.name]: event.target.value

        })
        validateSignChange(event)
    }

    //handles login request
    const handleLogin = event => {
        event.preventDefault();
        axios
            .post('https://medcab1.herokuapp.com/api/auth/login', user)
            .then(res => {
                localStorage.setItem('token', JSON.stringify(res.data.token))
                push('/home')
                window.location.reload()

                setUser({
                    name: '',
                    email: '',
                    password: '',
                }
                )
                

            })
            .catch(err => console.log('Login Error:', err))
        

    }

    //handles sign up request
    const handleSignUp = event => {
        event.preventDefault();
        axios
            .post('https://medcab1.herokuapp.com/api/auth/register', newUser)
            .then(res => {
                console.log(res)
                alert('Sign Up Sucsessful!')
                setNewUser({
                    name: '',
                    email: '',
                    password: '',
                }
                )
                push('/')
            })
            .catch(err => console.log('Sign Up Error:', err))
    }

    const validateLoginChange = event => {
        yup.reach(loginSchema, event.target.name)
            .validate(event.target.type === event.target.value)
            .then(valid => {
                setError({
                    ...error,
                    [event.target.name]: ""
                });
            })
            .catch(err => {
                console.log(err)
                setError({
                    ...error,
                    [event.target.name]: err.errors[0]
                })
            })
    }

    const validateSignChange = event => {
        yup.reach(signSchema, event.target.name)
            .validate(event.target.type === event.target.value)
            .then(valid => {
                setError({
                    ...error,
                    [event.target.name]: ""
                });
            })
            .catch(err => {
                console.log(err)
                setError({
                    ...error,
                    [event.target.name]: err.errors[0]
                })
            })
    }

    useEffect(() => {
        loginSchema.isValid(user).then(valid => {
            setAddDisabled(!valid);
        })
    }, [user]);

    useEffect(() => {
        signSchema.isValid(newUser).then(valid => {
            setAddDisabled(!valid);
        })
    }, [newUser]);

    return (
        <>
            <h1>MedCabinet</h1>

            <div className='credDiv'>


                <div className='login'>
                    <h2>Sign In</h2>
                    <form onSubmit={handleLogin}>
                        <label htmlFor='email' name='email' >Email*</label>
                        <br />
                        <input
                            type='text'
                            name='email'
                            value={user.email}
                            onChange={handleChange}
                        />
                        <br />

                        {error.email.length > 0 ? <p>{error.email}</p> : null}

                        <label htmlFor='password' name='password' >Password*</label>
                        <br />
                        <input
                            type='password'
                            name='password'
                            value={user.password}
                            onChange={handleChange}
                        />
                        <br />

                        {error.password.length > 0 ? <p>{error.password}</p> : null}

                        <button disabled={addDisabled}>Login</button>

                    </form>
                </div>
                <div className='sign'>
                    <h2>Not a Member? <br /> Sign Up Today!</h2>
                    <form onSubmit={handleSignUp}>
                        <label htmlFor='name' name='name' >Name*</label>

                        <br />
                        <input
                            type='text'
                            name='name'
                            value={newUser.name}
                            onChange={handleSignChange}
                        />
                        <br />

                        {error.name.length > 0 ? <p>{error.name}</p> : null}

                        <label htmlFor='email' name='email' >Email*</label>
                        <br />

                        <input
                            type='text'
                            name='email'
                            value={newUser.email}
                            onChange={handleSignChange}
                        />
                        <br />

                        {error.email.length > 0 ? <p>{error.email}</p> : null}

                        <label htmlFor='password' name='password' >Password*</label>
                        <br />

                        <input
                            type='password'
                            name='password'
                            value={newUser.password}
                            onChange={handleSignChange}
                        />
                        <br />

                        {error.password.length > 0 ? <p>{error.password}</p> : null}

                        <button onClick={() => { push('/') }} disabled={addDisabled}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login


