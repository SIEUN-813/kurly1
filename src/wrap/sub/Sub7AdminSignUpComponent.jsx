import React from 'react';
import './scss/sub.scss';
import './scss/sub5.scss';
import './scss/sub7_signup.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isAddressAPIModal } from '../../reducer/isAddressAPIModal';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub7AdminSignUpComponent() {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate =  useNavigate();
    
    // redux dispatch confirmModalMethod 메서드 반복구현
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

    // onChange 이벤트 => 자신의 이벤트 구현
    // 상태변수 값 변경되면 => onChange 이벤트 => 자신의 이벤트 구현
    const[state, setState] = React.useState({
        id: '',
        idGuideText: '',
        idCheck: false,
        pw: '',
        pw1GuideText: '',
        pwCheck: '',
        pw2GuideText: '',
        name: '',
        nameGuideText: '',
        email: '',
        eamilGuideText: '',
        emailCheck: false,
        phone: '',
        isHpNum: false,
        isHpNum2: false,
        isHpNum3: true,
        authen: '', // 입력된인증번호
        sendAuthen: null, // 발급된인증번호
        phoneAuthen: false,
        address1: '',
        address2: '',    
        isAddress: false,
    });

    // 입력상자 키 입력 + 아이디, 이메일, 휴대폰 버튼 클릭 이벤트
    const onChangeId=(e)=>{
        const {value} = e.target;
        let id = '';
        let idGuideText = '';
        const regexp1 = /[`~!@#$%^&*()\-_+=[\]{}\\|:;"',.<>/?]/g;
        const regexp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
        const regexp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regexp4 = /\s/g;
        const regexp5 = /^(.){6,16}$/g;

        //아이디 = 입력문자열.replace(정규표현식, '');
        id = value.replace(regexp1, '');            
                                                                        
        //정규표현식.test(입력문자열) === false true 반환
        if(regexp2.test(value) === false || regexp3.test(value) === true || regexp4.test(value) === true || regexp5.test(value) === false){         
            idGuideText = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
        }
        else{
            idGuideText = '';
        }

        setState({
            ...state,
            id: id,
            idGuideText: idGuideText
        })
    }
    const onClickIdBtn=(e)=>{
        e.preventDefault();
        let value = state.id;
        let idGuideText = '';
        let idCheck = false;
        const regexp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;
        const regexp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regexp4 = /\s/g;
        const regexp5 = /^(.){6,16}$/g;

        if(regexp2.test(value) === false || regexp3.test(value) === true || regexp4.test(value) === true || regexp5.test(value) === false){         
            idGuideText = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
            idCheck = false;
            confirmModalMethod(idGuideText);
            setState({
                ...state,
                idCheck : idCheck
            })
        }
        else{
            const formData = new FormData();
            formData.append('adminId', state.id);
            axios({
                url: 'https://sieun.co.kr/kurly_green/kurly_admin_id_duplicate_check.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status===200){
                    if(res.data===0){          
                        idGuideText = '사용 할 수 있는 아이디입니다';
                        idCheck = true; 
                    }
                    else if(res.data===1){           
                        idGuideText = '사용 불가능한 아이디입니다';
                        idCheck = false;     
                    }                
                    confirmModalMethod(idGuideText);
                    setState({
                        ...state,
                        idCheck : idCheck
                    })
                }
            })
            .catch((err)=>{
                console.log('AXIOS 오류');
                console.log(err);
            });
        }
    }
    React.useEffect(()=>{
        //navigate('/index');
    },[])
    const onChangePw=(e)=>{
        const {value} = e.target;
        let pw1GuideText = '';
        const regexp1 = /^(.){10,16}$/g;
        const regexp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[`~!@#$%^&*()\-_+=[\]{}\\|:;"',.<>/?]+))|((?=.*[0-9])+(?=.*[`~!@#$%^&*()\-_+=[\]{}\\|:;"',.<>/?]+))/g;
        const regexp3 = /\s/g;
        const regexp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regexp5 = /(.)\1\1/g;

        if(regexp1.test(value) === false){
            pw1GuideText = '최소 10자 이상 입력';
        }
        else if(regexp2.test(value) === false || regexp3.test(value) === true || regexp4.test(value) === true){
            pw1GuideText = '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
        }
        else if(regexp5.test(value) === true){
            pw1GuideText = '동일한 숫자 3개 이상 연속 사용 불가';
        }
        else{
            pw1GuideText = '';
        }
        setState({
            ...state,
            pw: value,
            pw1GuideText: pw1GuideText
        })
    }
    const onChangePwCheck=(e)=>{
        const {value} = e.target;
        let pw2GuideText = '';
        if(value === ''){
            pw2GuideText = '비밀번호를 한번 더 입력해주세요';
        }
        else if(value !== state.pw){
            pw2GuideText = '동일한 비밀번호를 입력해주세요';
        }
        else{
            pw2GuideText = '';
        }
        setState({
            ...state,
            pwCheck: value,
            pw2GuideText: pw2GuideText
        })
    }
    const onChangeName=(e)=>{
        const {value} = e.target;
        let name = '';
        let nameGuideText = '';
        const regexp = /[`~!@#$%^&*()\-_+=[\]{}\\|:;"',.<>/?]/g;

        name = value.replace(regexp, '');

        if(value === ''){
            nameGuideText = '이름을 입력해주세요';
        }
        else{
            nameGuideText = '';
        }
        setState({
            ...state,
            name: name,
            nameGuideText: nameGuideText
        })
    }
    const onChangeEmail=(e)=>{
        const {value} = e.target;
        let emailGuideText = '';
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?]+((\.)?[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?]+)*@[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?.]+\.[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?.]+$/g;
        if(value === ''){
            emailGuideText = '이메일을 입력해주세요';
        }
        else if(regexp.test(value) === false){
            emailGuideText = '이메일 형식으로 입력해주세요';
        }
        else{
            emailGuideText = '';
        }
        setState({
            ...state,
            email: value,
            eamilGuideText: emailGuideText
        })
    }
    const onClickEmailBtn=(e)=>{
        e.preventDefault();
        const value = state.email;
        let emailGuideText = '';
        let emailCheck = false;
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?]+((\.)?[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?]+)*@[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?.]+\.[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?.]+$/g;
        if(value === ''){
            emailGuideText = '이메일을 입력해주세요';
            emailCheck = false;
            confirmModalMethod(emailGuideText);
            setState({
                ...state,
                emailCheck: emailCheck
            })
        }
        else if(regexp.test(value) === false){
            emailGuideText = '이메일 형식으로 입력해주세요';
            emailCheck = false;
            confirmModalMethod(emailGuideText);
            setState({
                ...state,
                emailCheck: emailCheck
            })
        }
        else{
            const formData = new FormData();
            formData.append('adminEmail', state.email)
            axios({
                url: 'https://sieun.co.kr/kurly_green/kurly_admin_email_duplicate_check.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status===200){
                    if(res.data===0){        
                        emailGuideText = '사용 할 수 있는 이메일입니다';
                        emailCheck = true;
                    }
                    else if(res.data===1){            
                        emailGuideText = '사용 불가능한 이메일입니다';
                        emailCheck = false;    
                    }
                    confirmModalMethod(emailGuideText);
                    setState({
                        ...state,
                        emailCheck: emailCheck
                    })
                }
            })
            .catch((err)=>{
                console.log('AXIOS 오류');
                console.log(err);
            })            
        }
    }
    const onChangeHp=(e)=>{
        let isHpNum = false;
        if(e.target.value.length > 0){
            isHpNum = true;
        }
        else{
            isHpNum = false;
        }
        setState({
            ...state,
            phone: e.target.value,
            isHpNum: isHpNum
        })
    }
    const onClickHpBtn=(e)=>{
        e.preventDefault();
        const regexp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g; 
        let num = null;
        let isHpNum = false;
        let isHpNum2 = false;
        let isHpNum3 = true;

        if(state.isHpNum3 === true){    
            num = Math.floor(Math.random() * 900000 + 100000); // * 900000 => 6자리 나올 수 있는 가장 큰 수, + 100000 => 무조건 6자리
            isHpNum = false;
            isHpNum2 = false;

            if(regexp.test(state.phone) === false){                
                confirmModalMethod('잘못된 휴대폰 번호입니다. 확인 후 다시 시도 해 주세요');
            }
            else{      
                confirmModalMethod(`인증번호가 발송되었습니다 ${num}`); 
                // 인증번호받기 버튼 사용불가로 변환, 아래에 인증번호 입력상자 보이기
                isHpNum = false;
                isHpNum2 = true;
            }
            setState({
                ...state,
                isHpNum: isHpNum,
                isHpNum2: isHpNum2,
                sendAuthen: num
            })
        }
        else{
            isHpNum3 = true;
            isHpNum = true;
            setState({
                ...state,
                phone: '',
                authen: '',
                isHpNum3: isHpNum3,
                isHpNum: isHpNum
            })
        }
    }
    const onChangeAuthen=(e)=>{
        setState({
            ...state,
            authen: e.target.value
        })
    }
    const onClickAuthenBtn=(e)=>{
        e.preventDefault();        
        let isHpNum = true;
        let isHpNum2 = false;
        let isHpNum3 = true;
        let phoneAuthen = false;

        if(state.sendAuthen === Number(state.authen)){ // Number() => 강제형변환으로 "" 제외하고 숫자만 비교 
            confirmModalMethod('인증에 성공하였습니다' );   
            // 다른인증번호입력 버튼으로 변경
            isHpNum2 = false; 
            isHpNum = true; 
            isHpNum3 = false;
            phoneAuthen = true;
        }
        else{
            confirmModalMethod('잘못된 인증코드입니다');   
            // 다시 인증번호 입력 대기
            isHpNum2 = true; 
            isHpNum = false; 
            isHpNum3 = true;
            phoneAuthen = false;
        }
        setState({
            ...state,
            isHpNum2: isHpNum2,
            isHpNum: isHpNum,
            isHpNum3: isHpNum3,
            phoneAuthen: phoneAuthen
        })
    }
    // redux 상태변수 값 주소1, 주소2 저장되면
    React.useEffect(()=>{
        // 페이지 이동 후 (setTimeout)
        setTimeout(()=>{
            // 회원가입폼 주소칸에 주소정보 들어가기
            if(selector.addressAPIModal.address.address1 !== '' && selector.addressAPIModal.address.address2 !== ''){
                return(
                    setState({
                        ...state,
                        address1: selector.addressAPIModal.address.address1,
                        address2: selector.addressAPIModal.address.address2,
                        isAddress: true
                    })
                )
            }
        }, 10);
    },[selector.addressAPIModal.address.address1, selector.addressAPIModal.address.address2]);
    const onClickAddressSearch=(e)=>{
        e.preventDefault();
        dispatch(isAddressAPIModal(true));
    }
    const onChangeAddress1=(e)=>{
        setState({
            ...state,
            address1: e.target.value
        })
    }
    const onChangeAddress2=(e)=>{
        setState({
            ...state,
            address2: e.target.value
        })
    }
    // 가입하기 버튼 클릭 시 입력한 폼 전송 => DATABASE 서버에 전송
    const onSubmitSignUpForm=(e)=>{
        e.preventDefault();
        
        if(state.id === ''){            
            confirmModalMethod('아이디를 입력하세요');
        }
        else if (state.idCheck === false){
            confirmModalMethod('아이디 중복확인 해주세요');
        }
        else if(state.pw === ''){
            confirmModalMethod('비밀번호를 입력하세요');
        }
        else if(state.pwCheck === ''){
            confirmModalMethod('비밀번호를 한 번 더 입력하세요');
        }
        else if(state.name === ''){
            confirmModalMethod('이름을 입력하세요');
        }
        else if(state.email === ''){
            confirmModalMethod('이메일을 입력하세요');
        }
        else if(state.emailCheck === false){
            confirmModalMethod('이메일 중복확인 해주세요');
        }
        else if(state.phone === ''){
            confirmModalMethod('휴대폰번호를 입력하세요');
        }
        else if(state.phoneAuthen === false){
            confirmModalMethod('휴대폰 인증번호 받기를 해주세요');
        }
        else if(state.address1 === ''){
            confirmModalMethod('주소를 검색해주세요');
        }
        else if(state.address2 === ''){
            confirmModalMethod('나머지 주소를 입력해주세요');
        }
        else{
            const regexp = /^(\d{3})(\d{3,4})(\d{4})$/g;

            const formData = new FormData();
            formData.append('adminId', state.id);
            formData.append('adminPw', state.pw);
            formData.append('adminName', state.name);
            formData.append('adminEmail', state.email);
            formData.append('adminPhone', state.phone.replace(regexp, '$1-$2-$3'));
            formData.append('adminAddress', `${state.address1}, ${state.address2}`);

            axios({
                url: 'https://sieun.co.kr/kurly_green/kurly_admin_signUp.php',
                method: 'POST',
                data: formData 
            })
            .then((res)=>{
                if(res.status===200){               
                    console.log( res.data );
                   if(res.data===1){           
                        confirmModalMethod('마켓컬리 관리자 회원가입을 진심으로 감사드립니다');
                   }
                   else{
                        confirmModalMethod('회원가입을 다시 시도해주세요');
                   }
                }
            })
            .catch((err)=>{
                console.log(`AXIOS 전송 실패 ${err}`);
            });
        }
    }

    React.useEffect(()=>{
        if(selector.confirmModal.signupOk === true){
            navigate('/index');
        }
    },[selector.confirmModal.signupOk])
    

    return (
        <main id='sub5' className='sub7-signup'>
            <section id="signUp">
                <div className="container">
                    <div className="title">
                        <h2 className='title-txt title1'>MyAdmin</h2>
                        <h4 className='title-txt title2'>회원가입</h4>
                        <div className="sub-title">
                            <h3>
                                <i>*</i>
                                <span>필수입력사항</span>
                            </h3>
                        </div>
                    </div>
                    <div className="content sub5-content">
                        <form onSubmit={onSubmitSignUpForm}>
                            <ul className='signup-form'>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">                                            
                                            <label htmlFor="adminId">
                                                <span>아이디</span>
                                                <i>*</i>
                                            </label>
                                        </div>
                                        <div className="input-box">                                            
                                            <input 
                                                type="text" 
                                                name='adminId' 
                                                id='adminId' 
                                                maxLength={16} 
                                                placeholder='아이디를 입력해주세요' 
                                                value={state.id} 
                                                onChange={onChangeId}
                                            />
                                        </div>
                                        <div className="right-box">
                                            <button onClick={onClickIdBtn}>중복확인</button>
                                        </div>
                                        <p className={`guide-text ${state.idGuideText !== '' ? ' on' : ''}`}>{state.idGuideText}</p>
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">                                            
                                            <label htmlFor="adminPw">
                                                <span>비밀번호</span>
                                                <i>*</i>
                                            </label>
                                        </div>
                                        <div className="input-box">  
                                            <input 
                                                type="password" 
                                                name='adminPw' 
                                                id='adminPw' 
                                                maxLength={16} 
                                                placeholder='비밀번호를 입력해주세요' 
                                                value={state.pw} 
                                                onChange={onChangePw}
                                            />
                                        </div>
                                        <p className={`guide-text ${state.pw1GuideText !== '' ? ' on' : ''}`}>{state.pw1GuideText}</p>
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">                                            
                                            <label htmlFor="adminPwCk">
                                                <span>비밀번호확인</span>
                                                <i>*</i>
                                            </label>
                                        </div>
                                        <div className="input-box">   
                                            <input 
                                            type="password" 
                                            name='adminPwCk' 
                                            id='adminPwCk' 
                                            maxLength={16} 
                                            placeholder='비밀번호를 한번 더 입력해주세요' 
                                            value={state.pwCheck}  
                                            onChange={onChangePwCheck}
                                        />
                                        </div>
                                        <p className={`guide-text ${state.pw2GuideText !== '' ? ' on' : ''}`}>{state.pw2GuideText}</p>
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">                                            
                                            <label htmlFor="adminName">
                                                <span>이름</span>
                                                <i>*</i>
                                            </label>
                                        </div>
                                        <div className="input-box">  
                                            <input 
                                                type="text" 
                                                name='adminName' 
                                                id='adminName' 
                                                placeholder='이름을 입력해주세요' 
                                                value={state.name} 
                                                onChange={onChangeName}
                                            />
                                        </div>
                                        <p className={`guide-text ${state.nameGuideText !== '' ? ' on' : ''}`}>{state.nameGuideText}</p>
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="left-box">                                            
                                            <label htmlFor="adminEmail">
                                                <span>이메일</span>
                                                <i>*</i>
                                            </label>
                                        </div>
                                        <div className="input-box">    
                                            <input 
                                                type="text" 
                                                name='adminEmail' 
                                                id='adminEmail' 
                                                placeholder='예: marketkurly@kurly.com' 
                                                value={state.email} 
                                                onChange={onChangeEmail}
                                            />
                                        </div>
                                        <div className="right-box">
                                            <button onClick={onClickEmailBtn}>중복확인</button>
                                        </div>
                                        <p className={`guide-text ${state.eamilGuideText !== '' ? ' on' : ''}`}>{state.eamilGuideText}</p>
                                    </div>
                                </li>
                                <li className='list hp1'>
                                    <div className="list-box">
                                        <div className="left-box">                                            
                                            <label htmlFor="adminHp">
                                                <span>휴대폰</span>
                                                <i>*</i>
                                            </label>
                                        </div>
                                        <div className="input-box">  
                                            <input 
                                                type="text" 
                                                name='adminHp' 
                                                id='adminHp' 
                                                maxLength={11} 
                                                placeholder='숫자만 입력해주세요' 
                                                value={state.phone}
                                                onChange={onChangeHp} 
                                            />
                                        </div>
                                        <div className="right-box">
                                            <button 
                                                className={`hp-btn${state.isHpNum ? '' : ' off'}`} 
                                                disabled={!state.isHpNum}
                                                onClick={onClickHpBtn}
                                            >{state.isHpNum3 ? '인증번호 받기' : '다른 번호인증'}</button>
                                        </div>
                                    </div>
                                </li>
                                {    
                                    state.isHpNum2 &&
                                    (                                      
                                    <>                   
                                        <li className='list hp2'>
                                            <div className="list-box">
                                                <div className="input-box"> 
                                                    <input 
                                                        type="text" 
                                                        name='adminHpAuthen' 
                                                        id='adminHpAuthen' 
                                                        placeholder='인증번호를 입력해주세요' 
                                                        value={state.authen} 
                                                        onChange={onChangeAuthen}
                                                    />
                                                    <span className='time-box'>
                                                        <em>03</em>
                                                        <em>00</em>
                                                    </span>
                                                </div>
                                                <div className="right-box">
                                                    <button onClick={onClickAuthenBtn}>인증번호 확인</button>
                                                </div>
                                            </div>
                                        </li>
                                        <li className='list hp3'>
                                            <div className="list-box">
                                                <p className='guide-text show'>인증번호가 오지 않는다면, 통신사 스팸 차단 서비스 혹은 휴대폰 번호 차단 여부를 확인해주세요. (컬리 1644-1107)</p>
                                            </div>
                                        </li> 
                                    </>    
                                    )
                                }
                                <li className='list address1'>
                                    <div className="list-box">
                                        <div className="left-box">                                            
                                            <label htmlFor="">
                                                <span>주소</span>
                                                <i>*</i>
                                            </label>
                                        </div>
                                        <div className="input-box">  
                                        {          
                                            !state.isAddress && 
                                            (                                                                                  
                                            <button className='address-search-btn' onClick={onClickAddressSearch}>주소검색</button>   
                                            )   
                                        }
                                        {        
                                            state.isAddress &&
                                            (                                 
                                            <input 
                                                type="text" 
                                                name='adminAddress1' 
                                                id='adminAddress1' 
                                                placeholder='주소를 입력해주세요' 
                                                value={state.address1} 
                                                onChange={onChangeAddress1}
                                            />                                                
                                            )   
                                        }
                                        </div>
                                        <div className="right-box">
                                            {              
                                                state.isAddress &&
                                                (                              
                                                <button className='' onClick={onClickAddressSearch}>재검색</button>                                                     
                                                )    
                                            }
                                        </div>
                                    </div>
                                </li>
                                {
                                    state.isAddress &&
                                    (                                       
                                    <>
                                        <li className='list address2'>
                                            <div className="list-box">
                                                <div className="input-box">  
                                                    <input 
                                                        type="text" 
                                                        name='adminAddress2' 
                                                        id='adminAddress2' 
                                                        placeholder='나머지 주소를 입력해주세요' 
                                                        value={state.address2}
                                                        onChange={onChangeAddress2}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                        <li className='list address3'>
                                            <div className="list-box">
                                                <p className='guid-text show'>
                                                    <strong>샛별배송</strong>
                                                    배송지에 따라 상품 정보가 달라질 수 있습니다.
                                                </p>
                                            </div>
                                        </li>
                                    </> 
                                    )
                                }
                            </ul>
                            <div className="button-box">
                                <button type='submit'>가입하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
};