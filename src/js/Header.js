

import React, { useEffect, useState } from 'react';
import hospSymbolKrNm from '../img/cbnuh_log2.png'
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
                {/* <div className='div-header-logo'>
                    <img className='img-header-logo' src={hospSymbolKrNm} />
                </div> */}

                <div className='div-header-text'>
                    <div>
                        <div className='div-header-logo'>
                            <img className='img-header-logo' src={hospSymbolKrNm} />
                            <label>충북대학교병원</label>
                        </div>
                    </div>
                    <label>사전문진표</label>
                </div>
            </div>
            
        </div>        
    )
}

export default Header;