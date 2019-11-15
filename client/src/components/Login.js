import React,{useState} from "react";
import  axiosWithAuth  from '../utils/axiosWithAuth'

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [info, setInfo] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
    .post(`/login`, info)
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      props.history.push('/bubble-page')
    })
    .catch(err => console.log(err))

    setInfo({username: '', password: ''})
  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      {/* <p>Build a login page here</p> */}

      <form onSubmit={handleSubmit}>
          <input
              type='text'
              placeholder='Username'
              value={info.username}
              required
              onChange={handleChange}
              name='username'
          />

          <br/>

          <input
              type='password'
              placeholder='Password'
              value={info.password}
              required
              onChange={handleChange}
              name='password'
          />
          <br/>
          <button className='add' type='submit'>Submit</button>
      </form>


    </>
  );
};

export default Login;