

import React, { useEffect, useState } from 'react';
import hospSymbol from '../img/H1_01.jpg';
import hospKrNm from '../img/H1_02.jpg';
import '../css/Header.css';

function Header(){
    const [innerWidth , setInnerWidth] = useState();
    const [innerHeight , setInnerHeight] = useState();

    useEffect(() => {

        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);

    },[]);

    return(
        <div className='div_main'>
            <img src={hospSymbol} width={innerWidth/10}/>
            <img src={hospKrNm} width={innerWidth*5/10} />
        </div>        
    )
}

export default Header;