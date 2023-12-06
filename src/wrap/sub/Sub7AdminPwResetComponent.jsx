import React from 'react';
import axios from 'axios';
import './scss/sub6_pw_reset.scss'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub7AdminPwResetComponent() {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        id: location.state.id,
        phone: location.state.phone,
        newPw: '',
        newPwCheck: '',
        guideBox1: false,
        guideBox2: false,
        pw1_guide_txt1: null,
        pw1_guide_txt2: null,
        pw1_guide_txt3: null,
        pw2_guide_txt1: null,
        submitBtn: true
    })
    /*
    React.useEffect(()=>{
        if(location.state.id !== '' && location.state.phone !== ''){
            setState({
                ...state,                
                id: location.state.id,
                phone: location.state.phone
            })
        }
    },[]);
    */
    // 새비밀번호 등록 입력상자 제한조건 메서드
    const newPwRegexp=(value)=>{        
        const regexp1 = /^(.){10,16}$/g;
        const regexp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_+=[\]{}\\|:;"',.<>/?]+))|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_+=[\]{}\\|:;"',.<>/?]+))/g;
        const regexp3 = /\s/g;
        const regexp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regexp5 = /(.)\1\1/g;
        let pw1_guide_txt1 = null;
        let pw1_guide_txt2 = null;
        let pw1_guide_txt3 = null;
        if(regexp1.test(value) === false){
            pw1_guide_txt1 = true
        }
        else{
            pw1_guide_txt1 = false;
        }

        if(regexp2.test(value) === false || regexp3.test(value) === true || regexp4.test(value) === true){
            pw1_guide_txt2 = true
        }
        else{
            pw1_guide_txt2 = false;
        }

        if(regexp5.test(value) === true){
            pw1_guide_txt3 = true
        }
        else{
            pw1_guide_txt3 = false;
        }

        setState({
            ...state,
            newPw: value,
            pw1_guide_txt1: pw1_guide_txt1,
            pw1_guide_txt2: pw1_guide_txt2,
            pw1_guide_txt3: pw1_guide_txt3
        })
    }

    // 새비밀번호 확인 입력상자 제한조건 메서드
    const newPwCheckRegexp=(value)=>{
        let pw2_guide_txt1 = false;
        if(value !== state.newPw || value === ''){
            pw2_guide_txt1 = true
        }
        else{
            pw2_guide_txt1 = false
        }
        setState({
            ...state,
            newPwCheck: value,
            pw2_guide_txt1: pw2_guide_txt1
        })
    }

    // 새 비밀번호 등록이 변경되면 새 비밀번호확인 함수 실행
    React.useEffect(()=>{
        newPwCheckRegexp (state.newPwCheck);
        return;
    },[state.newPw])

    // 새 비밀번호 & 새 비밀번호확인 완료시 확인 버튼 동작
    React.useEffect(()=>{
        if(state.pw2_guide_txt1 === false){            
            setState({
                ...state,
                submitBtn: false
            })
        }
        else{      
            setState({
                ...state,
                submitBtn: true
            })
        }
    },[state.pw2_guide_txt1])

    const onFocusPw1=()=>{
        setState({
            ...state,
            guideBox1: true
        })
    }

    const onBlurPw1=()=>{
        newPwRegexp(state.newPw);
    }

    const onFocusPw2=()=>{
        setState({
            ...state,
            guideBox2: true
        })
    }

    const onBlurPw2=()=>{
        newPwCheckRegexp(state.newPwCheck)
    }

    const onChangeNewPw=(e)=>{  
        newPwRegexp(e.target.value);
    }
    
    const onChangeNewPwCheck=(e)=>{
        newPwCheckRegexp(e.target.value);
    }

    const confirmModalMethod=(msg)=>{
        const obj = {            
            isConfirmModal: true,
            confirmMsg: msg,
            signupOk: false
        }
        dispatch(confirmModal(obj));
        const htmlElement = document.getElementsByTagName('html')[0];
        htmlElement.classList.add('on');
    }

    const onSubmitReset=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('adminId', state.id);
        formData.append('adminPhone', state.phone);
        formData.append('adminPw', state.newPw);
        axios({
            url: 'https://sieun.co.kr/kurly_green/kurly_admin_pw_reset.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            console.log('AXIOS 전송 성공');
            if(res.data===1){
                confirmModalMethod('관리자 비밀번호가 변경되었습니다')
            }
            else{
                confirmModalMethod('비밀번호를 다시 확인하고 시도해주세요')
            }
        })
        .catch((err)=>{
            console.log('AXIOS 전송 실패');
            console.log(err);
        })
    }
    
    const onClickDelNewPw=(e, el)=>{
        e.preventDefault();
        if(el === state.newPw){
            setState({
                ...state,
                newPw: ''
            })
        }
        else if(el === state.newPwCheck){
            setState({
                ...state,
                newPwCheck: ''
            })
        }
    }

    const mainBg = {
        backgroundColor: '#f7f7f7'
    }
    const title1 = {
        fontSize : '24px',
        color: '#5f0080',
        textAlign: 'center',
        padding: '0 0 20px 0',
        fontWeight: 600
    }
    const title2 = {
        fontSize : '20px',
        color: '#000',
        textAlign: 'center',
        padding: '0 0 50px 0'
    }

    return (
        <main id='pw-reset-form' className='pw-reset-form' style={mainBg}>
            <section id="section1">
                <div className="container">
                    <div className="title">
                        <h2 className='title-txt' style={title1}>MyAdmin</h2>
                        <h3 className='title-sub-txt' style={title2}>비밀번호 재설정</h3>
                    </div>
                    <div className="content sub6-content">
                        <form onSubmit={onSubmitReset} autoComplete='off'>
                            <ul>
                                <li>
                                    <div className="gap">       
                                        <label htmlFor="userNewPw">새 비밀번호 등록</label>                                 
                                        <input 
                                            type="password" 
                                            name='userNewPw'
                                            id='userNewPw'
                                            placeholder='새 비밀번호를 입력해주세요'
                                            value={state.newPw}
                                            onChange={onChangeNewPw}
                                            onFocus={onFocusPw1}
                                            onBlur={onBlurPw1}
                                            maxLength={16}
                                        />   
                                        {
                                            state.newPw !== '' &&
                                            (                                               
                                                <button className='delete-btn' onClick={(e)=>onClickDelNewPw(e, state.newPw)}><img src="./images/sub/sub6/icon_del.svg" alt="" /></button> 
                                            )
                                        }
                                    </div>
                                    {         
                                        state.guideBox1 &&
                                        (                                                                        
                                        <div className='guide-text-box'>
                                            <p className={state.pw1_guide_txt1 === null ? '' : (state.pw1_guide_txt1 === true ? 'red' : 'blue')}>10자 이상 입력</p>
                                            <p className={state.pw1_guide_txt2 === null ? '' : (state.pw1_guide_txt2 === true ? 'red' : 'blue')}>영문/숫자/특수문자(공백제외)만 허용하며, 2개이상 조합</p>
                                            <p className={state.pw1_guide_txt3 === null ? '' : (state.pw1_guide_txt3 === true ? 'red' : 'blue')}>동일한 숫자 3개이상 연속 사용 불가</p>
                                        </div>   
                                        )   
                                    }         
                                </li>
                                <li>
                                    <div className="gap"> 
                                        <label htmlFor="userPwCheck">새 비밀번호 확인</label>                                        
                                        <input 
                                            type="password"
                                            name='userPwCheck'
                                            id='userPwCheck' 
                                            placeholder='새 비밀번호를 한 번 더 입력해주세요'
                                            value={state.newPwCheck}
                                            onChange={onChangeNewPwCheck}
                                            onFocus={onFocusPw2}
                                            onBlur={onBlurPw2}
                                            maxLength={16}
                                        />  
                                        {
                                            state.newPwCheck !== '' &&
                                            (                         
                                                <button className='delete-btn' onClick={(e)=>onClickDelNewPw(e, state.newPwCheck)}><img src="./images/sub/sub6/icon_del.svg" alt="" /></button>                                             
                                            )
                                        }
                                    </div>
                                    {       
                                        state.guideBox2 &&
                                        (                                                                        
                                        <div className='guide-text-box'>
                                            <p className={state.pw2_guide_txt1 === null ? '' : (state.pw2_guide_txt1 === true ? 'red' : 'blue')}>동일한 비밀번호를 입력해주세요</p>
                                        </div>    
                                        ) 
                                    }
                                </li>
                                <li>
                                    <div className="gap">                                      
                                        <input 
                                            type="submit"
                                            name='submitBtn'
                                            id='submitBtn' 
                                            value={'확인'}
                                            className={state.submitBtn === true ? '' : 'on'}
                                            disabled={state.submitBtn}
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