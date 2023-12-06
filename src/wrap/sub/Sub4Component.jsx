import React from 'react';
import './scss/sub.scss'
import axios from 'axios';
import {useLocation} from 'react-router-dom';

export default function Sub4Component() {
    
    const location = useLocation();
    
    const [state, setState] = React.useState({
        product: []
    });

    React.useEffect(()=>{

        let fileName = location.pathname.split('/')[1];    
        
        axios({
            url:`./data/sub/${fileName}.json`,
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    product: res.data.product,
                    path: fileName
                });
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    },[]);


    return (
        <main id='sub4' className='sub'>
            <section id="section1">
                <div className="container">
                    <div className="content sub4-content">
                        <ul>
                            {
                                state.product.length > 0 &&
                                (                      
                                    state.product.map((item, idx)=>{
                                        return(  
                                        <li key={item.번호}>
                                            <a href="!#"><img src={`./images/sub/sub4/${item.이미지}`} alt="" /></a>
                                        </li>
                                        )
                                    })  
                                )
                            }   
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    );
};