import axios from 'axios'
import { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Context } from '../context'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { state, dispatch } = useContext(Context)

  console.log('STATE', state)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.table({ name, email, password })
    try {
      setLoading(true)
      const { data } = await axios.post(`/api/v1/login`, {
        email,
        password,
      })
      // console.log('Login Response', data)
      dispatch({
        type: 'LOGIN',
        payload: data,
      })

      window.localStorage.setItem('user', JSON.stringify(data))
    } catch (err) {
      toast.error(err.response.data)
      setLoading(false)
    }
  }
  return (
    <>
      <h1 className='jumbotron text-center bg-primary square'>Login</h1>
      <div className='container col-md-4 offset-md-4 pb-5'>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            className='form-control mb-4 p-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
            required
          />
          <input
            type='password'
            className='form-control mb-4 p-4'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password'
            required
          />
          <button
            className='btn btn-block btn-primary'
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : 'Submit'}
          </button>
        </form>
        <p className='text-center p-3'>
          Not registered?{' '}
          <Link href='/register'>
            <a>Register</a>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Login
