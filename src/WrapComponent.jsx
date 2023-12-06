import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HeaderComponent from './wrap/HeaderComponent';
import MainComponent from './wrap/MainComponent';
import Sub1Component from './wrap/sub/Sub1Component';
import Sub2Component from './wrap/sub/Sub2Component ';
import Sub3Component from './wrap/sub/Sub3Component';
import Sub4Component from './wrap/sub/Sub4Component';
import Sub5SignUpComponent from './wrap/sub/Sub5SignUpComponent'
import Sub6SignInComponent from './wrap/sub/Sub6SignInComponent'
import Sub7NoticeComponent from './wrap/sub/Sub7NoticeComponent'
import FooterComponent from './wrap/FooterComponent';
import TopModalComponent from './wrap/TopModalComponent'
import MainModalComponent from './wrap/MainModalComponent'
import QuickMenuComponent from './wrap/QuickMenuComponent'
import GoTopComponent from './wrap/GoTopComponent'
import ConfirmModalComponent from './wrap/ConfirmModalComponent';
import PostcodeComponent from './wrap/PostcodeComponent';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmService1ModalComponent from './wrap/ConfirmService1ModalComponent'
import ConfirmService2ModalComponent from './wrap/ConfirmService2ModalComponent'
import ConfirmService3ModalComponent from './wrap/ConfirmService3ModalComponent';
import Sub6SignInIdSearchComponent from './wrap/sub/Sub6SignInIdSearchComponent';
import Sub6SignInPwSearchComponent from './wrap/sub/Sub6SignInPwSearchComponent';
import Sub6SignInIdPwSearchResultComponent from './wrap/sub/Sub6SignInIdPwSearchResultComponent';
import Sub6SignInPwResetComponent from './wrap/sub/Sub6SignInPwResetComponent';
import Sub7NoticeInsertFormComponent from './wrap/sub/Sub7NoticeInsertFormComponent';
import Sub7NoticeViewComponent from './wrap/sub/Sub7NoticeViewComponent';
import Sub7NoticeUpdateComponent from './wrap/sub/Sub7NoticeUpdateComponent';
import Sub7AdminSignInComponent from './wrap/sub/Sub7AdminSignInComponent';
import Sub7AdminSignUpComponent from './wrap/sub/Sub7AdminSignUpComponent';
import Sub7AdminIdSearchComponent from './wrap/sub/Sub7AdminIdSearchComponent';
import Sub7AdminIdSearchResultComponent from './wrap/sub/Sub7AdminIdSearchResultComponent';
import Sub7AdminPwSearchComponent from './wrap/sub/Sub7AdminPwSearchComponent';
import Sub7AdminPwResetComponent from './wrap/sub/Sub7AdminPwResetComponent';
import { mainModal } from './reducer/mainModal';
import { topModal } from './reducer/topModal';
import { addressAPIModal } from './reducer/addressAPIModal';
import { signIn } from './reducer/signIn';

export default function WrapComponent() {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    // 로그인정보    
    React.useEffect(()=>{
        // 새로고침해도 상태관리 변수에 로그인정보를 유지하도록 로컬스토레이지 데이터 가져온다
        if(localStorage.getItem('KURLY_SIGNIN_INFORMATION') !== null){
            // 로그인완료 => 3일간 로그인 유지
            const result = JSON.parse(localStorage.getItem('KURLY_SIGNIN_INFORMATION'));
            dispatch(signIn(result));
        }
    },[])

    // 주소정보
    React.useEffect(()=>{
        if(selector.signIn.logInInfo === null && sessionStorage.getItem('KURLY_ADDRESS_KEY') !== null){
            const result = JSON.parse(sessionStorage.getItem('KURLY_ADDRESS_KEY'));
            //const address = `${result.address1} ${result.address2}`;
            const address = {
                address1: result.address1,
                address2: result.address2
            }
            dispatch(addressAPIModal(address));
        }
        else if(selector.signIn.logInInfo !== null){
            const address = {
                address1: selector.signIn.logInInfo.address.split(',')[0] === undefined ? '' : selector.signIn.logInInfo.address.split(',')[0],
                address2: selector.signIn.logInInfo.address.split(',')[1] === undefined ? '' : selector.signIn.logInInfo.address.split(',')[1]
            }
            dispatch(addressAPIModal(address));
        }
    },[selector.signIn.logInInfo]);

    // topmodal 유효기간 확인 유지하기
    React.useEffect(()=>{
        let toDay = new Date();
        if(localStorage.getItem('KURLY_TOP_MODAL_KEY') !== null){
            const result = JSON.parse(localStorage.getItem('KURLY_TOP_MODAL_KEY'));
            //console.log(result.expires);
            if(toDay <= result.expires){
                dispatch(topModal(false));
            }
            else{
                dispatch(topModal(true));
            }
        }
    },[])    
    
    // mainmodal 유효기간 확인 유지하기
    React.useEffect(()=>{
        let toDay = new Date();
        if(localStorage.getItem('KURLY_MAIN_MODAL_KEY') !== null){
            const result = JSON.parse(localStorage.getItem('KURLY_MAIN_MODAL_KEY'));
            //console.log(result.expires);
            if(toDay <= result.expires){
                dispatch(mainModal(false));
            }
            else{
                dispatch(mainModal(true));
            }
        }
        return;
    },[])    
    return (
        <div id="wrap">
            {
                selector.topModal.isTopModal &&
                <TopModalComponent />
            }
            <HashRouter>
                <Routes>
                    <Route path="/" element={<HeaderComponent />}>                    
                        <Route index element={ <MainComponent /> } />                        
                        <Route path="/index" element={ <MainComponent /> } />                        
                        <Route path="/sub1" element={<Sub1Component />} />              
                        <Route path="/sub2" element={<Sub2Component />} />              
                        <Route path="/sub3" element={<Sub3Component />} />              
                        <Route path="/sub4" element={<Sub4Component />} />              
                        <Route path="/sub5" element={<Sub5SignUpComponent />} />              
                        <Route path="/sub6" element={<Sub6SignInComponent />} />              
                        <Route path="/sub6IdSearch" element={<Sub6SignInIdSearchComponent />} />              
                        <Route path="/sub6PwSearch" element={<Sub6SignInPwSearchComponent />} />              
                        <Route path="/sub6IdPwSearchResult" element={<Sub6SignInIdPwSearchResultComponent />} />   
                        <Route path="/sub6PwReset" element={<Sub6SignInPwResetComponent />} />   
                        <Route path="/sub7" element={<Sub7NoticeComponent />} />  
                        <Route path="/sub7Insert" element={<Sub7NoticeInsertFormComponent />} />  
                        <Route path="/sub7View" element={<Sub7NoticeViewComponent />} />  
                        <Route path="/sub7Update" element={<Sub7NoticeUpdateComponent />} />  
                        <Route path="/sub7AdminSignIn" element={<Sub7AdminSignInComponent />} />  
                        <Route path="/sub7AdminSignUp" element={<Sub7AdminSignUpComponent />} />  
                        <Route path="/sub7AdminIdSearch" element={<Sub7AdminIdSearchComponent />} />  
                        <Route path="/sub7AdminIdPwSearchResult" element={<Sub7AdminIdSearchResultComponent />} />  
                        <Route path="/sub7AdminPwSearch" element={<Sub7AdminPwSearchComponent />} />  
                        <Route path="/sub7AdminPwReset" element={<Sub7AdminPwResetComponent />} />  
                    </Route>
                </Routes>
            </HashRouter>
            <FooterComponent />
            {
                selector.mainModal.isMainModal &&
                <MainModalComponent />
            }
            <QuickMenuComponent />
            <GoTopComponent />
            {
                selector.confirmModal.isConfirmModal &&
                <ConfirmModalComponent />
            }
            {
                selector.isAddressAPIModal.isAddressAPIModal &&
                <PostcodeComponent />
            }
            {
                selector.confirmService1Modal.isConfirmService1Modal &&
                <ConfirmService1ModalComponent />
            }
            {
                selector.confirmService2Modal.isConfirmService2Modal &&
                <ConfirmService2ModalComponent />
            }
            {
                selector.confirmService3Modal.isConfirmService3Modal &&
                <ConfirmService3ModalComponent />
            }
        </div>
    );
};