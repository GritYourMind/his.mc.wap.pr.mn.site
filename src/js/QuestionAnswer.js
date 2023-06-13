import {useState, useEffect, React} from 'react';
import '../App.css'
import getFetchData from '../hooks/getFetchData';
import QuestionAnswerBody from './QuesionAnswerBody';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/QuestionAnswer.css';
function QuestionAnswer(){

    const location = useLocation();
    const navigate = useNavigate(null);
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState();
    const [submitInterview, SetSubmitInterview] = useState([]);
    const [ansDoneYN, setAnsDoneYN] = useState("N");
    const [quesLength, setQuesLength] = useState("0");
    const [progressRate, setProgressRate] = useState("0");
    const [postQstID, setPostQstID] = useState("0");

    useEffect(() => {

        const data = [
            {
                "biz":"HIS.MC.WAP.PR.BIZ.PreMedicalRecordBL",
                "method": "SelectPreMediQuesionList"
            },
            {
                "HSP_TP_CD": location.state.hsp_tp_cd,
                "MDFM_ID": location.state.mdfm_id,
                "MDFM_FOM_SEQ": location.state.mdfm_fom_seq
            }
        ];

        getFetchData(data, (result) => {
            setQuestions(result);
            //setQuestion(result[0]);
            setQuesLength(result.length);
        });
    },[]);

    useEffect(() =>{
        
        if(ansDoneYN === "Y"){
            submit();
        }else{
            setQuestion(questions[questions.findIndex(item => item.QST_ID === postQstID)]);
        }
        
    },[submitInterview]);

    useEffect(()=>{
        if(questions.length > 0){
             setQuestion(questions[0]);
        }

    },[questions])

    useEffect(() =>{
        let currentQuesNo;
        if(question){
            currentQuesNo = question?.QST_NO;
        }else{
            currentQuesNo = "0";
        }
        setProgressRate(currentQuesNo);
    },[question])

    function setAnswer(arrChkAns){
        
        let updatedSaveInterview = [];

        arrChkAns.map(removeItem => {
            updatedSaveInterview = (submitInterview.filter(item => (item.QST_ID+item.ANS_ID) !== (question.QST_ID+removeItem.ANS_ID) ));
        })

        arrChkAns.map(checkanswer => {
            
            if(!checkanswer){
                return;
            }

            setAnsDoneYN(checkanswer.ANS_POST_QST_ID === "999" ? "Y" : "N");
            setPostQstID(checkanswer.ANS_POST_QST_ID);
            
            let index = -1;

            if(updatedSaveInterview.length !== 0){
                index = updatedSaveInterview.findIndex(item => item.QST_ID === question.QST_ID && item.ANS_ID === checkanswer.ANS_ID);
            }
            
            if(index < 0) {
            
                updatedSaveInterview.push({QST_ID: question.QST_ID,
                                            ANS_ID: checkanswer.ANS_ID,
                                            ANS_CNTE : checkanswer.ANS_CNTE + checkanswer.ANS_RPY_CNTE});
            }
        })
        SetSubmitInterview(updatedSaveInterview);
    }


    //제출하기 버튼 클릭
    function submit(){

        const data = [
            {
                "biz":"HIS.MC.WAP.PR.BIZ.PreMedicalRecordBL",
                "method":"SavePreInterviewArray",
                "HSP_TP_CD":"01"
            }
        ];
        submitInterview?.map(p=>(
            data.push({"IN_ARR_HSP_TP_CD" : location.state.hsp_tp_cd,
                    "IN_ARR_MDRC_ID" : location.state.mdrc_id,
                    "IN_ARR_MDRC_FOM_SEQ" : location.state.mdrc_fom_seq,
                    "IN_ARR_QST_ID" : p.QST_ID,
                    "IN_ARR_ANS_ID" : p.ANS_ID,
                    "IN_ARR_ANS_CNTE" : p.ANS_CNTE,
                    "IN_ARR_FSR_STF_NO" : "TEST",
                    "IN_ARR_FSR_PRGM_NM" : "사전문진표 작성",
                    "IN_ARR_FSR_IP_ADDR" : "."})))

        getFetchData(data, (result) => {
            if (result === undefined || result.length === 0) {
                navigate("/submit", {state: location.state});
            }
            else{
                alert(result.m_message);
            }
        });
        
    }

    if(!question){
        return(
            <div>
                Loading...
            </div>
        );
    }
    else{
        return(
            <div className='div-verticalAlign'>
                <div id='top'>
                    <div className='questionTop'>
                        <div className='div-holizonAlign-left'>
                            <div className='font-question-top text-left'>진 료 과</div>
                            <div className='font-question-top'>: {location.state.med_dept_nm}</div>
                        </div>
                        <div className='div-holizonAlign-left'>
                            <div className='font-question-top text-left'>예약일시</div>
                            <div className='font-question-top'>: {location.state.med_rsv_dtm}</div>
                        </div>
                        <div className='div-holizonAlign-left'>
                            <div className='font-question-top text-left'>성 명</div>
                            <div className='font-question-top'>: {location.state.pt_nm}</div>
                        </div>

                        <div className='progress-container'>
                            <progress value={progressRate} max={quesLength} />
                            <span>{progressRate}/{quesLength}</span>    
                        </div>
                    </div>
                </div>
                <QuestionAnswerBody question={question} callback={setAnswer}/>
            </div>
        );
    }
}
export default QuestionAnswer;
