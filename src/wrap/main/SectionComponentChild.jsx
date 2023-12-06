import React from 'react';
import './scss/Section.scss'
import { useDispatch, useSelector } from 'react-redux';
import { viewProduct } from '../../reducer/viewProduct';
import { viewProductIsFlag } from '../../reducer/viewProductIsFlag';
import { quickMenuViewProduct } from '../../reducer/quickMenuViewProduct'

export default function SectionComponentChild ({timeSales, animation, imageBanner, cols, path, product, n}) {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    // 1. 섹션2 메인슬라이드 애니메이션 대상 선택자 설정
    const slideWrap = React.useRef();
    const slide = React.useRef(); // 1. 섹션2 메인슬라이드 애니메이션 대상 | 타임세일 첫번째 칸
    const refSlide = React.useRef([]); // 선택자 배열 | 슬라이드, 타임세일, 이미지배너

    const [state, setState] = React.useState({
        isLeftArrow : false,
        isRightArrow : false,
        cnt : 0, // 2. 초기값 (슬라이드 카운트) 변수 만들기
        H : 0,
        M : 0,
        S : 0
    });

    // slide-wrap, slide 스타일 너비와 개수
    // 칸수 값이 들어오면 실행 오류 없는 경우 실행
    React.useEffect(()=>{
        if(imageBanner){
            try{
                let slideWidth = 1068 / cols;  // 슬라이드 너비 개산
                for(let i=0; i<n; i++){                    
                    refSlide.current[i].style.width = `${slideWidth}px`;  
                }   
            } 
            catch(e) {
                return;
            }   
        }
        if(animation){
            try{
                let slideWidth = 1068 / cols;  // 슬라이드 너비 개산
                for(let i=0; i<n; i++){                    
                    slide.current.style[i].width = `${slideWidth}px`;
                }
                slideWrap.current.style.width = `${slideWidth * n}px`;     
            } 
            catch(e) {
                return;
            }
        }
        if(timeSales.timeSaleOption){
            try{
                let slideWidth = 1068 / cols;  // 슬라이드 너비 개산
                slide.current.style.width = `${slideWidth}px`; // 타임세일 칸
                for(let i=0; i<n; i++){
                    if(cols===3 && n===1) {
                        refSlide.current[i].style.width = `${slideWidth * 2}px`;
                    }     
                    else {
                        refSlide.current[i].style.width = `${slideWidth}px`;
                    }
                }      
            } 
            catch(e) {
                return;
            }
        }


    },[cols]);

    // 1. 최근 본 상품 클릭 이벤트
    const onClickViewProduct=(e, item, route)=>{
        e.preventDefault();
        let altImg = '1_1.jpg';
        let obj = {
            번호 : item.번호,
            이미지 : `${process.env.PUBLIC_URL}${route}${path}/${path === 'section5' ? altImg : item.이미지}`,
            제품명 : item.제품명,
            정가 : item.정가,
            할인율 : item.할인율,
            판매가 : Math.round(item.정가 * (1- item.할인율)),
            제품특징 : item.제품특징,
            제조사 : item.제조사,
            제조일시 : item.제조일시,
            판매처 : item.판매처,
            보관방법 : item.보관방법,
            배송 : item.배송,
            일시 : new Date().getTime()
        }        
        dispatch(viewProduct(obj));
    }

    // 2. selector.viewProduct.current (현재 클릭한 제품정보 상태변수 값) 이 들어오면 
    React.useEffect(()=>{
        // 로컬스토레이지에 저장하기 => 이전에 저장된 데이터를 가져와서 현재 데이터랑 누적
        // 2-1. 로컬스토레이지(key -> 'KURLY_VIEW_PRODUCT')에 저장된 데이터가 없는 경우 => 배열로 1개만 저장
        let imsi = [];
        if(localStorage.getItem('KURLY_VIEW_PRODUCT') === null){
            // [{}] 빈 객체 들어오는 것 점검
            if(Object.keys(selector.viewProduct.current).length > 0){
                imsi = [selector.viewProduct.current];
                localStorage.setItem("KURLY_VIEW_PRODUCT", JSON.stringify(imsi));                   
                dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));
            }
        }
        // 2-2. 로컬스토레이지에 저장된 데이터가 있는 경우 => 누적해서 저장 (stack 구조)
        else{
            let result = JSON.parse(localStorage.getItem('KURLY_VIEW_PRODUCT'));
            let filterResult = result.map((item) => (item.번호) === selector.viewProduct.current.번호 ? true : false)
            // 중복데이터 검사
            if(filterResult.includes(true) !== true){
                // [{}] 빈 객체 들어오는 것 점검
                if(Object.keys(selector.viewProduct.current).length > 0){
                    result = [selector.viewProduct.current, ...result]; //(stack 구조)
                    // 로컬스토레이지에 저장하기
                    localStorage.setItem("KURLY_VIEW_PRODUCT", JSON.stringify(result));                    
                    dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));
                }        
            }            
        }
    },[selector.viewProduct.current]);

    // 3. 최근 본 상품 상태변수에 로컬스토레이지 데이터 가져와서 저장
    React.useEffect(()=>{
        // 로컬스토레이지 데이터 가져오기
        // [{}] 빈 객체 들어오는 것 점검
        if(localStorage.getItem('KURLY_VIEW_PRODUCT') !== null){
            let result = JSON.parse(localStorage.getItem('KURLY_VIEW_PRODUCT'));
            // [{}] 빈 객체 들어오는 것 점검
            if(result.length > 0){         
                dispatch(quickMenuViewProduct(result));
            }
        }
    },[selector.viewProductIsFlag.isFlag]);


    const [isArrowPrev, setIsArrowPrev] = React.useState(false);
    const [isArrowNext, setIsArrowNext] = React.useState(false);

    // cnt 0 이하 이면 좌측화살 숨김
    // cnt 0 보다 크면 좌측화살 보임
    React.useEffect(()=>{

        let isArrowPrev = false;
        let isArrowNext = false;

        if(state.cnt <= 0 ){
            isArrowPrev = false;
        }
        else{
            isArrowPrev = true;
        }
        setIsArrowPrev(isArrowPrev)
        
        if(state.cnt >= 4 ){
            isArrowNext = false;
        }
        else{
            isArrowNext = true;
        }
        setIsArrowNext(isArrowNext)
    },[state.cnt]);

    const onMouseEnterLeftArrow=()=>{
        setState({
            ...state,
            isLeftArrow: true
        })
    }
    const onMouseLeaveLeftArrow=()=>{
        setState({
            ...state,
            isLeftArrow: false
        })
    }
    const onMouseEnterRightArrow=()=>{
        setState({
            ...state,
            isRightArrow: true
        })
    }
    const onMouseLeaveRightArrow=()=>{
        setState({
            ...state,
            isRightArrow: false
        })
    }
    

    // 5. useEffect 애니메이션 구현
    React.useEffect(()=>{       
        mainSlide();
    },[state.cnt]);

    // 3. 섹션2 메인슬라이드 함수 만들기
    const mainSlide=()=>{
        slideWrap.current.style.transition = `all 0.6s ease-in-out`;
        //slideWrap.current.style.left = `${-1068 * state.cnt}px`;
        slideWrap.current.style.transform = `translateX(${-1068 * state.cnt}px)`;
    }

    // 4-1. 이전 슬라이드 카운트 클릭 이벤트
    const onClickPrevBtn=(e)=>{
        e.preventDefault();   
        if(state.cnt<=0){
            setState({
                ...state,
                cnt: 0
            })
        }
        else {
            setState({
                ...state,
                cnt: state.cnt-1
            })
        }
    }
    // 4-2. 다음 슬라이드 카운트 클릭 이벤트
    const onClickNextBtn=(e)=>{
        e.preventDefault();  
        if(state.cnt>=4){
            setState({
                ...state,
                cnt: 4
            })
        }  
        else {                
            setState({
                ...state,
                cnt: state.cnt+1
            })
        }   
    }

    // 카운트타이머 
    React.useEffect(()=>{        
        if(timeSales.timeSaleOption){                
            const setId = setInterval(function(){
                let timeSale = timeSales.timeSaleDate;
                let timeHours = timeSales.timeHours;
                let start = new Date(timeSale); // 타임세일 시작
                start.setHours(start.getHours() + timeHours);
                let now = new Date();
                let countTime = start - now; // 남은시간 = 시작시간 - 현재시간
                let H = 0;
                let M = 0;
                let S = 0;

                // 타임세일 종료시점 조건문
                if(now >= start){
                    clearInterval(setId);
                    H = 0;
                    M = 0;
                    S = 0;
                }
                else{
                    H = Math.floor(countTime/(60*60*1000)) % 24; // 남은시
                    M = Math.floor(countTime/(60*1000)) % 60; // 남은분
                    S = Math.floor(countTime/(1000)) % 60; // 남은초
                }
                setState({
                    ...state,
                    H : H < 10 ? `0${H}` : H,
                    M : M < 10 ? `0${M}` : M,
                    S : S < 10 ? `0${S}` : S,
                })
            },1000);
        }
    },[timeSales]);

    return (
        <div className="slide-container">
            <div className="slide-view">
                <ul ref={slideWrap} className="slide-wrap">
                    {
                        timeSales.timeSaleOption && 
                        (
                        <li ref={slide} className="slide slide1">
                            <div className="col-gap">
                                <div className="txt-box"> 
                                    <h2>{timeSales.caption1}</h2>                              
                                    <h3>{timeSales.caption2}</h3>                              
                                    <h4>
                                        <span className='icon-timer'>
                                            <img src="./images/intro/section3/icon_timer.svg" alt="" />
                                        </span>
                                        <span className='count-timer'>
                                            <strong>{state.H}</strong>
                                            <i>:</i>
                                            <strong>{state.M}</strong>
                                            <i>:</i>
                                            <strong>{state.S}</strong>
                                        </span>
                                    </h4>                              
                                    <h5>{timeSales.caption3}</h5>                              
                                </div>
                            </div>
                        </li>
                        )
                    }

                    {        
                    product.map((item, idx)=>{
                        return(
                        <li ref={(e) => (refSlide.current[idx])=e} className={`slide slide${idx}`} key={item.번호}>
                            <div className="col-gap" onClick={(e)=>onClickViewProduct(e, item, './images/intro/')}>
                                <div className="img-box">                        
                                    <a href="!#"><img src={`./images/intro/${path}/${item.이미지}`} alt="" /></a>
                                </div>
                                {
                                    !imageBanner && 
                                    (
                                    <div className="txt-box">
                                        <p><a href="!#"><img src="./images/intro/section2/icon_cart.svg" alt="" />담기</a></p>
                                        <h3>{item.제품명}</h3>
                                        <h4>{item.정가.toLocaleString('ko-KO')}원</h4>
                                        <h5><em>{Math.round(item.할인율 * 100)}%</em><strong>{Math.round(item.정가 * (1-item.할인율)).toLocaleString('ko-KO')}원</strong></h5>
                                        <h6><img src="./images/intro/section2/icon_count.svg" alt="" />509</h6>                                            
                                    </div>                                           
                                    )                                 
                                }
                            </div>
                        </li>
                        )
                    })  
                    }

                </ul>
            </div>

            {
                animation && 
                (
                    <a href="!#" onMouseEnter={onMouseEnterLeftArrow} onMouseLeave={onMouseLeaveLeftArrow} onClick={onClickPrevBtn} className={`sec2-left-arrow ${isArrowPrev ? ' on' : ''}`}>
                        <img src={`./images/intro/${state.isLeftArrow ? 'icon_circle_left_arrow_purple.svg' : 'icon_circle_left_arrow_black.svg'}`} alt="" />
                    </a>   
                )
            }

            {
                animation && 
                (
                    <a href="!#" onMouseEnter={onMouseEnterRightArrow} onMouseLeave={onMouseLeaveRightArrow} onClick={onClickNextBtn} className={`sec2-right-arrow ${isArrowNext ? ' on' : ''}`}>
                        <img src={`./images/intro/${state.isRightArrow ? 'icon_circle_left_arrow_purple.svg' : 'icon_circle_left_arrow_black.svg'}`} alt="" />
                    </a>
                )
            }
        </div>  
    );
};