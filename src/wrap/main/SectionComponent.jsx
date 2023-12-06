import React from 'react';
import SectionComponentChild from './SectionComponentChild';
import './scss/Section.scss'
import axios from 'axios';

export default function SectionComponent({num}) {

    const [state, setState] = React.useState({
        path: '',

        title: '',
        subTitle: '',
        titleOption: false,

        animation: false,
        imageBanner: false,
        cols: 0,
        
        timeSales: {            
            timeSaleOption: true,
            timeSaleDate: '1970-01-01 00:00:00', 
            timeHours: 24,
            caption1: '',
            caption2: '',
            caption3: ''
        },

        product: [],
        n: 0
    });

    React.useEffect(()=>{        

        let folderName = `section${num}`;

        axios({
            url: `./data/intro/${folderName}.json`,
            method:'GET',
        })
        .then((result)=>{
            setState({
                ...state,
                path: folderName,
                title: result.data.title,
                subTitle: result.data.subTitle,
                titleOption: result.data.titleOption,
                animation: result.data.animation,
                imageBanner: result.data.imageBanner,
                cols: result.data.cols,
                timeSales: {
                    ...state.timeSales,
                    timeSaleOption: result.data.timeSales.timeSaleOption,
                    timeSaleDate: result.data.timeSales.timeSaleDate, 
                    timeHours: result.data.timeSales.timeHours,
                    caption1: result.data.timeSales.caption1,
                    caption2: result.data.timeSales.caption2,
                    caption3: result.data.timeSales.caption3
                },
                product: result.data.product,
                n: result.data.product.length
            })
        })
        .catch((error)=>{
            console.log("AXIOS 오류" + error);
        });
    },[]);

    return (
        <section id = {`section${num}`} className="section">                
           <div className="container">
                {
                    state.titleOption && 
                    (
                    <div className="title">
                        <h2>{state.title}<img src="./images/intro/section2/icon_arrow_r.svg" alt="" /></h2>
                        <p>{state.subTitle}</p>                    
                    </div>                        
                    )
                }
                <div className="content">
                    <SectionComponentChild  timeSales={state.timeSales}                                             
                                            animation={state.animation} imageBanner={state.imageBanner} cols={state.cols} 
                                            path={state.path} 
                                            product={state.product} n={state.n} />
                </div>
           </div>
        </section>
    );
};
