import React from 'react';
import axios from 'axios';
import './scss/sub7.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sub7NoticeLeftComponent from './Sub7NoticeLeftComponent';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub7NoticeInsertFormComponent(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        isSelect: false,
        type: '', // 유형
        name: '김석진', // 작성자
        id: 'seokjin', // 아이디
        subject: '', // 제목
        contents: '', // 내용
    })

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

    const onChangeSelect=(e)=>{
        console.log(e.target.value);
        setState({
            ...state,
            type: e.target.value
        })
    }
    const onChangeSubject=(e)=>{
        setState({
            ...state,
            subject: e.target.value
        })
    }
    const onChangeContents=(e)=>{
        setState({
            ...state,
            contents: e.target.value
        })
    }

    const onSubmitInsertForm=(e)=>{
        e.preventDefault();
        if(state.subject === ''){
            confirmModalMethod('제목을 입력해주세요');
        }
        else if(state.contents === ''){
            confirmModalMethod('내용을 입력해주세요');
        }
        else{
            let formData = new FormData();
            formData.append('wType', state.type);
            formData.append('wName', state.name);
            formData.append('wId', state.id);
            formData.append('wSubject', state.subject);
            formData.append('wContent', state.contents);

            axios({
                url: 'https://sieun.co.kr/kurly_green/green_kurly_notice_table_insert.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status === 200){
                    if(res.data === 1){
                        confirmModalMethod('공지사항 등록되었습니다.');
                        navigate('/sub7');
                    }
                    else{
                        confirmModalMethod('공지사항 폼내용을 확인하고 다시 시도해주세요.');
                    }
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }


    return (
        <main id='sub7'>
            <section id="section1">
                <div className="container">
                    <div className="content sub7-content">
                        <Sub7NoticeLeftComponent />      
                        <div className="right sub7-insert-form">
                            <div className="right-header">
                                <h2>공지사항 글쓰기</h2>
                            </div>
                            <div className="right-list">
                                <form autoComplete='off' onSubmit={onSubmitInsertForm}>
                                    <div className="insert-form">
                                        <ul>
                                            <li>
                                                <div className="gap">
                                                    <label className='left-label' htmlFor='wType'>유형<i>*</i></label>
                                                    <select name="wType" id="wType" onChange={onChangeSelect}>
                                                        <option value="">게시글</option>
                                                        <option value="공지">공지</option>
                                                    </select>
                                                    <span className={`icon-arrow-down ${state.isSelect ? ' on' : ''}`}></span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="gap">
                                                    <span className='left-label'>작성자<i>*</i></span>
                                                    <div className="admin-name">{'김석진'}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="gap">
                                                    <span className='left-label'>아이디<i>*</i></span>
                                                    <div className="admin-id">{'seokjin'}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="gap">
                                                    <label className='left-label' htmlFor='subject'>제목<i>*</i></label>
                                                    <input 
                                                        type="text" 
                                                        name='subject'
                                                        id='subject'
                                                        value={state.subject}
                                                        onChange={onChangeSubject}
                                                    />
                                                </div>
                                            </li>
                                            <li>
                                                <div className="gap">
                                                    <label className='left-label' htmlFor='contents'>내용<i>*</i></label>
                                                    <textarea 
                                                        name="contents" 
                                                        id="contents"
                                                        value={state.contents}
                                                        onChange={onChangeContents}
                                                    ></textarea>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="button-box">
                                        <button>등록</button>
                                    </div>
                                </form>
                            </div>
                        </div>  
                    </div>
                </div>  
            </section>
        </main>
    );
};