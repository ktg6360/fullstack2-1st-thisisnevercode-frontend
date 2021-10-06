import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
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

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  signInFailAlert = () => {
    alert('유효한 이메일과 비밀번호가 아닙니다.');
  };

  changeIcon = () => {
    this.setState({
      showPw: !this.state.showPw,
    });
  };

  goToList = () => {
    const { email, password } = this.state;
    if (email.includes('@') && password.length >= 5) {
      this.props.history.push('./ProductList');
    }
  };

  render() {
    const { showPw, email, password } = this.state;
    const userValidate = email.includes('@') && password.length >= 5;
    return (
      <section className='SignIn'>
        <form className='form'>
          <div className='signInBox'>
            <p className='email'>이메일</p>
            <input
              className='emailText'
              type='text'
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
              onClick={userValidate ? this.goToList : this.signInFailAlert}
            >
              <p className='signInText'>LOGIN</p>
            </button>
            <div className='addFunction'>
              <Link className='signUp' to='/SignUp'>
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
      </section>
    );
  }
}

export default SignIn;
