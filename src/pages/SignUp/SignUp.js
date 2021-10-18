import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer';
import './SignUp.scss';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      address: '',
      showPw: false,
      isAllAgreeChecked: false,
      isUseAgreeChecked: false,
      isInformationAgreeChecked: false,
      isMarketingAgreeChecked: false,
      isMyselfAgreeChecked: false,
    };
  }

  handleClick = () => {
    const { name, email, password, address } = this.state;
    fetch('/account/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        address,
      }),
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

  clickCheckbox = event => {
    const { name, checked } = event.target;
    this.setState({
      [name]: checked,
    });

    if (name === 'isAllAgreeChecked') {
      if (checked) {
        this.setState({
          isAllAgreeChecked: true,
          isUseAgreeChecked: true,
          isInformationAgreeChecked: true,
          isMarketingAgreeChecked: true,
          isMyselfAgreeChecked: true,
        });
      } else {
        this.setState({
          isAllAgreeChecked: false,
          isUseAgreeChecked: false,
          isInformationAgreeChecked: false,
          isMarketingAgreeChecked: false,
          isMyselfAgreeChecked: false,
        });
      }
    }

    if (
      name === 'isUseAgreeChecked' ||
      name === 'isInformationAgreeChecked' ||
      name === 'isMarketingAgreeChecked' ||
      name === 'isMyselfAgreeChecked'
    ) {
      if (checked) {
        this.setState({
          isAllAgreeChecked: false,
        });
      } else {
        this.setState({
          isAllAgreeChecked: false,
        });
      }
    }
  };

  changeIcon = () => {
    this.setState({
      showPw: !this.state.showPw,
    });
  };

  signUpFailAlert = () => {
    const {
      isUseAgreeChecked,
      isInformationAgreeChecked,
      isMyselfAgreeChecked,
    } = this.state;

    if (
      !isUseAgreeChecked &&
      !isInformationAgreeChecked &&
      !isMyselfAgreeChecked
    ) {
      return alert('필수 동의버튼을 눌러주세요');
    }
  };

  goToList = () => {
    this.props.history.push('./signin');
  };

  render() {
    const {
      showPw,
      name,
      email,
      password,
      address,
      isAllAgreeChecked,
      isUseAgreeChecked,
      isInformationAgreeChecked,
      isMarketingAgreeChecked,
      isMyselfAgreeChecked,
    } = this.state;

    const inputComplete =
      email.includes('@') &&
      name.includes('') &&
      password.length >= 5 &&
      address.includes('') &&
      isUseAgreeChecked &&
      isInformationAgreeChecked &&
      isMyselfAgreeChecked;

    const correctName = /^[가-힣]{2,4}$/;
    const correctEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const correctPassword =
      /^.*(?=^.{5,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

    const checkName = name.match(correctName) || name === '';
    const checkEmail = email.match(correctEmail) || email === '';
    const checkPassword = password.match(correctPassword) || password === '';
    return (
      <section className='SignUp'>
        <Nav />
        <form action='' className='form'>
          <div className='signUpBox'>
            <div className='inputBox'>
              <p className='name'>이름</p>
              <p className={checkName ? 'wrongHide' : 'wrongShow'}>
                유효한 형식으로 작성해주세요.
              </p>
              <input
                className='nameBox'
                type='text'
                placeholder='이름'
                name='name'
                onChange={this.handleInput}
              />
              <p className='email'>이메일</p>
              <p className={checkEmail ? 'wrongHide' : 'wrongShow'}>
                유효한 이메일 형식으로 작성해주세요.
              </p>
              <input
                className='emailBox'
                type='email'
                placeholder='이메일'
                name='email'
                onChange={this.handleInput}
              />
              <p className='password'>비밀번호</p>
              <p className={checkPassword ? 'wrongHide' : 'wrongShow'}>
                비밀번호는 5자리 이상, 12자리 이하여야 합니다. (문자, 특수문자
                포함)
              </p>
              <input
                className='passwordBox'
                type={showPw ? 'text' : 'password'}
                placeholder='비밀번호'
                name='password'
                onChange={this.handleInput}
              />
              <div className='onEye' onClick={this.changeIcon}>
                {showPw ? <FaEyeSlash /> : <FaEye />}
              </div>
              <p className='address'>주소</p>
              <input
                className='addressBox'
                type='text'
                placeholder='주소'
                name='address'
                onChange={this.handleInput}
              />
            </div>
            <div className='checkBox'>
              <div className='line' />
              <p className='agreement'>이용악관 동의</p>
              <div className='checkInput'>
                <div className='allAgree'>
                  <input
                    className='headPoint'
                    type='checkbox'
                    name='isAllAgreeChecked'
                    checked={isAllAgreeChecked}
                    onClick={this.clickCheckbox}
                  />
                  <p className='agreedName'>전체 동의 합니다.</p>
                </div>
                <div className='subCheck'>
                  <input
                    className='checkPoint'
                    type='checkbox'
                    name='isUseAgreeChecked'
                    checked={isUseAgreeChecked}
                    onClick={this.clickCheckbox}
                  />
                  <p className='agreedName'>이용약관 동의</p>
                  <p className='choose'>(필수)</p>
                  <Link to='/signup' className='readMore'>
                    약관보기
                  </Link>
                </div>
                <div className='subCheck'>
                  <input
                    className='checkPoint'
                    type='checkbox'
                    name='isInformationAgreeChecked'
                    checked={isInformationAgreeChecked}
                    onClick={this.clickCheckbox}
                  />
                  <p className='agreedName'>개인정보 수집 및 이용 동의</p>
                  <p className='choose'>(필수)</p>
                  <Link to='/signup' className='readMore'>
                    약관보기
                  </Link>
                </div>
                <div className='subCheck'>
                  <input
                    className='checkPoint'
                    type='checkbox'
                    name='isMarketingAgreeChecked'
                    checked={isMarketingAgreeChecked}
                    onClick={this.clickCheckbox}
                  />
                  <p className='agreedName'>마케팅 수신 동의</p>
                  <p className='choose'>(선택)</p>
                  <Link to='/signup' className='readMore'>
                    약관보기
                  </Link>
                </div>
                <div className='subCheck'>
                  <input
                    className='checkPoint'
                    type='checkbox'
                    name='isMyselfAgreeChecked'
                    checked={isMyselfAgreeChecked}
                    onClick={this.clickCheckbox}
                  />
                  <p className='agreedName'>본인은 만 14세 이상입니다.</p>
                  <p className='choose'>(필수)</p>
                </div>
              </div>
              <button
                className='registerBox'
                type='button'
                onClick={this.handleClick}
                disabled={inputComplete ? false : true}
              >
                <p className='registerStyle'>REGISTER</p>
              </button>
            </div>
          </div>
        </form>
        <Footer />
      </section>
    );
  }
}

export default SignUp;
