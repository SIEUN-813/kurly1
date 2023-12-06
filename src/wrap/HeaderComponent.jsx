import React from 'react';
import './scss/Header.scss'
import {Link, Outlet, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isAddressAPIModal } from '../reducer/isAddressAPIModal';
import { signIn } from '../reducer/signIn';
import { addressAPIModal } from '../reducer/addressAPIModal';
import { useNavigate } from 'react-router-dom';

export default function HeaderComponent() {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const location = useLocation();
    const navigete = useNavigate();

    //console.log(selector.signIn.logInInfo.id);

    // 선택자 선언
    const row3 = React.useRef();

    // 상태관리
    const [state, setState] = React.useState({
        isBar : false,
        isCustomer : false,
        isMap : false,
        isFixed : false,
        signInTooltip: false,
    });

    // 윈도우 스크롤 이벤트 
    // window.resize(), window.scroll() 자바스크립트 일반코딩 => 
    React.useEffect(()=>{
        let row3Top = row3.current.offsetTop + 42; // + 42는 Topmodal 높이

        window.addEventListener('scroll', function(){
            //console.log( window.scrollY );
            if( window.scrollY >= row3Top  ){ 
                setState({
                    ...state,
                    isFixed : true
                });
            }
            else {
                setState({
                    ...state,
                    isFixed : false
                })
            }
        });
    },[]);
    
    const onClickLogOut=()=>{
        // 버튼이 아니라서 e.preventDefault() 생략 가능
        dispatch(signIn(null));
        dispatch(addressAPIModal(''));
        localStorage.removeItem('KURLY_SIGNIN_INFORMATION');
        navigete('/index');
    }

    // 로그인
    const onMouseEnterSignIn=()=>{
        setState({
            ...state,
            signInTooltip: true
        })
    }
    const onMouseLeaveSignIn=()=>{
        setState({
            ...state,
            signInTooltip: false
        })
    }
    // 카테고리
    const onMouseEnterIsBar=()=>{
        setState({
            ...state,
            isBar : true
        })
    }
    const onMouseLeaveIsBar=()=>{
        setState({
            ...state,
            isBar : false
        })
    }
    // 고객센터
    const onMouseEnterCustomer=()=>{
        setState({
            ...state,
            isCustomer : true
        })
    }
    const onMouseLeaveCustomer=()=>{
        setState({
            ...state,
            isCustomer : false
        })
    }
    // 지도 
    const onMouseEnterMap=()=>{
        setState({
            ...state,
            isMap : true
        })
    }
    const onMouseLeaveMap=()=>{
        setState({
            ...state,
            isMap : false
        })
    }
    // 배송지등록 및 배송지변경 클릭이벤트
    const onClicAddressUpdate=(e)=>{
        e.preventDefault();
        dispatch(isAddressAPIModal(true))
    }
    return (
        <>
            <header id="header">
                <div className="row1 row">
                    <div className="container">
                        <div className="content">
                            <aside id="aside">                    
                                {
                                    selector.signIn.logInInfo !== null &&
                                    (                                  
                                    <div className='signin-box'>                              
                                        <Link to="/sub6" className="on" onMouseEnter={onMouseEnterSignIn}>
                                            <span className='member-grade'>{selector.signIn.logInInfo.memberGrade}</span>
                                            <span>{selector.signIn.logInInfo.name}님</span>
                                            <span><img src="./images/intro/header/icon_login_ckeck.svg" alt="" /></span>
                                            <span><img src="./images/intro/header/ico_down_16x10.png" alt="" /></span>
                                            <i>|</i>     
                                        </Link>  
                                        {
                                            state.signInTooltip &&
                                            (                                                
                                            <div className='sign-tooltip' onMouseLeave={onMouseLeaveSignIn}>
                                                <ul>
                                                    <li><Link to="!#">주문 내역</Link></li>
                                                    <li><Link to="!#">선물 내역</Link></li>
                                                    <li><Link to="!#">찜한 상품</Link></li>
                                                    <li><Link to="!#">배송지 관리</Link></li>
                                                    <li><Link to="!#">상품후기</Link></li>
                                                    <li><Link to="!#">결제수단·컬리페이</Link></li>
                                                    <li><Link to="!#">상품 문의</Link></li>
                                                    <li><Link to="!#">적립금·컬리캐시</Link></li>
                                                    <li><Link to="!#">쿠폰</Link><img src="./images/intro/header/icon_login_ckeck.svg" alt="" /></li>
                                                    <li><Link to="!#">개인 정보 수정</Link></li>
                                                    <li><Link to="!#">나의 컬리 스타일</Link><img src="./images/intro/header/icon_login_ckeck.svg" alt="" /></li>
                                                    <li><Link to="!#">컬리멤버스</Link></li>
                                                    <li onClick={onClickLogOut}><a href='/index'>로그아웃</a></li>
                                                </ul>
                                            </div>   
                                            )
                                        }
                                    </div>  
                                    )
                                }
                                {
                                    selector.signIn.logInInfo === null &&
                                    (
                                        <>                                            
                                        <Link to="/sub5" className="on">회원가입</Link>
                                        <i>|</i>        
                                        <Link to="/sub6">로그인</Link>
                                        <i>|</i> 
                                        </>
                                    )       
                                }
                                <Link to="/sub7" onMouseEnter={onMouseEnterCustomer}>고객센터 <img src="./images/intro/header/ico_down_16x10.png" alt="" /></Link>
                                { 
                                state.isCustomer &&   
                                (
                                <div className="customer-center" onMouseLeave={onMouseLeaveCustomer}>
                                    <ul>
                                        <li><Link to='/sub7'>공지사항</Link></li>
                                        <li><a href="!#">자주하는 질문</a></li>
                                        <li><a href="!#">1:1 문의</a></li>
                                        <li><a href="!#">대량주문 문의</a></li>
                                    </ul>
                                </div> 
                                )                   
                                }
                                {
                                    selector.signIn.logInInfo === null &&
                                    (
                                        <>
                                        <i>|</i>
                                        <Link to='/sub7AdminSignIn'>MyAdmin</Link>
                                        </>
                                    )       
                                }
                            </aside>
                        </div>
                    </div>
                </div>
                <div className="row2 row">
                    <div className="container">
                        <div className="content">
                            <div className="left">
                                <Link to="/index">
                                    <img src="./images/intro/header/icon_logo.svg" alt="" />
                                    <span>마켓컬리</span>
                                </Link>
                                <i>|</i>
                                <a href="!#">뷰티컬리<img src="./images/intro/header/icon_logo_n.svg" alt="" /></a>
                            </div>
                            <div className="center">
                                <input type="text" name="search" id="search" /*value={state.검색어}*/ placeholder="검색어를 입력해주세요" />
                                <button><img src="./images/intro/header/icon_zoom_purple.svg" alt="" /></button>
                            </div>
                            <div className="right">
                                <span>
                                    <a href="!#" onMouseEnter={onMouseEnterMap}><img src="./images/intro/header/icon_map.svg" alt="" /></a>
                                    <a href="!#"><img src="./images/intro/header/icon_heart.svg" alt="" /></a>
                                    <a href="!#"><img src="./images/intro/header/icon_cart.svg" alt="" /></a>
                                </span>
                                {
                                    state.isMap &&
                                    (
                                    <div className="map-address" onMouseLeave={onMouseLeaveMap}>
                                        {
                                            selector.addressAPIModal.address === '' &&
                                            (                                                
                                            <ul>
                                                <li><strong>배송지를 등록</strong>하고</li>
                                                <li>구매 가능한 상품을 확인하세요!</li>
                                                <li>
                                                    <a href="!#">로그인</a>
                                                    <button onClick={onClicAddressUpdate}>
                                                        <img src="./images/intro/header/icon_zoom_white.png" alt="" />
                                                        <span>주소검색</span>
                                                    </button>
                                                </li>
                                            </ul>
                                            )
                                        }
                                        {   
                                            selector.addressAPIModal.address !== '' &&    
                                            (                                                                   
                                            <ul>
                                                <li>{`${selector.addressAPIModal.address.address1} ${selector.addressAPIModal.address.address2}`}</li>
                                                <li>{'샛별배송'}</li>
                                                <li>
                                                    <button className='address-update-btn' onClick={onClicAddressUpdate}>
                                                        <span>배송지 변경</span>
                                                    </button>
                                                </li>
                                            </ul>   
                                            )  
                                        }
                                    </div> 
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div ref={row3} className={`row3 row${state.isFixed ? ' fixed' : ''}`} >
                    <div className="container">
                        <div className="content">
                            <div className="left">
                                <a href="!#" onMouseEnter={onMouseEnterIsBar} onMouseLeave={onMouseLeaveIsBar} className={state.isBar ? "on" : ""}>
                                    <img src={state.isBar ? "./images/intro/header/icon_3bar_on.svg" : "./images/intro/header/icon_3bar.svg"} alt="" />
                                    <span>카테고리</span>
                                </a>
                            </div>
                            <div className="center">
                                <nav>
                                    {/*송신 useNavigate() 수신 location=useLocation() */}
                                    <Link to={{pathname:"/sub1"}} className={location.pathname === '/sub1' ? "on" : ''}>신상품</Link>
                                    <Link to={{pathname:"/sub2", state:{name:"베스트"}}} className={location.pathname === '/sub2' ? "on" : ''} >베스트</Link>
                                    <Link to={{pathname:"/sub3"}} className={location.pathname === '/sub3' ? "on" : ''} >알뜰쇼핑</Link>
                                    <Link to={{pathname:"/sub4"}} className={location.pathname === '/sub4' ? "on" : ''} >특가/혜택</Link>
                                </nav>
                            </div>
                            <div className="right">
                                <a href="!#">
                                    <em>샛별・택배</em> <span>배송안내</span> 
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
};
