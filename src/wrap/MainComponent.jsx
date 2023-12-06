import React from 'react';
import Section1Component from './main/Section1Component'
import SectionComponent from './main/SectionComponent'
import './scss/Main.scss'
import axios from 'axios';

export default function MainComponent() {

    const [sectionCount, setSectionCount] = React.useState({});
    React.useEffect(()=>{
        axios({
            url: './data/intro/section_count.json',
            method: 'GET'
        })
        .then((res)=>{
            if(res.status === 200){
                setSectionCount(res.data.sectionCount);
            }
        })
        .catch((err)=>{

        })
    });

    return (
        <main id = "main">      
            <Section1Component />
            {
                sectionCount.length > 0 &&
                (
                    sectionCount.map((item)=>{
                        return(
                            <SectionComponent key={item} num={item} />
                        )
                    })
                ) 
            }
        </main>
    );
};