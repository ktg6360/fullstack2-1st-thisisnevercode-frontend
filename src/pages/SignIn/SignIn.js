import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer';
import './SignIn.scss';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      showPw: false,
    };
  }

  handleClick = () => {
    const { email, password } = this.state;
    fetch('/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: 'include',
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (data.status === 'FAILED') {
          alert(data.message);
        } else if (data.status === 'SUCCESS') {
          alert(data.message);
          this.goToList();
        }
      });
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  signInFailAlert = () => {
    const { email, password } = this.state;
    if (email === '') {
      return alert('이메일을 입력해주세요');
    } else if (password === '') {
      return alert('비밀번호를 입력해주세요');
    } else if (email !== '' && password !== '') {
      return alert('유효한 형식으로 작성해주세요');
    }
  };

  changeIcon = () => {
    this.setState({
      showPw: !this.state.showPw,
    });
  };

  goToList = () => {
    const { email, password } = this.state;
    if (email.includes('@') && password.length >= 5) {
      this.props.history.push('./welcome');
    }
  };

  render() {
    const { showPw } = this.state;
    return (
      <section className='SignIn'>
        <Nav />
        <form action='' className='form'>
          <div className='signInBox'>
            <p className='email'>이메일</p>
            <input
              className='emailInput'
              type='email'
              placeholder='이메일'
              name='email'
              onChange={this.handleInput}
            />
            <p className='password'>비밀번호</p>
            <input
              className='passwordInput'
              type={showPw ? 'text' : 'password'}
              placeholder='비밀번호'
              name='password'
              onChange={this.handleInput}
            />
            <div className='onEye' onClick={this.changeIcon}>
              {showPw ? <FaEyeSlash /> : <FaEye />}
            </div>
            <button
              className='signInButton'
              type='button'
              onClick={this.handleClick}
            >
              <p className='signInText'>LOGIN</p>
            </button>
            <div className='addFunction'>
              <Link className='signUp' to='/signup'>
                회원가입
              </Link>
              <Link className='findPassword' to=''>
                비밀번호 찾기
              </Link>
            </div>
            <button className='button'>LOGIN WITH KOKOA</button>
            <button className='button'>LOGIN WITH FACEKICK</button>
            <button className='button'>LOGIN WITH GARGLE</button>
          </div>
        </form>
        <Footer />
      </section>
    );
  }
}

export default SignIn;
