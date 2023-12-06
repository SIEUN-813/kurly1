import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { viewProduct } from '../../../reducer/viewProduct';
import { viewProductIsFlag } from '../../../reducer/viewProductIsFlag';
import { quickMenuViewProduct } from '../../../reducer/quickMenuViewProduct'

export default function ProductList({path, product, 필터, filterDeleteMethod}){

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    const onClickDeleteEvent=((e, item)=>{
        e.preventDefault();
        filterDeleteMethod(item);
    })
    
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


    return (
        <div className="product-list">   
            {
                필터.length > 0 &&
                (
                <div className="filter-box">
                    {
                        필터.map((item, idx)=>{
                            return(
                                <span key={item}>
                                    <em>{item}</em>
                                    <a href="!#" onClick={(e)=>onClickDeleteEvent(e, item)}>
                                        <img src="./images/sub/sub1/icon_delete.svg" alt="" />
                                    </a>                                    
                                </span>
                            )
                        })
                    }
                </div>                       
                )              
            }
            <ul>      
                {
                    product.length > 0 &&
                    (                      
                    product.map((item, idx)=>{
                        return(                                                                     
                            <li className={`list list${idx+1}`} key={item.번호}>
                                <div className="col-gap" onClick={(e)=>onClickViewProduct(e, item, './images/sub/')}>
                                    <div className="img-box">                           
                                        <a href="!#">
                                            <img src={`./images/sub/${path}/${item.이미지}`} alt="" />
                                        </a>
                                    </div>
                                    <div className="txt-box">
                                        <p><a href="!#"><img src="./images/sub/sub1/icon_cart.svg" alt="" />담기</a></p>
                                        <h6>{item.배송}</h6>
                                        <h3>{item.제품명}</h3>
                                        <h6>{item.제품특징}</h6>
                                        {   
                                            item.할인율 !== 0 &&
                                            <h4>{item.정가.toLocaleString('ko-KR')}원</h4>
                                        }
                                        <h5>
                                            {
                                                item.할인율 !== 0 &&                                                
                                                <em>{Math.round(item.할인율 * 100)}%</em>
                                            }
                                            <strong className={item.할인율 === 0 ? 'on' : ''}>{Math.round(item.정가 * (1 - item.할인율)).toLocaleString('ko-KR')}원</strong>

                                        </h5>
                                        <h6><img src="./images/intro/section2/icon_count.svg" alt="" />{item.리뷰}</h6>      
                                        <h6>{item.유형}</h6>                                     
                                        <h6>{item.무료배송}</h6>                                     
                                    </div>   
                                </div>
                            </li>
                        )
                    })  
                    )
                }   
            </ul>    
        </div>
    );
};