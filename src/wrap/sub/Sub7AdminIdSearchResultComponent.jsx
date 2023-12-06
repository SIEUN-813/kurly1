import React from 'react';
import './scss/sub6.scss';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sub7AdminIdSearchResultComponent(){ 

    const location = useLocation();
    const navigate = useNavigate();

    const onClickPwSearch=(e)=>{
        e.preventDefault();
        navigate('/sub7AdminPwSearch');
    }
    
    const onClickSignInSearch=(e)=>{
        e.preventDefault();
        navigate('/sub7AdminSignIn');
    }

    return ( 
        <main id='sub6' className='sub6-id-pw-search-result'>
            <section id="section1">
                <div className="container">
                    <div className="title id-pw-search-title">
                        <h2 className='title-txt'>관리자님의 컬리계정을 찾았습니다</h2>
                        <h3>아이디 확인 후 로그인해 주세요</h3>
                    </div>
                    <div className="content sub6-content">
                        <form>
                            <ul>
                                <li>
                                    <div className="gap">  
                                        <div className='text-box'>                                        
                                            <div className="left">
                                                <img src="./images/sub/sub6/icon_id_pw_search_result.svg" alt="" />
                                            </div>
                                            <div className="right">                                                
                                                <p>{location.state.id}</p>
                                                <p>{location.state.signupDate}</p> 
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="gap"> 
                                    </div>
                                </li>
                                <li>
                                    <div className="gap gap2">                                      
                                        <input 
                                            type="button"
                                            name='pwSearchBtn'
                                            id='pwSearchBtn' 
                                            value={'비밀번호찾기'}
                                            onClick={onClickPwSearch}
                                        />   
                                    </div>
                                </li>
                                <li>
                                    <div className="gap gap2">                                      
                                        <input 
                                            type="button"
                                            name='signInBtn'
                                            id='signInBtn' 
                                            value={'로그인'}
                                            onClick={onClickSignInSearch}
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

 