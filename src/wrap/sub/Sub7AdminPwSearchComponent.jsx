import React from 'react';
import axios from 'axios';
import './scss/sub6_id_pw_search.scss'
import './scss/sub6.scss'
import { useDispatch } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';
import { useNavigate } from 'react-router-dom';

export default function Sub7AdminPwSearchComponent() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const [state, setState] = React.useState({
        isHp: true,
        isEmail: false,
        id: '',
        isIdGuideText: false,
        phone: '',
        isPhoneGuideText: false,
        receiveAuthen: null,
        hpAuthen: '',
        isAuthenNumberHpBox: false,
        email: '',
        isEmailGuideText: false,
        isEnable1: false,
        isEnable2: false,
    })
    
    const [count, setCount] = React.useState({
        M: 3,
        S: 0,
        setId: 0
    })

    const onClickTab=(e, parameter)=>{
        e.preventDefault();
        let isHp = state.isHp;
        let isEmail = state.isEmail;
        if(parameter === 'phoneAuthen'){
            isHp = true;
            isEmail = false;
        }
        else if(parameter === 'emailAuthen'){
            isHp = false;
            isEmail = true;
        }
        setState({
            ...state,
            isHp: isHp,
            isEmail: isEmail
        })
    }

    const onchangeId=(e)=>{
        let isIdGuideText = false;
        if(e.target.value === ''){
            isIdGuideText = true;
        }
        else{
            isIdGuideText = false;
        }
        setState({
            ...state,
            id: e.target.value,
            isIdGuideText: isIdGuideText
        })
    }
    const onClickDelId=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            id: ''
        })
    }

    const onchangePhone=(e)=>{
        const regexp1 = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g; 
        const regexp2 = /[^\d]/g;
        let phone = '';
        let isPhoneGuideText = false;

        phone = e.target.value.replace(regexp2, '');
        if(e.target.value === '' || regexp1.test(phone) === false){
            isPhoneGuideText = true;
        }
        else{            
            isPhoneGuideText = false;
        }
        setState({
            ...state,
            phone: phone,
            isPhoneGuideText: isPhoneGuideText
        });
    }
    const onClickDelPhone=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            phone: ''
        })
    }

    // 이름, 휴대폰번호 입력이 완료되면 버튼 동작 이벤트
    React.useEffect(()=>{
        const regexp1 = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g; 
        let isEnable1 = false;
        if(regexp1.test(state.phone) === true && state.id !== ''){
            isEnable1 = true;
        }
        else{
            isEnable1 = false;
        }
        setState({
            ...state,
            isEnable1: isEnable1
        });
        return;
    },[state.id, state.phone])

    const onchangeEmail=(e)=>{
        const regexp1 = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?]+((\.)?[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?]+)*@[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?.]+\.[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?.]+$/g;
        let isEmailGuideText = false;
        let isEnable2 = false;
        if(e.target.value === '' || regexp1.test(e.target.value) === false){
            isEmailGuideText = true;
            isEnable2 = false;
        }
        else{
            isEmailGuideText = false;
            isEnable2 = true;
        }
        setState({
            ...state,
            email: e.target.value,        
            isEmailGuideText: isEmailGuideText,
            isEnable2: isEnable2
        })
    }
    const onClickDelEmail=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            email: ''
        })
    }

    // 이름, 이메일 입력이 완료되면 버튼 동작 이벤트
    React.useEffect(()=>{
        const regexp1 = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?]+((\.)?[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?]+)*@[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?.]+\.[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?.]+$/g;
        let isEnable2 = false;
        if(regexp1.test(state.email) === true && state.id !== ''){
            isEnable2 = true;
        }
        else{
            isEnable2 = false;
        }
        setState({
            ...state,
            isEnable2: isEnable2
        });
        return;
    },[state.id, state.email])

    const onSubmitPwSearch=(e)=>{
        e.preventDefault();
        const regexp = /^(\d{3})(\d{3,4})(\d{4})$/g;
        let formData = new FormData();
        formData.append('adminId', state.id)
        formData.append('adminPhone', state.phone.replace(regexp, '$1-$2-$3'));
        axios({
            url: 'https://sieun.co.kr/kurly_green/kurly_admin_pw_search_id_hp_select.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.data===1){
                if(res.data === ''){
                    confirmModalMethod('가입 시 입력하신 회원 정보가 맞는지 다시 한번 확인해주세요');
                }
                else{
                    // 가입된 회원만 인증번호발급                
                    const regexp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g; 
                    let num = 0;
                    num = Math.floor(Math.random() * 9000000 + 1000000); 
    
                    if(regexp.test(state.phone) === false){                
                        confirmModalMethod('잘못된 휴대폰 번호입니다. 확인 후 다시 시도 해 주세요');
                    }
                    else{      
                        confirmModalMethod(`인증번호가 발송되었습니다. ${num}`); 
                        clearInterval(count.setId);      
                        timer3MinutesCount();
                    }
                    setState({
                        ...state,
                        receiveAuthen: num,
                        isAuthenNumberHpBox: true
                    })         
                }
            }
            else{
                confirmModalMethod('가입회원 정보를 확인하고 다시 시도하세요');
            }
        })
        .catch((err)=>{
            console.log('AXIOS 전송 실패');
            console.log(err);
        })
    }
    
    const onchangeAuthenNum=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            hpAuthen: e.target.value
        })
    }

    const onClickOkBtn=(e)=>{
        e.preventDefault();
        if(Number(state.hpAuthen) === state.receiveAuthen){
            // 키보드로 인증번호 입력 후 => 인증번호 입력상자 아래 확인 버튼 클릭 => 발급된 인증번호와 비교 => 비밀번호재설정컴포넌트로 이동
            const regexp = /^(\d{3})(\d{3,4})(\d{4})$/g;
            navigate('/sub7AdminPwReset',
                {                  
                    state: {
                        id: state.id,
                        phone: state.phone.replace(regexp, '$1-$2-$3')
                    }            
                }
            );   
        }
        else{
            confirmModalMethod('인증번호를 다시 확인하세요');
        }
    }
    
    // 3분 카운트타이머 
    const timer3MinutesCount=()=>{
        let m = 3; // 3분간 타이머
        let M = 0; // 분 변수
        let S = 0; // 초 변수
        let now = new Date(); // 현재날짜시간
        let endTime = now.setMinutes(now.getMinutes() + m);
        let setId = 0;
        // 1초에 한 번씩 현재날짜시간 가져와서 endTime 에서 현재시간 빼면 남은 시간 나옴
        setId = setInterval(()=>{
            now = new Date();
            const currentTime = endTime - now;
            if(now >= endTime){
                clearInterval(setId);
                M=0;
                S=0;
            }
            else{
                M = Math.floor(currentTime/(60*1000)) % 3;
                S = Math.floor(currentTime/(1000)) % 60;
            }
            setCount({
                ...count,
                M: M < 10 ? `0${M}` : M,
                S: S < 10 ? `0${S}` : S,
                setId: setId
            })      
        },1000);
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
        <main id='sub6IdSearch' className='id-pw-search' style={mainBg}>
        <section id="section1">
            <div className="container">
                <div className="title">
                    <h2 className='title-txt' style={title1}>MyAdmin</h2>
                    <h3 className='title-sub-txt' style={title2}>비밀번호 찾기</h3>
                </div>
                <div className="content sub6-content">
                    <div className="tab-button-box">
                        <button onClick={(e)=>onClickTab(e, 'phoneAuthen')} className={`${state.isHp ? ' on' : ''}`}>휴대폰 인증</button>
                        <button onClick={(e)=>onClickTab(e, 'emailAuthen')} className={`${state.isEmail ? ' on' : ''}`}>이메일 인증</button>
                    </div>
                    {
                        state.isHp &&
                        (                     
                        <form id='hpAuthen' autoComplete='off' onSubmit={onSubmitPwSearch}>
                            <ul>
                                <li>
                                    <div className="gap">
                                        <label htmlFor="userName">아이디</label>        
                                        <input 
                                            type="text" 
                                            name='userId'
                                            id='userId'
                                            placeholder='아이디를 입력해주세요'
                                            onChange={onchangeId}
                                            value={state.id}
                                        />    
                                        {
                                            state.id !== '' &&
                                            ( 
                                            <button className='delete-btn' onClick={onClickDelId}><img src="./images/sub/sub6/icon_del.svg" alt="" /></button>
                                            )
                                        }
                                    </div>
                                    <p className={`guide-text${state.isIdGuideText ? ' on' : ''}`}>가입 시 등록한 아이디를 입력해주세요</p>
                                </li>
                                <li>
                                    <div className="gap">  
                                        <label htmlFor="userName">휴대폰번호</label>                                             
                                        <input 
                                            type="text"
                                            name='userHp'
                                            id='userHp' 
                                            placeholder='휴대폰번호를 입력해주세요'
                                            maxLength={11}
                                            onChange={onchangePhone}
                                            value={state.phone}
                                        />   
                                        {
                                            state.phone !== '' &&
                                            ( 
                                            <button className='delete-btn' onClick={onClickDelPhone}><img src="./images/sub/sub6/icon_del.svg" alt="" /></button>
                                            )
                                        }
                                    </div>
                                    <p className={`guide-text${state.isPhoneGuideText ? ' on' : ''}`}>가입 시 등록한 휴대폰번호를 입력해주세요</p>
                                </li>
                                {
                                    state.isAuthenNumberHpBox &&
                                    (   
                                    <>                                                                    
                                        <li>
                                            <div className="gap authen-number">  
                                                <label htmlFor="userAuthenNum">인증번호</label>     
                                                <div className="box">                                      
                                                    <input 
                                                        type="text"
                                                        name='userAuthenNum'
                                                        id='userAuthenNum' 
                                                        placeholder='인증번호 7자리'
                                                        maxLength={7}
                                                        onChange={onchangeAuthenNum}
                                                        value={state.hpAuthen}
                                                    />   
                                                    <button onClick={onSubmitPwSearch}>재발송</button>   
                                                </div>                                       
                                                <span className='time-box'>
                                                    <em>{count.M}</em>
                                                    <em>:</em>
                                                    <em>{count.S}</em>
                                                </span>
                                            </div>
                                            <p className={`guide-text${state.isPhoneGuideText ? ' on' : ''}`}>인증번호를 입력해주세요</p>
                                        </li>                                          
                                        <li>
                                        <div className="gap">                                      
                                            <input 
                                                type="button"
                                                name='okBtn'
                                                id='okBtn' 
                                                className={state.isEnable1 ? '' : 'off'}
                                                disabled={!state.isEnable1}
                                                value={'확인'}
                                                onClick={onClickOkBtn}
                                            />   
                                        </div>
                                        </li>
                                    </> 
                                    )  
                                }
                                {    
                                    state.receiveAuthen === null &&
                                    (                                        
                                    <li>
                                        <div className="gap">                                      
                                            <input 
                                                type="submit"
                                                name='submitBtn'
                                                id='submitBtn' 
                                                className={state.isEnable1 ? '' : 'off'}
                                                disabled={!state.isEnable1}
                                                value={'인증번호받기'}
                                            />   
                                        </div>
                                    </li>
                                    )
                                }
                            </ul>                     
                        </form>   
                        )
                    }
                    {
                        state.isEmail &&
                        (                        
                        <form id='emailAuthen' autoComplete='off'>
                            <ul>
                                <li>
                                    <div className="gap">
                                        <label htmlFor="userName">아이디</label>        
                                        <input 
                                            type="text" 
                                            name='userId'
                                            id='userId'
                                            placeholder='아이디를 입력해주세요'
                                            onChange={onchangeId}
                                            value={state.id}
                                        />    
                                        {
                                            state.id !== '' &&
                                            ( 
                                            <button className='delete-btn' onClick={onClickDelId}><img src="./images/sub/sub6/icon_del.svg" alt="" /></button>
                                            )
                                        }
                                    </div>
                                    <p className={`guide-text${state.isIdGuideText ? ' on' : ''}`}>가입 시 등록한 아이디를 입력해주세요</p>
                                </li>
                                <li>
                                    <div className="gap">  
                                        <label htmlFor="userEmail">이메일</label>                                        
                                        <input 
                                            type="text"
                                            name='userEmail'
                                            id='userEmail' 
                                            placeholder='이메일을 입력해주세요'
                                            onChange={onchangeEmail}
                                            value={state.email}
                                        />   
                                        {
                                            state.email !== '' &&
                                            ( 
                                            <button className='delete-btn' onClick={onClickDelEmail}><img src="./images/sub/sub6/icon_del.svg" alt="" /></button>
                                            )
                                        }
                                    </div>
                                    <p className={`guide-text${state.isEmailGuideText ? ' on' : ''}`}>가입 시 등록한 이메일을 입력해주세요</p>
                                </li>
                                <li>
                                    <div className="gap">                                      
                                        <input 
                                            type="submit"
                                            name='submitBtn'
                                            id='submitBtn' 
                                            className={state.isEnable2 ? '' : 'off'}
                                            disabled={!state.isEnable2}
                                            value={'확인'}
                                        />   
                                    </div>
                                </li>
                            </ul>                     
                        </form>  
                        )
                    }
                </div>
            </div>
        </section>
        </main>
    );
};