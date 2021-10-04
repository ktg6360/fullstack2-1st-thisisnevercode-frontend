import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import './SignIn.scss';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      password: '',
      isActive: false,
      seePw: false,
    };
  }

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.handleBtn());
  };

  handleBtn = () => {
    const { id, password } = this.state;
    this.setState({ isActive: id.includes('@') && password.length >= 5 });
  };

  openAlert = () => {
    alert('유효한 이메일과 비밀번호가 아닙니다.');
  };

  changeIcon = () => {
    this.setState({
      seePw: !this.state.seePw,
    });
  };

  goToList = () => {
    if (this.state.isActive) {
      this.props.history.push('./ProductList');
    }
  };

  render() {
    const { isActive, seePw } = this.state;
    return (
      <section className='signIn'>
        <form action='' className='form'>
          <div className='signInBox'>
            <p className='email'>이메일</p>
            <input
              className='text'
              type='text'
              placeholder='이메일'
              name='id'
              onChange={this.handleInput}
              onKeyPress={this.handleBtn}
            />
            <p className='password'>비밀번호</p>
            <input
              className='passwordBox'
              type={seePw ? 'text' : 'password'}
              placeholder='비밀번호'
              name='password'
              onChange={this.handleInput}
              onKeyPress={this.handleBtn}
            />
            {seePw ? (
              <FaEyeSlash className='onEye' onClick={this.changeIcon} />
            ) : (
              <FaEye className='onEye' onClick={this.changeIcon} />
            )}
            <button
              className='loginButton'
              onClick={isActive ? this.goToList : this.openAlert}
            >
              <p className='loginStyle'>LOGIN</p>
            </button>
            <div className='search'>
              <Link className='signUp' to='/SignUP'>
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
