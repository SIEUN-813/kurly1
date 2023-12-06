import React from 'react';
import './scss/Section1.scss'
import Section1ComponentChild from './Section1ComponentChild';
import axios from 'axios';

export default function Section1Component() {

    const [state, setState] = React.useState({
        slide: [],
        n: 0
    });

    // MVC모델링
    // 비동기식방식으로 외부데이터 가져오기 => 패키지 AXIOS REST API! 설치 (npm i axios)
    React.useEffect(()=>{
        axios({
            url:'./data/intro/section1.json',
            method:'GET',
        })
        .then((result)=>{
            //console.log("AXIOS 성공");
            //console.log(result);
            //console.log(result.data);
            setState({
                ...state,
                slide:result.data.slide,
                n: result.data.slide.length
            })
        })
        .catch((error)=>{
            console.log("AXIOS 오류" + error);
        });
    },[]);

    return (
        <section id = "section1">                        
            <Section1ComponentChild slide = {state.slide} n={state.n} />
        </section>
    );
};
