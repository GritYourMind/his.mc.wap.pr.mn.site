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
    const [defaultAns, SetDefaultAns] = useState([]);
    const [isBackButton, SetIsBackButton] = useState(false);

    useEffect(() => {

        const data = [
            {
                "biz":"HIS.MC.WAP.PR.BIZ.PreMedicalRecordBL",
                "method": "SelectPreMediQuesionList"
            },
            {
                "HSP_TP_CD": location.state.hsp_tp_cd,
                "MBFM_ID": location.state.mbfm_id,
                "MBFM_FOM_SEQ": location.state.mbfm_fom_seq
            }
        ];

        getFetchData(data, (result) => {
            setQuestions(result);
            setQuesLength(result.length);
        });
    },[]);

    useEffect(() =>{
        if(isBackButton === true){
            return;
        }

        if(ansDoneYN === "Y"){
            submit();
        }else{
            if(submitInterview.findIndex(item => item.QST_ID === postQstID) >= 0 ){
                SetDefaultAns(submitInterview.filter(item => item.QST_ID === postQstID));
            }else{
                setQuestion(questions[questions.findIndex(item => item.QST_ID === postQstID)]);
            }
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
            currentQuesNo = question?.QST_DSP_SEQ;
        }else{
            currentQuesNo = "0";
        }
        setProgressRate(currentQuesNo);
    },[question])

    useEffect(() => {
        setQuestion(questions[questions.findIndex(item => item.QST_ID === defaultAns[0].QST_ID)]);
    },[defaultAns])

    function setAnswer(arrChkAns){
        
        SetIsBackButton(false);
        let updatedSaveInterview = [];

        arrChkAns.map(removeItem => {
            updatedSaveInterview = (submitInterview.filter(item => (item.QST_ID) !== (question.QST_ID) ));
        })

        arrChkAns.map(checkanswer => {
            
            if(!checkanswer){
                return;
            }

            setAnsDoneYN(checkanswer.ANS_POST_QST_ID === "END" ? "Y" : "N");
            setPostQstID(checkanswer.ANS_POST_QST_ID);
            
            let index = -1;

            if(updatedSaveInterview.length !== 0){
                index = updatedSaveInterview.findIndex(item => item.QST_ID === question.QST_ID && item.ANS_ID === checkanswer.ANS_ID);
            }
            
            if(index < 0) {
            
                updatedSaveInterview.push({QST_ID: question.QST_ID,
                                            ANS_ID: checkanswer.ANS_ID,
                                            ANS_UNQ_ID : checkanswer.ANS_UNQ_ID, 
                                            REC_CNTE : (checkanswer.REC_CNTE === undefined? "":checkanswer.REC_CNTE),
                                            ANS_POST_QST_ID : checkanswer.ANS_POST_QST_ID
                                        });
            }
        })
        SetSubmitInterview(updatedSaveInterview);
    }


    function setBackQuestion(){
        SetIsBackButton(true);
        console.log("setBackQuestion Call, submitInterview length " + submitInterview.length);

         SetSubmitInterview(submitInterview.filter(item => (item.QST_ID) !== (question.QST_ID) ));

        if(submitInterview.length > 0){
            console.log("question.QST_ID is " + question.QST_ID);

            let pre_qst_index = submitInterview.findIndex(item => item.ANS_POST_QST_ID === question.QST_ID);

            if(pre_qst_index >= 0 ){
                console.log("setBackQuestion Call, pre_qst_index " + pre_qst_index);
                SetDefaultAns(submitInterview.filter(item => item.QST_ID === submitInterview[pre_qst_index].QST_ID));
            }
            
        }
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
                    "IN_ARR_MBRC_ID" : location.state.mbrc_id,
                    "IN_ARR_MBRC_FOM_SEQ" : location.state.mbrc_fom_seq,
                    "IN_ARR_QST_ID" : p.QST_ID,
                    "IN_ARR_ANS_ID" : p.ANS_ID,
                    "IN_ARR_REC_CNTE" : p.REC_CNTE,
                    "IN_ARR_FSR_STF_NO" : ".",
                    "IN_ARR_FSR_PRGM_NM" : "사전문진웹",
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
                <br></br>
                <div id='top'>
                    <div className='questionTop'>
                        <div className='div-holizonAlign-left'>
                            <div className='font-question-top text-center'>진 료 과</div>
                            <div className='top-colon'>:</div>
                            <div className='font-question-top'>{location.state.med_dept_nm}</div>
                        </div>
                        <div className='div-holizonAlign-left'>
                            <div className='font-question-top text-center'>예약일시</div>
                            <div className='top-colon'>:</div>
                            <div className='font-question-top'>{location.state.med_rsv_dtm}</div>
                        </div>
                        <div className='div-holizonAlign-left'>
                            <div className='font-question-top text-center'>성 명</div>
                            <div className='top-colon'>:</div>
                            <div className='font-question-top'> {location.state.pt_nm}</div>
                        </div>

                        <div className='progress-container'>
                            <progress value={progressRate} max={quesLength} />
                            <span>{Math.round(progressRate*100/quesLength)}%</span>    
                        </div>
                    </div>
                </div>
                <br></br>
                <QuestionAnswerBody question={question} nextQuestionCallback={setAnswer} backQuestionCallback={setBackQuestion} arrDefaultChkAns={defaultAns}/>
            </div>
        );
    }
}
export default QuestionAnswer;
