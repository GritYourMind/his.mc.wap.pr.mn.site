
import React from 'react';
import HomeHeader from '../js/Header';
import '../css/CheckIdentification.css'
import '../App.css'
import useFetch from '../hooks/useFetch';

const pt_nm = "_PT_NM";
const med_dt = "_MED_DT";
const med_dept_nm = "_MED_DEPT_NM";

//const {_url} = useParams();


//pt_no = introInfo.pt_no;
function CheckIdentification() {

    //const introInfo = useFetch("https://bcexternal.cbnuh.or.kr/mc/pre_interview_stg/api/interface"
    //                    ,"[{method:\"SelectPreMediIntroPageInfo\"},{HSP_TP_CD:\"01\", MDRC_ID:\"2\"}]" );

    
    const introInfo = useFetch("http://localhost:3000/data");

    

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



        </div>
    )
        
}

export default CheckIdentification;