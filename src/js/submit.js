import React, {useState} from 'react';
import '../App.css'
import '../css/CheckIdentification.css'
import '../css/submit.css'

function Submit() { 
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
      // 현재 창으로 이동
    window.location.href = 'about:blank';

    // 창 닫기
    window.close();
  };

  return (
    <div className='div-main text'>
      <div className='div-verticalAlign'>
        <div className='div-holizonAlign-left'>
          <div className='font-green' >사전문진</div>
          <div className='font-default'>
              이 완료되었습니다.
          </div>
        </div>

        <div className='div-holizonAlign-left'>
            <div className='font-default'>
                감사합니다.
            </div>
        </div>
        <br/>
      </div>

      <div className='div-holizonAlign-center'>
          <button className='btn-hover' onClick={handleClose}>확 인</button>
      </div> 
    </div>
    
  );
}

export default Submit;
