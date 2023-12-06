import React from 'react';
import './scss/Section1.scss'

export default function Section1ComponentChild ({slide, n}) {    

    const slideWrap = React.useRef();

    // 슬라이드 갯수가 들어오면 실행
    React.useRef(()=>{
        // 선택자(slideWrap)는 리액트에서 요소선택자 사용하기 : React.useRef()
        slideWrap.current.style.width = `${100 * n}%`
    },[n]);

    // 상태변수
    // 메인슬라이드 컨트롤
    const [cnt, setCnt] = React.useState(0);
    const [toggle, setToggle] = React.useState(0);
    // 슬라이드버튼 컨트롤
    const [isArrow, setIsArrow] = React.useState(false);

    // 슬라이드 애니메이션 (오른쪽에서 왼쪽으로 부드럽게 이동하는 애니메이션 구현)
    const mainSlide=()=>{
        slideWrap.current.style.transition = 'all 0.6s ease-in-out';
        slideWrap.current.style.left = `${-100 * cnt}%`;
        // 처음 실행할 떄 0부터(슬라이드 숫자는 1) 시작
        if(cnt!==0){
            returnSlide();
        }
    }

    // 리턴슬라이드 구현
    const returnSlide=()=>{
        // 리턴 다음
        if(cnt>n-2){
            //console.log(cnt);
            //console.log(n);
            setToggle(1);
            setCnt(1); // 리턴후에는 반드시 1로 설정
            slideWrap.current.style.transition = 'none';
            slideWrap.current.style.left = `${-100 * 0}%`;
        }
        // 리턴 이전
        if(cnt<0){
            //console.log('리턴 하기 전 실행')
            setToggle(1);
            setCnt(n-3);
            slideWrap.current.style.transition = 'none';
            slideWrap.current.style.left = `${-(100 * (n-2))}%`;
        }
    }
    
    // 슬라이드 구현 (cnt 상태변수 변경되면 메인슬라이드함수 호출 실행)
    React.useEffect(()=>{
        // 리턴없는경우
        if(toggle===0){            
            mainSlide();
        }
        // 리턴있는경우
        else {
            setToggle(0); // 리턴 초기화
            setTimeout(()=>{ // 타이머 동작시 비동기식처리방식
                mainSlide();
            },10);
        }
    },[cnt]);

    // 다음슬라이드 카운트함수 상태관리
    const onClickNext=(e)=>{
        e.preventDefault();
        setCnt(cnt=>cnt+1);
    }

    // 이전슬라이드 카운트함수 상태관리
    const onClickPrev=(e)=>{
        e.preventDefault();    
        setCnt(cnt=>cnt-1);    
    }

    // 자동타이머 (로딩시 1회 실행)
    React.useEffect(()=>{
        if(isArrow===false){
            let setId = 0;
            setId = setInterval(()=>{
                setCnt(cnt=>cnt+1);
            }, 4000);
            return()=>clearInterval(setId); 
        }
    },[isArrow]);
    
    // 슬라이드 오버시 버튼 보이기
    const onMouseEnterContainer=()=>{
        setIsArrow(true);
    }

    // 슬라이드 아웃시 버튼 숨기기
    const onMouseLeaveContainer=()=>{
        setIsArrow(false);
    }

    return (            
        <div className="slide-container" onMouseEnter={onMouseEnterContainer} onMouseLeave={onMouseLeaveContainer}>
            <div className="slide-view">                      
                <ul ref={slideWrap} className="slide-wrap">
                    {
                    slide.map((item, idx)=>{
                        return (
                        <li className="slide" key={item.번호}>
                            <img src={`./images/intro/section1/${item.이미지}`} alt="" />
                        </li>
                        )
                    })                
                    }
                </ul>
            </div>
            <a href="!#" onClick={onClickNext} className={`next-arrow-btn blind${isArrow ? ' on' : ' '}`}>next</a>
            <a href="!#" onClick={onClickPrev} className={`prev-arrow-btn blind${isArrow ? ' on' : ' '}`}>prev</a>
            {/*슬라이드네비게이션 (페이지네이션)*/}
            <span className='page-num-box'><em>{cnt+1 > n-2 ? 1 : cnt+1}</em><i>/</i><em>{n-2}</em></span>
        </div>
    );
};
