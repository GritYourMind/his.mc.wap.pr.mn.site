
import {React, useState,useEffect} from 'react';
import HomeHeader from '../js/Header';
import '../css/CheckIdentification.css'
import '../App.css'
import getUrlParam from '../hooks/getUrlParameter';
import getFetchData from '../hooks/getFetchData';


function CheckIdentification() {

    //#region State
    //url param
    const hsp_tp_cd = (getUrlParam(window.location, "HSP_TP_CD"));
    const mdrc_id = (getUrlParam(window.location, "MDRC_ID"));

    //fetch data
    const [pt_no, setPtno] = useState("");
    const [pt_nm, setPtnm] = useState("");
    const [med_dt, setMedDt] = useState("");
    const [med_dept_nm, setMedDeptNm] = useState("");

    //valiable
    const [txt_birth_dt, setBirthDate]= useState("");
     //#endregion


     //#region function

     function checkIdentification(in_birth_dt){
        
        const data = [
            {
                "method": "SelectPatientIdentificationYN"
            },
            {
                "HSP_TP_CD": hsp_tp_cd,
                "MDRC_ID": mdrc_id,
                "BIRTH_DT": in_birth_dt
            }
        ];


        getFetchData(data, (result) => {
            result.map(n => (
                 console.log(n.LOGIN_CHK)
            )
            );
        });
     }

     //#endregion
     

    useEffect(() =>{
        
        const data = [
            {
                "method": "SelectPreMediIntroPageInfo"
            },
            {
                "HSP_TP_CD": hsp_tp_cd,
                "MDRC_ID": mdrc_id
            }
        ];
    
        getFetchData(data, (result) => {
            result.map(n => (
                 setPtno(n.PT_NO),
                 setPtnm(n.PT_NM),
                 setMedDt(n.MED_DT),
                 setMedDeptNm(n.MED_DEPT_NM)
            )
            );
        });
    },[]);

    return(
        
        <div >
            <HomeHeader/>
            <div className='ChkIdent-holizonAlign'>
                <div className='ChkIdent-green'>
                    {pt_nm}
                </div>
                <div className='ChkIdent-default'>
                    님 안녕하세요
                </div>
            </div>
            

            <div className='ChkIdent-default'>
                {med_dt} {med_dept_nm}
            </div>

            <div className='ChkIdent-default'>
                사전문진을 시작합니다.
            </div>

            <div className='display-enter'/>

            <div className='ChkIdent-holizonAlign'>
                <div className='ChkIdent-default'>
                    본인확인을 위해 
                </div>
                <div className='ChkIdent-green'>
                     생년월일
                </div>
                <div className='ChkIdent-default'>
                    을 입력해주세요.
                </div>
            </div>

            <div>
                <input type="number" value={txt_birth_dt} onChange={e => {
                    setBirthDate(e.target.value);
                }}/>
            </div>
            <div>
                <button className='ChkIdent-okey' onClick={
                    e => {
                        checkIdentification(txt_birth_dt);
                    }
                }>확인</button>
            </div> 
        </div>
    )
}
export default CheckIdentification;