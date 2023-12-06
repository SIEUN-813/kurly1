import React from 'react';
import axios from 'axios';
import './scss/sub6.scss';
import './scss/sub7_myadmin.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../reducer/signIn';

export default function Sub7AdminSignInComponent() {
    
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate =  useNavigate();

    const [state, setState] = React.useState({
        id: '',
        pw: '',
        address: '',
        logInInfo: {}
    })

    const onClickIdSearch=(e)=>{
        e.preventDefault();
        navigate('/sub7AdminIdSearch');
    }

    const onClickPwSearch=(e)=>{
        e.preventDefault();
        navigate('/sub7AdminPwSearch');
    }

    const onChangeId=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            id: e.target.value
        })
    }
    
    const onChangePw=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            pw: e.target.value
        })
    }
    
    const onSubmitSignInForm=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('adminId', state.id);
        formData.append('adminPw', state.pw);
        axios({
            url: 'https://sieun.co.kr/kurly_green/kurly_admin_signIn.php',
            method: 'POST',
            data: formData 
        })
        .then((res)=>{     
            if(res.status===200){
                if(res.data !== ''){
                    // 로그인완료 => 3일간 로그인 유지
                    let toDay = new Date();
                    toDay.setDate(toDay.getDate() + 3);
                    // (이름, 아이디, 주소) 상태관리 저장
                    const logInInfo = {             
                        memberGrade: 'admin',             
                        id: res.data.아이디,
                        name: res.data.이름,
                        address: res.data.주소
                    }
                    // 만료일까지 영구적으로 보관
                    localStorage.setItem('KURLY_SIGNIN_INFORMATION', JSON.stringify(logInInfo));
                    //console.log(signIn(logInInfo))
                    dispatch(signIn(logInInfo));
                    navigate('/index');
                }
            }
        })
        .catch((err)=>{
            console.log(`AXIOS 전송 실패 ${err}`);
        });
    }

    const onClickSignUp=(e)=>{
        e.preventDefault();
        navigate('/sub7AdminSignUp');
    }

    return (
        <main id='sub6' className='sub7-myadmin'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className='title-txt'>MyAdmin</h2>
                        <h3 className='title-sub-txt'>로그인</h3>
                    </div>
                    <div className="content sub6-content">
                        <form onSubmit={onSubmitSignInForm} autoComplete='off'>
                            <ul>
                                <li>
                                    <div className="gap">                                        
                                        <input 
                                            type="text" 
                                            name='userId'
                                            id='userId'
                                            onChange={onChangeId}
                                            value={state.id}
                                            placeholder='관리자 아이디를 입력해주세요'
                                        />    
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">                                      
                                        <input 
                                            type="password"
                                            name='userPw'
                                            id='userPw' 
                                            onChange={onChangePw}
                                            value={state.pw}
                                            placeholder='관리자 비밀번호를 입력해주세요'
                                        />   
                                    </div>
                                </li>
                                <li>
                                    <div className="gap"> 
                                        <span>
                                            <a href="!#" onClick={onClickIdSearch}>아이디 찾기</a>
                                            <i>|</i>
                                            <a href="!#" onClick={onClickPwSearch}>비밀번호 찾기</a>
                                        </span>
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">                                      
                                        <input 
                                            type="submit"
                                            name='submitBtn'
                                            id='submitBtn' 
                                            value={'로그인'}
                                        />   
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">                                      
                                        <input 
                                            type="button"
                                            name='signupBtn'
                                            id='signupBtn' 
                                            value={'회원가입'}
                                            onClick={onClickSignUp}
                                        />   
                                    </div>
                                </li>
                            </ul>                     
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};