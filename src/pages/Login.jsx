import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (err) {
      setErr(true);

    }
  };
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className='logo'>PBinh Chat</span>
        <span className='title'>Đăng nhập</span>
        <form onSubmit={handelSubmit}>
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <button>Đăng nhập</button>
          {err && <span>Email hoặc password không đúng!!!</span>}
        </form>
        <p>Bạn chưa có tài khoản? <Link to="/register">Đăng kí</Link></p>
      </div>
    </div>
  )
}

export default Login