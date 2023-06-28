
import {React, useState,useEffect} from 'react';
import '../css/CheckIdentification.css'
import '../App.css'
import getUrlParam from '../hooks/getUrlParameter';
import getFetchData from '../hooks/getFetchData';
import {useNavigate} from 'react-router-dom';

function CheckIdentification() {

    //#region State
    //url param
    const hsp_tp_cd = (getUrlParam(window.location, "H"));
    const mdrc_id = (getUrlParam(window.location, "M"));

    //fetch data
    const [pt_no, setPtno] = useState("");
    const [pt_nm, setPtnm] = useState("");
    const [med_dt, setMedDt] = useState("");
    const [med_dept_nm, setMedDeptNm] = useState("");

    const [med_rsv_dtm, setMedRsvDtm] = useState("");
    const [mdrc_fom_seq, setMdrcFomSeq] = useState("");
    const [mdfm_id, setMdfmId] = useState("");
    const [mdfm_fom_seq, setMdfmFomSeq] = useState("");


    //valiable
    const [txt_birth_dt, setBirthDate]= useState("");
    const [login_chk_yn, setLoginCheckYN] = useState(null);
    // const [submit_chk_yn, setSubmitCheckYN] = useState("N");

    //navigate
    const navigate = useNavigate();


     //#endregion


     //#region function

     function RoutePreinterview(in_login_yn){

        if(in_login_yn == "Y"){
            navigate("/submit",{
                state: {
                    hsp_tp_cd:hsp_tp_cd ,
                    mdrc_id:mdrc_id,
                    med_dept_nm:med_dept_nm,
                    med_dt:med_dt,
                    med_rsv_dtm:med_rsv_dtm,
                    pt_no:pt_no,
                    pt_nm:pt_nm,
                    mdrc_fom_seq:mdrc_fom_seq,
                    mdfm_id:mdfm_id,
                    mdfm_fom_seq:mdfm_fom_seq
                }
            });
            return;
        }

        navigate("/question",{
            state: {
                hsp_tp_cd:hsp_tp_cd ,
                mdrc_id:mdrc_id,
                med_dept_nm:med_dept_nm,
                med_dt:med_dt,
                med_rsv_dtm:med_rsv_dtm,
                pt_no:pt_no,
                pt_nm:pt_nm,
                mdrc_fom_seq:mdrc_fom_seq,
                mdfm_id:mdfm_id,
                mdfm_fom_seq:mdfm_fom_seq
            }
          });
     }


     function IsBirthday(dateStr) {

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

     function CheckSubminYN(in_login_yn){
        
        if (in_login_yn == "N"){
            return;
        }
        const first_data = [
            {
                "biz":"HIS.MC.WAP.PR.BIZ.PreMedicalRecordBL",
                "method": "SelectPreWrittenYN"
            },
            {
                "HSP_TP_CD": hsp_tp_cd,
                "MDRC_ID": mdrc_id
            }
        ];
         getFetchData(first_data, (result) => {
            
            //if(result[0].MDRC_WRT_STS_CD != "N"?"Y":"N"){
                RoutePreinterview(result[0].MDRC_WRT_STS_CD != "N"?"Y":"N");
            //}
        });

        
    }


     function CheckIdentificationYN(in_birth_dt){
        const isBirthday = IsBirthday(in_birth_dt)
        if(!isBirthday){
            setLoginCheckYN(isBirthday);
            return;
        }

        
        const data = [
            {
                "biz":"HIS.MC.WAP.PR.BIZ.PreMedicalRecordBL",
                "method": "SelectPatientIdentificationYN"
            },
            {
                "HSP_TP_CD": hsp_tp_cd,
                "MDRC_ID": mdrc_id,
                "BIRTH_DT": in_birth_dt.replace(/-/gi,"")
            }
        ];


         getFetchData(data, (result) => {
            setLoginCheckYN(result[0].LOGIN_CHK == "Y"?true:false);
            //if(result[0].LOGIN_CHK == "Y"){
                CheckSubminYN(result[0].LOGIN_CHK);
            //}
        });

     }

     const HandleBirthDt = (e) => {
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

        if(hsp_tp_cd == undefined || hsp_tp_cd == null){
            navigate("/");
            return;
        }

        if(mdrc_id == undefined || mdrc_id == null){
            navigate("/");
            return;
        }

        const data = [
            {
                "biz":"HIS.MC.WAP.PR.BIZ.PreMedicalRecordBL",
                "method": "SelectPreMediIntroPageInfo"
            },
            {
                "HSP_TP_CD": hsp_tp_cd,
                "MDRC_ID": mdrc_id
            }
        ];
    
        getFetchData(data, (result) => {
            if(result === undefined || result.length == 0){
               navigate("/"); 
               return;
            }
            else{
                result?.map((n) => (
                    setPtno(n.PT_NO),
                    setPtnm(n.PT_NM),
                    setMedDt(n.MED_DT),
                    setMedDeptNm(n.MED_DEPT_NM),
                    setMedRsvDtm(n.MED_RSV_DTM),
                    setMdrcFomSeq(n.MDRC_FOM_SEQ),
                    setMdfmId(n.MDFM_ID),
                    setMdfmFomSeq(n.MDFM_FOM_SEQ)
                ));
            }
        });
    },[]);

    /* 모바일 키패드 오픈 시 하단 고정 해제 */
    const [isBottomFixed, setIsBottomFixed] = useState(true);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    useEffect(() => {
    
        const handleResize = () => {
            const newHeight = window.innerHeight;
            /*버튼 하단고정 기능 삭제*/
            /*
            if (newHeight < windowHeight) {
                setIsBottomFixed(false);
            } else {
                setIsBottomFixed(true);
            }
            */
            setWindowHeight(newHeight);
        };

        window.addEventListener('resize', handleResize);
      
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return(
        
        <div className='div-main'>
            <br />
            <div className='div-verticalAlign'>
                <div className='div-holizonAlign-left'>
                    <div className='font-ptnm' >
                        {pt_nm}
                    </div>
                    <div className='font-default'>
                        님 안녕하세요.
                    </div>
                </div>

                <div className='div-holizonAlign-left'>
                    <div className='font-default'>
                        {med_dt} {med_dept_nm}
                    </div>
                </div>

                <div className='div-holizonAlign-left'>
                    <div className='font-default'>
                        사전문진을 시작합니다.
                    </div>
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
                    <label className='font-str1'>생년월일</label>
                    <label className='font-default'>을 입력해주세요.</label>
                </div>
            </div>

            <br/>

            <div className='div-verticalAlign'>
                <input className='input-text' type="text" value={txt_birth_dt}  placeholder="생년월일 8자(YYYY-MM-DD)" onChange={e => {
                    HandleBirthDt(e);
                }}/>
                <div className='div-line'/>
                <div className='div-check-brithday'>
                    {login_chk_yn ==false ? '* 생년월일을 확인해주세요.':''}
                </div>
            </div>
            <div className='div-holizonAlign-center'>
                <button className={`btn-hover`} // /*버튼 하단고정 기능 삭제*/ ${isBottomFixed ? 'bottom-fixed' : ''}`} 
                    onClick={e => {
                        CheckIdentificationYN(txt_birth_dt);
                    }
                }>확 인</button>
            </div> 
        </div>
    )
}
export default CheckIdentification;

