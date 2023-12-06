import React from 'react';
import './scss/ConfirmModal.scss'
import { useDispatch, useSelector } from 'react-redux';
import { confirmService3Modal } from '../reducer/confirmService3Modal';

export default function ConfirmService3ModalComponent(){

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    const onClickCloseBtn=(e)=>{
        e.preventDefault();
        dispatch(confirmService3Modal(false));
        const htmlElement = document.getElementsByTagName('html')[0];
        htmlElement.classList.remove('on');
    }


    return (
        <div id='confirmModal' className='service-modal service3'>
            <div className="container"> 
                <div className="service-box box3">
                    <div className="title-box">                        
                        <h1>개인정보 수집·이용 동의(선택)</h1>
                    </div>
                    <div className='scroll-wrap-box service3'> 
                        <table>
                            <thead className='thead'>
                                    <tr>
                                        <th>수집 목적</th>
                                        <th>수집 항목</th>
                                        <th>보유 기간</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            맞춤형 회원 서비스 제공
                                        </td>
                                        <td>
                                            성별*, 생년월일* 
                                        </td>
                                        <td class="on">회원 탈퇴<br/> 즉시 파기</td>
                                    </tr>
                                </tbody>
                        </table>
                        <div className="bottom-content">
                            <p>
                            ※ APPLE 계정을 통해 회원가입 할 경우 *에 해당하는 정보는 추후 서비스 이용과정에서 수집 및 이용됩니다.
                            <br/>
                            <br/>
                            ※ 동의를 거부하시는 경우에도 서비스는 이용하실 수 있습니다.
                            </p>
                        </div>
                    </div>                        
                    <div className='button-box'>
                        <button onClick={onClickCloseBtn}>확인</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
