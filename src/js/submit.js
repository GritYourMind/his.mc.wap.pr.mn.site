import React,{useEffect} from 'react';
import useFetch from '../hooks/useFetch';

function Submit() {


const data = useFetch([{
              "method": "SelectPreMediIntroPageInfo"
          },
          {
              "HSP_TP_CD": "01",
              "MDRC_ID": "2"
          }]);

          
 console.log(data);
  return (
    <div>
      <h1>Results</h1>
      <p className='Main'>사전문진이 완료되었습니다.<br/>감사합니다.</p>
      <button className='OKAY'>확 인</button>
    </div>
  );
}

export default Submit;
