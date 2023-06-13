import React, {useState} from 'react';
import { useNavigate, useLocation }from 'react-router-dom';
import getFetchData from '../hooks/getFetchData';
import '../App.css'
import '../css/CheckIdentification.css'
import '../css/submit.css'

function Submit() { 
  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
      // 현재 창으로 이동
    window.location.href = 'about:blank';
    // 창 닫기
    window.close();
  };
  
  const reWrite = () => {
    if(window.confirm("기존 작성내역이 초기화됩니다. 다시 작성하시겠습니까?")){
      console.log("예");
      /* 기존 작성 정보 update */
      const data = [
          {
              "biz":"HIS.MC.WAP.PR.BIZ.PreMedicalRecordBL",
              "method": "SaveRewritePreinterview"
          },
          {
              "HSP_TP_CD": location.state.hsp_tp_cd,
              "MDRC_ID": location.state.mdrc_id,
              "MDRC_FOM_SEQ": location.state.mdrc_fom_seq
          }
      ];
        getFetchData(data, (result) => {
          /* 재작성 페이지 */
          navigate("/question",{
            state: {
                hsp_tp_cd: location.state.hsp_tp_cd ,
                mdrc_id: result[0].MDRC_ID,
                med_dept_nm: result[0].MED_DEPT_NM,
                med_dt: result[0].MED_DT,
                med_rsv_dtm: result[0].MED_RSV_DTM,
                pt_no: result[0].PT_NO,
                pt_nm: result[0].PT_NM,
                mdrc_fom_seq: result[0].MDRC_FOM_SEQ,
                mdfm_id: result[0].MDFM_ID,
                mdfm_fom_seq: result[0].MDFM_FOM_SEQ
            }
          });
          window.location.reload(true);
      });
    } 
    else{
      console.log("아니오");
    }
  };

  return (
    <div className='div-main text'>
      <br/>
      <div className='div-verticalAlign'>
        <div className='div-holizonAlign-center'>
          <div className='font-str1' >사전문진</div>
          <div className='font-default'>
              이 완료되었습니다.
          </div>
        </div>

        <div className='div-holizonAlign-center'>
            <div className='font-default'>
                감사합니다.
            </div>
        </div>
        <br/>
      </div>

      <div className='div-holizonAlign-center'>
          <button className='btn-hover' onClick={reWrite}>다시 작성하기</button>
      </div> 
    </div>
    
  );
}

export default Submit;
