
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


     function isBirthday(dateStr) {

        dateStr = dateStr.replace(/-/g,"");

        var year = Number(dateStr.substr(0,4)); // 입력한 값의 0~4자리까지 (연)
        var month = Number(dateStr.substr(4,2)); // 입력한 값의 4번째 자리부터 2자리 숫자 (월)
        var day = Number(dateStr.substr(6,2)); // 입력한 값 6번째 자리부터 2자리 숫자 (일)
        var today = new Date(); // 날짜 변수 선언
    
        if (dateStr.length <=8) {
        
            if (month < 1 || month > 12) {
                return false;
            } else if (day < 1 || day > 31) {
                return false;
            } else if ((month==4 || month==6 || month==9 || month==11) && day==31) {
                return false;
            } else if (month == 2) {
    
                var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
                if (day>29 || (day==29 && !isleap)) {
                    return false;
                } else {
                    return true;
                } //end of if (day>29 || (day==29 && !isleap))
            } else {
                return true;
            }//end of if
        }
        else {
            //1.입력된 생년월일이 8자 초과할때 :  auth:false
            return false;
        }
    }

     function checkIdentification(in_birth_dt){

        //console.log(hsp_tp_cd);
        //console.log(mdrc_id);

        //sconsole.log(in_birth_dt.length);

        if(!isBirthday(in_birth_dt)){
            alert("생년월일을 확인해주세요.");
            return;
        }

        
        const data = [
            {
                "method": "SelectPatientIdentificationYN"
            },
            {
                "HSP_TP_CD": hsp_tp_cd,
                "MDRC_ID": mdrc_id,
                "BIRTH_DT": in_birth_dt.replace(/-/gi,"")
            }
        ];


        getFetchData(data, (result) => {
            result.map(n => (
                 console.log(n.LOGIN_CHK)
            )
            );
        });
     }


     const handleBirthDt = (e) => {
        
        const value = e.target.value.replace(/\D+/g, "");
        const numberLength = 8;
    
        let result;
        result = "";  
    
        for (let i = 0; i < value.length && i < numberLength; i++) {
          switch (i) {
            case 4:
              result += "-";
              break;
            case 6:
              result += "-";
              break;
    
            default:
              break;
          }
    
          result += value[i];
        }

        e.target.value = result;
    
        
    
        setBirthDate(result); 
      };



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
            
            result?.map((n) => (
                 setPtno(n.PT_NO),
                 setPtnm(n.PT_NM),
                 setMedDt(n.MED_DT),
                 setMedDeptNm(n.MED_DEPT_NM)
            )
            );
        });
    },[]);

    return(
        
        <div className='div-main'>
            
            <HomeHeader/>

            <div className='div-verticalAlign'>
                <div className='div-holizonAlign-left'>
                    <div className='font-green' >
                        {pt_nm}
                    </div>
                    <div className='font-default'>
                        님 안녕하세요
                    </div>
                </div>

                <div className='div-holizonAlign-left'>
                    <div className='font-default'>
                        {med_dt} {med_dept_nm}
                    </div>
                </div>

                <div className='font-default'>
                    사전문진을 시작합니다.
                </div>
            </div>

            <br/>

            <div className='div-verticalAlign'>
                <div className='div-holizonAlign-left' >
                    <div className='font-default'>
                        본인확인을 위해 
                    </div>
                </div>
            </div>

            <div className='div-verticalAlign'>
                <div className='div-holizonAlign-left'>
                    <div className='font-green'>
                        생년월일
                    </div>
                    <div className='font-default'>
                        을 입력해주세요.
                    </div>
                </div>
            </div>

            <br/>

            <div className='div-verticalAlign'>
                <input className='input-text' type="text" value={txt_birth_dt}  placeholder="생년월일 8자(YYYY-MM-DD)" onChange={e => {
                    handleBirthDt(e);
                }}/>
                <div className='div-line'/>
            </div>
            <div className='div-holizonAlign-center'>
                <button className='button-okey' onClick={
                    e => {
                        checkIdentification(txt_birth_dt);
                    }
                }>확 인</button>
            </div> 
        </div>
    )
}
export default CheckIdentification;