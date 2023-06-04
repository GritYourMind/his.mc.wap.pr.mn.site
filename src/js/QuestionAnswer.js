import {useState, useEffect, React} from 'react';
import '../App.css'
import getFetchData from '../hooks/getFetchData';
import { useLocation } from 'react-router-dom';
import QuestionAnswerBody from './QuesionAnswerBody';
import { getSuggestedQuery } from '@testing-library/react';
import { ConsoleView } from 'react-device-detect';

function QuestionAnswer(){

    let questionIndex = 0;
    const location = useLocation();
    
    const [questions, setQuestions] = useState();
    const [question, setQuestion] = useState();

    let submitInterview = [];   // 답변 항목

    useEffect(() => {
        
        console.log("load QuestionAnswer js");
        console.log("loaction.state.hsp_tp_cd : " + location.state.hsp_tp_cd);

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
            setQuestion(result[questionIndex]);
        });
    },[]);

    function Callbacktest(testnumber){
        console.log("callbacktest : " + testnumber);
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
            <div>
                <QuestionAnswerBody question={question} callback={Callbacktest}/>
            </div>
        );
    }
}
export default QuestionAnswer;
