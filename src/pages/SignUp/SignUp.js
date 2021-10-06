import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import './SignUp.scss';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      seePw: false,
    };
  }

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => this.handleBtn());
  };

  handleBtn = () => {
    const { name, email, password } = this.state;
    this.setState({
      isActive:
        name.includes('/^[가-힣]+$/') &&
        email.includes(
          '/^([w-]+(?:.[w-]+)*)@((?:[w-]+.)*w[w-]{0,66}).([a-z]{2,6}(?:.[a-z]{2})?)$/'
        ) &&
        password.length >= 5,
    });
  };

  changeIcon = () => {
    this.setState({
      seePw: !this.state.seePw,
    });
  };

  openAlert = () => {
    alert('유효한 형식으로 작성해주세요.');
  };

  goToList = () => {
    if (this.state.isActive) {
      this.props.history.push('./SignIn');
    }
  };

  render() {
    const { seePw, isActive } = this.state;
    return (
      <section className='SignUp'>
        <form action='' className='form'>
          <div className='signUpBox'>
            <div className='inputBox'>
              <p className='name'>이름</p>
              <input
                className='nameBox'
                type='text'
                placeholder='이름'
                name='name'
                onChange={this.handleInput}
                onKeyPress={this.handleBtn}
              />
              <p className='email'>이메일</p>
              <input
                className='emailBox'
                type='text'
                placeholder='이메일'
                name='email'
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
              <p className='address'>주소</p>
              <input
                className='addressBox'
                type='text'
                placeholder='주소'
                name='address'
                onChange={this.handleInput}
                onKeyPress={this.handleBtn}
              />
            </div>
            <div className='checkBox'>
              <div className='line' />
              <p className='agreement'>이용악관 동의</p>
              <div className='checkInput'>
                <div className='allAgree'>
                  <input className='headPoint' type='checkbox' />
                  <p className='agreedName'>전체 동의 합니다.</p>
                </div>
                <div className='subCheck'>
                  <input className='checkPoint' type='checkbox' />
                  <p className='agreedName'>이용약관 동의</p>
                  <p className='choose'>(필수)</p>
                  <Link to='/signUp' className='readMore'>
                    약관보기
                  </Link>
                </div>
                <div className='subCheck'>
                  <input className='checkPoint' type='checkbox' />
                  <p className='agreedName'>개인정보 수집 및 이용 동의</p>
                  <p className='choose'>(필수)</p>
                  <Link to='/signUp' className='readMore'>
                    약관보기
                  </Link>
                </div>
                <div className='subCheck'>
                  <input className='checkPoint' type='checkbox' />
                  <p className='agreedName'>마케팅 수신 동의</p>
                  <p className='choose'>(선택)</p>
                  <Link to='/signUp' className='readMore'>
                    약관보기
                  </Link>
                </div>
                <div className='subCheck'>
                  <input className='checkPoint' type='checkbox' />
                  <p className='agreedName'>본인은 만 14세 이상입니다.</p>
                  <p className='choose'>(필수)</p>
                </div>
              </div>
              <button
                className='registerBox'
                onClick={isActive ? this.goToList : this.openAlert}
              >
                <p className='registerStyle'>REGISTER</p>
              </button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

export default SignUp;
