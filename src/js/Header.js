

import React from 'react';
import hospSymbol from '../img/H1_01.jpg';
import hospKrNm from '../img/H1_02.jpg';

function Header(){
    return(
        <div>
            <img src={hospSymbol} width={window.innerWidth/25}/>
            <img src={hospKrNm} width={window.innerWidth/5}/>
        </div>        
    )
}

export default Header;