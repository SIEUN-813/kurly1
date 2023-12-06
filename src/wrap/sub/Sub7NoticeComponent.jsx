import React from 'react';
import axios from 'axios';
import './scss/sub7.scss';
import Sub7NoticeLeftComponent from './Sub7NoticeLeftComponent'
import Sub7NoticeComponentChildList from './Sub7NoticeComponentChildList';

export default function Sub6NoticeComponent() {

    const [state, setState] = React.useState({
        notice: [],
        noticeCount: 0,
        n: 0
    })

    React.useEffect(()=>{
        axios({
            url: 'https://sieun.co.kr/kurly_green/green_kurly_notice_table_select.php',
            method: 'GET'
        })
        .then((res)=>{
            //console.log('AXIOS 성공')
            //console.log(res);
            //console.log(res.data);
            if(res.status === 200){
                setState({
                    ...state,
                    notice: res.data,
                })
            }
        })
        .catch((err)=>{
            console.log('AXIOS 실패')
            console.log(err);
        })
        return;
    },[])

    React.useEffect(()=>{
        if(state.notice.length > 0){
            let cnt = 0;
            state.notice.map((item, idx)=>{
                if(item.타입 === '공지'){
                    cnt++;
                }
            });
            setState({
                ...state,
                noticeCount: cnt,
                n: state.notice.length
            })
        }
    },[state.notice])

    return (
        <main id='sub7' className='sub'>
            <section id="section1">
                <div className="container">
                    <div className="content sub7-content">
                        <Sub7NoticeLeftComponent />
                        <Sub7NoticeComponentChildList notice={state.notice} noticeCount={state.noticeCount} n={state.n}/>
                    </div>
                </div>
            </section>
        </main>
    );
};