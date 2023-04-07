

import React, { useEffect, useState } from 'react';
import hospSymbolKrNm from '../img/cbnuh_log1.png'
import '../css/Header.css';

function Header(){
    const [innerWidth , setInnerWidth] = useState();
    const [innerHeight , setInnerHeight] = useState();

    useEffect(() => {

        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);

    },[]);

    return(
        <div className='div-header-main'>
            <div className='div-header-border'>
                <div className='div-header-logo'>
                    <img src={hospSymbolKrNm} width={200}/>
                </div>

                <div className='div-header-center'>
                    <div className='div-header-text'>
                        사전문진표
                    </div>
                </div>
            </div>
            
        </div>        
    )
}

export default Header;