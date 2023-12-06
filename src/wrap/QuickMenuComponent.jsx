import React from 'react';
import './scss/QuickMenu.scss'
import { useSelector } from 'react-redux';

export default function QuicMenuComponent() {

    const selector = useSelector((state)=>state);

    const quickMenu = React.useRef();
    const [isFixed, setIsFixed] = React.useState(false);

    React.useEffect(()=>{
        window.addEventListener('scroll', function(){

            let isFixed = false;

            if(this.window.scrollY >= 400){
                isFixed = true;
            }
            else{
                isFixed = false;
            }
            setIsFixed(isFixed);
        });
    },[]);

    // QuickMenu up, dowm 슬라이드 구현
    // 1. 선택자, 상태변수
    const refSlideWrap = React.useRef();
    const [cnt, setcnt] = React.useState(0);
    // 2. up, down 클릭이벤트
    const onClickUpDownEvent=(e, direction)=>{
        e.preventDefault();
        //console.log(direction); 
        if(direction === 'DOWN'){
            if(cnt > selector.quickMenuViewProduct.quickMenuViewProduct.length-4){ // 전체개수 - (보이는화면3 + 1) => 0보다 크면 증가 | 1이면 종료
                return;                             
            }
            else{
                setcnt(cnt+1);
            }
        }
        else if(direction === 'UP'){
            if(cnt > 0){
                setcnt(cnt-1);
            }
            else{
                return;
            }
        }
    }
    // 4. slide-wrap 애니메이션 구현
    const quickMenuSlide=()=>{
        try{            
            refSlideWrap.current.style.transition = `all 0.3s ease-in-out`;
            refSlideWrap.current.style.transform = `translateY(${-94 * cnt}px)`;
        }
        catch(e){
            
        }
    }
    // 5. 상태변수 값 변경에 따른 실행 useEffect() 구현 => quickMenuSlide 함수 호출
    React.useEffect(()=>{
        quickMenuSlide();
    },[cnt]);


    return (
        <div id ="quickMenu" ref={quickMenu} className={isFixed ? 'on' : ''}>  
            <ul>
                <li>
                    <a href="!#">
                        <img src="./images/quickMenu/deliveryInfo.webp" alt="" />
                    </a>
                </li>
                <li>
                    <ul>
                        <li><a href="!#">등급별혜택</a></li>
                        <li><a href="!#">레시피</a></li>
                    </ul>
                </li>
                {
                    selector.quickMenuViewProduct.quickMenuViewProduct.length > 0 &&
                    (
                    <li>
                        <ul>
                            <li><button className='up-arrow-btn' onClick={(e) => onClickUpDownEvent(e, 'UP')}></button></li>
                            <li><h2>최근본상품</h2></li>
                            <li>
                                <ul ref={refSlideWrap}>
                                    {
                                        selector.quickMenuViewProduct.quickMenuViewProduct.map((item)=>{
                                            return(                                        
                                                <li key={item.번호}>
                                                    <a href="!3">
                                                        <img src={item.이미지} alt="" />
                                                    </a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </li>
                            <li><button className='down-arrow-btn' onClick={(e) => onClickUpDownEvent(e, 'DOWN')}></button></li>
                        </ul>
                    </li>                          
                    )                  
                }
            </ul>      
        </div>
    );
};
