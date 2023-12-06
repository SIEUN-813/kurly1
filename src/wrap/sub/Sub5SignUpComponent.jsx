import React from 'react';
import './scss/sub.scss'
import './scss/sub5.scss'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isAddressAPIModal } from '../../reducer/isAddressAPIModal';
import { confirmModal } from '../../reducer/confirmModal';
import { confirmService1Modal } from '../../reducer/confirmService1Modal';
import { confirmService2Modal } from '../../reducer/confirmService2Modal';
import { confirmService3Modal } from '../../reducer/confirmService3Modal';

export default function Sub5SignUpComponent() {

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
        gender: '선택안함',
        birthYear:'',
        birthMonth:'',
        birthDay:'',
        birthGuideText: '',
        addInput: '',
        isUserAddId: false,
        recommendId: '',
        recommendIdCheck: false,
        isUserAddEvent: false,     
        eventName: '',   
        serviceAll: [ // 이용약관
            '이용약관 동의(필수)', 
            '개인정보 수집∙이용 동의(필수)', 
            '개인정보 수집∙이용 동의(선택)',
            '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)', 
            'SNS', 
            '이메일',
            '본인은 만 14세 이상입니다.(필수)'
        ],        
        serviceAgree: [], // 이용약관동의
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
            formData.append('userId', state.id);
            axios({
                url: 'https://sieun.co.kr/kurly_green/kurly_id_duplicate_check.php',
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
            formData.append('userEmail', state.email)
            axios({
                url: 'https://sieun.co.kr/kurly_green/kurly_email_duplicate_check.php',
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
    const onChangeGender=(e)=>{
        setState({
            ...state,
            gender: e.target.value
        })
    }
    // 생년월일 모두 입력이 되면
    React.useEffect(()=>{
        let birthGuideText = '';
        
        if(state.birthYear === '' && state.birthMonth === '' && state.birthDay === ''){  
            birthGuideText = '';
        }   
        else{
            if(state.birthYear.length < 4){
                birthGuideText = '태어난 년도 4자리를 정확하게 입력해주세요.';
            }
            else if(state.birthYear <= (new Date().getFullYear() - 100)){ 
                birthGuideText = '생년월일을 다시 확인해주세요.';
            }
            else if(Number(state.birthYear) > (new Date().getFullYear())){   
                birthGuideText = '생년월일이 미래로 입력되었습니다.';
            } 
            else{           
                if(state.birthMonth < 1 || state.birthMonth > 12){  
                    birthGuideText = '태어난 월을 정확하게 입력해주세요.';
                }   
                else{        
                    if(state.birthDay < 1 || state.birthDay > 31){  
                        birthGuideText = '태어난 일을 정확하게 입력해주세요.';
                    }         
                    else{ 
                        if(Number(state.birthYear) === (new Date().getFullYear())-14){                             
                            if(Number(state.birthMonth) === (new Date().getMonth() + 1)){  
                                if(Number(state.birthDay) > (new Date().getDate())){
                                    birthGuideText = '만 14세 미만은 가입이 불가합니다.';
                                }
                                else{   
                                    birthGuideText = '';                          
                                }
                            }
                            else if(Number(state.birthMonth) > (new Date().getMonth() + 1)){
                                birthGuideText = '만 14세 미만은 가입이 불가합니다.';
                            }
                        }
                        else if(Number(state.birthYear) > (new Date().getFullYear())-14){  
                            birthGuideText = '만 14세 미만은 가입이 불가합니다.';
                        }
                        else{
                            birthGuideText = '';
                        }
                    }  
                }  
            }
        }
        setState({
            ...state,
            birthGuideText: birthGuideText
        })
    },[state.birthYear, state.birthMonth, state.birthDay]);    
    const onChangeBirthYear=(e)=>{
        const regexp1 = /[^0-9]/g;
        let birthYear = e.target.value.replace(regexp1, '');        
        setState({
            ...state,
            birthYear: birthYear
        });
    }
    const onChangeBirthMonth=(e)=>{
        const regexp1 = /[^0-9]/g;
        let birthMonth = e.target.value.replace(regexp1, '');
        setState({
            ...state,
            birthMonth: birthMonth
        });
    }
    const onChangeBirthDay=(e)=>{
        const regexp1 = /[^0-9]/g;
        let birthMonth = e.target.value.replace(regexp1, '');
        setState({
            ...state,
            birthDay: birthMonth
        });
    }    
    const onChangeRecommendId=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            recommendId: e.target.value
        })
    }
    const onClickIdCheck=(e)=>{
        e.preventDefault();
        let recommendIdCheck = false;
        let idGuideText = '';
        const formData = new FormData();
        formData.append('userId', state.recommendId);
        axios({
            url: 'https://sieun.co.kr/kurly_green/kurly_id_check.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status===200){
                if(res.data===0){        
                    idGuideText = '존재하지 않는 아이디입니다';
                    recommendIdCheck = false;
                }
                else if(res.data===1){            
                    idGuideText = '존재하는 아이디입니다 친구초대 이벤트에 참여 가능해요';   
                    recommendIdCheck = true;
                }
                confirmModalMethod(idGuideText); 
                setState({
                    ...state,
                    recommendIdCheck: recommendIdCheck
                }) 
            }
        })
        .catch((err)=>{
            console.log('AXIOS 오류');
            console.log(err);
        })        
    }
    const onChangeEventName=(e)=>{
        setState({
            ...state,
            eventName: e.target.value
        })
    }    
    const onChangeAdd=(e)=>{
        setState({
            ...state,
            addInput: e.target.value
        })
    }
    // 추가입력사항 값 변경시 즉시 동작 이벤트
    React.useEffect(()=>{
        let isUserAddId = false;
        let isUserAddEvent = false;
        if(state.addInput === "친구초대 추천인 아이디"){
            isUserAddId = true;
            isUserAddEvent = false;
        }
        else if(state.addInput === "참여 이벤트명"){
            isUserAddId = false;
            isUserAddEvent = true;
        }
        setState({
            ...state,
            isUserAddId: isUserAddId,
            isUserAddEvent: isUserAddEvent
        })
    },[state.addInput]);
    const onChangeServiceCheck=(e)=>{
        let serviceAgree = state.serviceAgree;
        // 체크 시 값 저장
        if(e.target.checked === true){
            if(e.target.value === '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
                // 중복 저장 방지
                if(serviceAgree.includes('SNS') === false && serviceAgree.includes('이메일') === false){                    
                    serviceAgree = [...serviceAgree, e.target.value, 'SNS', '이메일']
                }
                else if(serviceAgree.includes('SNS') === true && serviceAgree.includes('이메일') === false){                  
                    serviceAgree = [...serviceAgree, e.target.value, '이메일']
                }
                else if(serviceAgree.includes('SNS') === false && serviceAgree.includes('이메일') === true){                                      
                    serviceAgree = [...serviceAgree, e.target.value, 'SNS']
                }
            }
            else if(e.target.value === 'SNS'){
                if(serviceAgree.includes('이메일') === true){
                    serviceAgree = [...serviceAgree, e.target.value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'];
                }
                else{
                    serviceAgree = [...serviceAgree, e.target.value];
                }
            }
            else if(e.target.value === '이메일'){
                if(serviceAgree.includes('SNS') === true){
                    serviceAgree = [...serviceAgree, e.target.value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'];
                }
                else{
                    serviceAgree = [...serviceAgree, e.target.value];
                }
            }
            else{                
                serviceAgree = [...serviceAgree, e.target.value]
            }
        }
        // 체크해제 시 값 삭제 => 현재 선택된 항목만 제외 모두 저장
        else{
            let arr = state.serviceAgree;
            if(e.target.value === '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
                arr = arr.filter((item)=>item !== e.target.value);
                arr = arr.filter((item)=>item !== 'SNS');
                arr = arr.filter((item)=>item !== '이메일');
                serviceAgree = arr;
            }   
            else if(e.target.value === 'SNS' || e.target.value === '이메일'){
                arr = arr.filter((item)=>item !== e.target.value);
                arr = arr.filter((item)=>item !== '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
                serviceAgree = arr;
            }   
            else{                
                serviceAgree = serviceAgree.filter((item)=>item !== e.target.value);
            }
        }
        setState({
            ...state,
            serviceAgree: serviceAgree
        })
    }
    const onChangeServiceAll=(e)=>{
        let serviceAgree = [];
        if(e.target.checked){
            serviceAgree = state.serviceAll;
        }
        else{
            serviceAgree = [];
        }
        setState({
            ...state,
            serviceAgree: serviceAgree
        })
    }
    const onClickService1Modal=(e)=>{
        e.preventDefault();
        dispatch(confirmService1Modal(true));
    }
    const onClickService2Modal=(e)=>{
        e.preventDefault();
        dispatch(confirmService2Modal(true));
    }
    const onClickService3Modal=(e)=>{
        e.preventDefault();
        dispatch(confirmService3Modal(true));
    }
    // 가입하기 버튼 클릭 시 입력한 폼 전송 => DATABASE 서버에 전송
    const onSubmitSignUpForm=(e)=>{
        e.preventDefault();

        // 필수 이용약관동의 항목 카운트
        let cnt = 0;
        state.serviceAgree.map((item)=>{
            if(item.includes('필수')){
                cnt++;
            }
        });
        
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
        else if(cnt < 3){
            confirmModalMethod('필수 이용약관동의에 체크해주세요');
        }
        else{
            const regexp = /^(\d{3})(\d{3,4})(\d{4})$/g;

            const formData = new FormData();
            formData.append('userId', state.id);
            formData.append('userPw', state.pw);
            formData.append('userName', state.name);
            formData.append('userEmail', state.email);
            formData.append('userPhone', state.phone.replace(regexp, '$1-$2-$3'));
            formData.append('userAddress', `${state.address1}, ${state.address2}`);
            formData.append('userGender', state.gender);
            formData.append('userBirth', `${state.birthYear}-${state.birthMonth}-${state.birthDay}`);
            formData.append('userAddInput', `${state.addInput} ${state.recommendId} ${state.recommendIdCheck} ${state.eventName}`);
            formData.append('userServiceAgree', state.serviceAgree);

            axios({
                url: 'https://sieun.co.kr/kurly_green/kurly_insert.php',
                method: 'POST',
                data: formData // 클라이언트가 서버한테 정보 요청
            })
            .then((res)=>{
                //console.log(`AXIOS 전송 성공 ${res}`);
                if(res.status===200){               
                    console.log( res.data ); // 서버가 클라이언트한테 정보 응답
                    /*
                    // 회원가입 완료되면 intro 페이지로 이동하는 라우터 네비게이션 구현 => kurly_insert.php 에서 echo = res.data
                    if(res.data===1){
                        navigate('/index');
                    }
                    else if(res.data===0){
                        confirmModalMethod('회원가입을 다시 시도해주세요');
                    }
                    */
                   // 회원가입 완료되면 => 가입축하인사 컨펌모달창 뜨고 => 컨펌모달창 닫으면 => 인트로페이지로 이동하는 네비게이션 구현
                   if(res.data===1){           
                        confirmModalMethod('마켓컬리 회원가입을 진심으로 감사드립니다');
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
    // 회원가입 버튼 클릭시 => redux에 signupOk 변수값 true 이면 => intro페이지로 이동
    React.useEffect(()=>{
        if(selector.confirmModal.signupOk === true){
            navigate('/index');
        }
    },[selector.confirmModal.signupOk])
    

    return (
        <main id='sub5' className='sub'>
            <section id="signUp">
                <div className="container">
                    <div className="title">
                        <h2 className='title-txt'>회원가입</h2>
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
                                            <label htmlFor="userId">
                                                <span>아이디</span>
                                                <i>*</i>
                                            </label>
                                        </div>
                                        <div className="input-box">                                            
                                            <input 
                                                type="text" 
                                                name='userId' 
                                                id='userId' 
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
                                            <label htmlFor="userPw">
                                                <span>비밀번호</span>
                                                <i>*</i>
                                            </label>
                                        </div>
                                        <div className="input-box">  
                                            <input 
                                                type="password" 
                                                name='userPw' 
                                                id='userPw' 
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
                                            <label htmlFor="userPwCk">
                                                <span>비밀번호확인</span>
                                                <i>*</i>
                                            </label>
                                        </div>
                                        <div className="input-box">   
                                            <input 
                                            type="password" 
                                            name='userPwCk' 
                                            id='userPwCk' 
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
                                            <label htmlFor="userName">
                                                <span>이름</span>
                                                <i>*</i>
                                            </label>
                                        </div>
                                        <div className="input-box">  
                                            <input 
                                                type="text" 
                                                name='userName' 
                                                id='userName' 
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
                                            <label htmlFor="userEmail">
                                                <span>이메일</span>
                                                <i>*</i>
                                            </label>
                                        </div>
                                        <div className="input-box">    
                                            <input 
                                                type="text" 
                                                name='userEmail' 
                                                id='userEmail' 
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
                                            <label htmlFor="userHp">
                                                <span>휴대폰</span>
                                                <i>*</i>
                                            </label>
                                        </div>
                                        <div className="input-box">  
                                            <input 
                                                type="text" 
                                                name='userHp' 
                                                id='userHp' 
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
                                                        name='userHpAuthen' 
                                                        id='userHpAuthen' 
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
                                                name='userAddress1' 
                                                id='userAddress1' 
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
                                                        name='userAddress2' 
                                                        id='userAddress2' 
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
                                <li className='list radio gender'>
                                    <div className="list-box">
                                        <div className="left-box">                                            
                                            <label>
                                                <span>성별</span>
                                            </label>
                                        </div>
                                        <div className="input-box">  
                                            <label htmlFor="userMale">                                                
                                                <input 
                                                    type="radio" 
                                                    name='userGender' 
                                                    id='userMale' 
                                                    value={'남자'} 
                                                    onChange={onChangeGender}
                                                    checked={state.gender.includes('남자')}
                                                />
                                                <span>남자</span>
                                            </label>
                                            <label htmlFor="userFemale"> 
                                                <input 
                                                    type="radio" 
                                                    name='userGender' 
                                                    id='userFemale' 
                                                    value={'여자'} 
                                                    onChange={onChangeGender}
                                                    checked={state.gender.includes('여자')}
                                                />
                                                <span>여자</span>
                                            </label>
                                            <label htmlFor="userNone"> 
                                                <input 
                                                    type="radio" 
                                                    name='userGender' 
                                                    id='userNone' 
                                                    value={'선택안함'} 
                                                    //defaultChecked
                                                    onChange={onChangeGender}
                                                    checked={state.gender.includes('선택안함')}
                                                />
                                                <span>선택안함</span>
                                            </label>
                                        </div>
                                    </div>
                                </li>                                
                                <li className='list birth'>
                                    <div className="list-box">
                                        <div className="left-box">                                            
                                            <label htmlFor="userYear">
                                                <span>생년월일</span>
                                            </label>
                                        </div>
                                        <div className="input-box">    
                                            <ul>
                                                <li>
                                                    <input 
                                                        type="text" 
                                                        name='userYear' 
                                                        id='userYear' 
                                                        maxLength={4} 
                                                        placeholder='YYYY' 
                                                        value={state.birthYear} 
                                                        onChange={onChangeBirthYear}
                                                    />
                                                </li>
                                                <li><i>/</i></li>
                                                <li>
                                                    <input 
                                                        type="text" 
                                                        name='userMonth' 
                                                        id='userMonth' 
                                                        maxLength={2} 
                                                        placeholder='MM' 
                                                        value={state.birthMonth} 
                                                        onChange={onChangeBirthMonth}
                                                        />
                                                    </li>
                                                <li><i>/</i></li>
                                                <li>
                                                    <input 
                                                        type="text" 
                                                        name='userDay' 
                                                        id='userDay' 
                                                        maxLength={2} 
                                                        placeholder='DD' 
                                                        value={state.birthDay} 
                                                        onChange={onChangeBirthDay}
                                                        />
                                                </li>
                                            </ul>
                                            
                                        </div>
                                        <p className={`guide-text ${state.birthGuideText !== '' ? ' on' : ''}`}>{state.birthGuideText}</p>
                                    </div>
                                </li>
                                <li className='list radio add'>
                                    <div className="list-box">
                                        <div className="left-box">                                            
                                            <label>
                                                <span>추가입력 사항</span>
                                            </label>
                                        </div>
                                        <div className="input-box">  
                                            <label htmlFor="userAdd1"> 
                                                <input 
                                                    type="radio" 
                                                    name='userAdd' 
                                                    id='userAdd1' 
                                                    value={'친구초대 추천인 아이디'} 
                                                    onChange={onChangeAdd}
                                                    checked={state.addInput.includes('친구초대 추천인 아이디')}
                                                />
                                                <span>친구초대 추천인 아이디</span>
                                            </label>
                                            <label htmlFor="userAdd2"> 
                                                <input 
                                                    type="radio" 
                                                    name='userAdd' 
                                                    id='userAdd2' 
                                                    value={'참여 이벤트명'} 
                                                    onChange={onChangeAdd}
                                                    checked={state.addInput.includes('참여 이벤트명')}
                                                />
                                                <span>참여 이벤트명</span>
                                            </label>
                                        </div>
                                    </div>
                                </li>
                                {
                                    state.isUserAddId &&
                                    (
                                    <li className='list add userAddId'>
                                        <div className="list-box">
                                            <div className="input-box">  
                                                <input 
                                                    type="text" 
                                                    name='userAddId' 
                                                    id='userAddId' 
                                                    placeholder='추천인 아이디를 입력해주세요' 
                                                    value={state.recommendId} 
                                                    onChange={onChangeRecommendId}
                                                />
                                            </div>
                                            <p className='guide-text show'>가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.</p>                                        
                                            <div className="right-box">
                                                <button onClick={onClickIdCheck}>아이디 확인</button> 
                                            </div>
                                        </div>
                                    </li>                                         
                                    )                                  
                                }
                                {
                                    state.isUserAddEvent &&
                                    (                                        
                                    <li className='list add userAddEvent'>
                                        <div className="list-box">
                                            <div className="input-box">  
                                                <input 
                                                    type="text" 
                                                    name='userAddEvent' 
                                                    id='userAddEvent' 
                                                    placeholder='참여 이벤트명을 입력해주세요' 
                                                    value={state.eventName} 
                                                    onChange={onChangeEventName}
                                            />
                                            </div>
                                            <p className='guide-text show'>
                                                추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br/>
                                                가입 이후는 수정이 불가능 합니다.<br/>
                                                대소문자 및 띄어쓰기에 유의해주세요.
                                            </p>           
                                        </div>
                                    </li>    
                                    )                              
                                }
                                <li className='list hr'>
                                    <div className="list-box">
                                        <hr />
                                    </div>
                                </li>
                                
                                <li className='list service service1'>
                                    <div className="list-box">
                                        <div className="left-box">                                            
                                            <label>
                                                <span>이용약관동의</span>
                                                <i>*</i>
                                            </label>
                                        </div>
                                        <div className="input-box">  
                                            <label htmlFor="userServiceAll"> 
                                                <input 
                                                    type="checkbox" 
                                                    name='userService' 
                                                    id='userServiceAll' 
                                                    value={'전체 동의합니다'} 
                                                    onChange={onChangeServiceAll}
                                                    checked={state.serviceAgree.length===7}
                                                />
                                                <span>전체 동의합니다.</span>
                                            </label>
                                        </div>
                                        <p className='guide-text show'>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>  
                                    </div>
                                </li>
                                <li className='list service'>
                                    <div className="list-box">
                                        <div className="input-box">  
                                            <label htmlFor="userService1"> 
                                                <input 
                                                    type="checkbox" 
                                                    name='userService' 
                                                    id='userService1' 
                                                    value={'이용약관 동의(필수)'}
                                                    onChange={onChangeServiceCheck} 
                                                    checked={state.serviceAgree.includes('이용약관 동의(필수)')}
                                                />
                                                <span>이용약관 동의</span>
                                            </label>
                                            <em>(필수)</em>
                                        </div>
                                        <button onClick={onClickService1Modal} className='service-view'>
                                           <span>약관보기</span>
                                           <img src="http://localhost:3000/images/sub/sub5/icon_arrow_r.svg" alt="" />
                                        </button>
                                    </div>
                                </li>
                                <li className='list service'>
                                    <div className="list-box">
                                        <div className="input-box">  
                                            <label htmlFor="userService2"> 
                                                <input 
                                                    type="checkbox" 
                                                    name='userService' 
                                                    id='userService2' 
                                                    value={'개인정보 수집∙이용 동의(필수)'}
                                                    onChange={onChangeServiceCheck} 
                                                    checked={state.serviceAgree.includes('개인정보 수집∙이용 동의(필수)')} 
                                                />
                                                <span>개인정보 수집∙이용 동의</span>
                                            </label>
                                            <em>(필수)</em>
                                        </div>
                                        <button onClick={onClickService2Modal} className='service-view'>
                                           <span>약관보기</span>
                                           <img src="http://localhost:3000/images/sub/sub5/icon_arrow_r.svg" alt="" />
                                        </button>
                                    </div>
                                </li>
                                <li className='list service'>
                                    <div className="list-box">
                                        <div className="input-box">  
                                            <label htmlFor="userService3"> 
                                                <input 
                                                    type="checkbox" 
                                                    name='userService' 
                                                    id='userService3' 
                                                    value={'개인정보 수집∙이용 동의(선택)'} 
                                                    onChange={onChangeServiceCheck} 
                                                    checked={state.serviceAgree.includes('개인정보 수집∙이용 동의(선택)')} 
                                                />
                                                <span>개인정보 수집∙이용 동의</span>
                                            </label>
                                            <em>(선택)</em>
                                        </div>
                                        <button onClick={onClickService3Modal} className='service-view'>
                                           <span>약관보기</span>
                                           <img src="http://localhost:3000/images/sub/sub5/icon_arrow_r.svg" alt="" />
                                        </button>
                                    </div>
                                </li>
                                <li className='list service'>
                                    <div className="list-box">
                                        <div className="input-box">  
                                            <label htmlFor="userService4"> 
                                                <input 
                                                    type="checkbox" 
                                                    name='userService' 
                                                    id='userService4' 
                                                    value={'무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'} 
                                                    onChange={onChangeServiceCheck} 
                                                    checked={state.serviceAgree.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')} 
                                                />
                                                <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의</span>
                                            </label>
                                            <em>(선택)</em>
                                        </div>
                                    </div>
                                </li>
                                <li className='list service service5'>
                                    <div className="list-box">
                                        <div className="input-box">  
                                            <label htmlFor="userService5"> 
                                                <input 
                                                    type="checkbox" 
                                                    name='userService' 
                                                    id='userService5' 
                                                    value={'SNS'} 
                                                    onChange={onChangeServiceCheck} 
                                                    checked={state.serviceAgree.includes('SNS')} 
                                                />
                                                <span>SNS</span>
                                            </label>
                                            <label htmlFor="userService6"> 
                                                <input 
                                                    type="checkbox" 
                                                    name='userService' 
                                                    id='userService6' 
                                                    value={'이메일'} 
                                                    onChange={onChangeServiceCheck} 
                                                    checked={state.serviceAgree.includes('이메일')} 
                                                />
                                                <span>이메일</span>
                                            </label>
                                        </div>
                                        <p className='guide-text show'>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>  
                                    </div>
                                </li>
                                <li className='list service'>
                                    <div className="list-box">
                                        <div className="input-box">  
                                            <label htmlFor="userService7"> 
                                                <input 
                                                    type="checkbox" 
                                                    name='userService' 
                                                    id='userService7' 
                                                    value={'본인은 만 14세 이상입니다.(필수)'} 
                                                    onChange={onChangeServiceCheck} 
                                                    checked={state.serviceAgree.includes('본인은 만 14세 이상입니다.(필수)')} 
                                                />
                                                <span>본인은 만 14세 이상입니다.</span>
                                            </label>
                                            <em>(필수)</em>
                                        </div>
                                    </div>
                                </li>
                                
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