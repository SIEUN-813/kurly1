import React from 'react';
import axios from 'axios';
import './scss/sub6.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../reducer/signIn';
import { addressAPIModal } from '../../reducer/addressAPIModal';

export default function Sub6SignInComponent() {
    
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate =  useNavigate();

    const [state, setState] = React.useState({
        id: '',
        pw: '',
        logInInfo: {}
    })

    const onClickIdSearch=(e)=>{
        e.preventDefault();
        navigate('/sub6IdSearch');
    }

    const onClickPwSearch=(e)=>{
        e.preventDefault();
        navigate('/sub6PwSearch');
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
        formData.append('userId', state.id);
        formData.append('userPw', state.pw);
        axios({
            url: 'https://sieun.co.kr/kurly_green/kurly_signIn.php',
            method: 'POST',
            data: formData 
        })
        .then((res)=>{     
            //console.log('AXIOS 전송 성공'); 
            //console.log( res ); 
            //console.log( res.data ); 
            if(res.status===200){
                if(res.data !== ''){
                    // 로그인완료 => 3일간 로그인 유지
                    let toDay = new Date();
                    toDay.setDate(toDay.getDate() + 3);
                    // (이름, 아이디, 휴대폰, 주소, 만료일) 상태관리 저장
                    const logInInfo = {              
                        memberGrade: 'general',                
                        id: res.data.아이디,
                        name: res.data.이름,
                        phone: res.data.휴대폰번호,
                        address: res.data.주소,
                        expire: toDay.getTime()
                    }
                    // 만료일까지 영구적으로 보관
                    localStorage.setItem('KURLY_SIGNIN_INFORMATION', JSON.stringify(logInInfo));
                    //console.log(signIn(logInInfo))
                    dispatch(signIn(logInInfo));
                    dispatch(addressAPIModal(res.data.주소));
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
        navigate('/sub5');
    }

    return (
        <main id='sub6' className='sub'>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className='title-txt'>로그인</h2>
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
                                            placeholder='아이디를 입력해주세요'
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
                                            placeholder='비밀번호를 입력해주세요'
                                        />   
                                    </div>
                                </li>
                                <li>
                                    <div className="gap"> 
                                        <span>
                                            <a href="!#" onClick={onClickIdSearch}>아이디 찾기</a>
                                            <i>|</i>
                                            <a href="!#" onClick={onClickPwSearch}>비밀번호 찾기</a>
                                            {/*                                            
                                            <Link to="/sub6IdSearch">아이디 찾기</Link>
                                            <i>|</i>      
                                            <Link to="/sub6PwSearch">비밀번호 찾기</Link>
                                            */}
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