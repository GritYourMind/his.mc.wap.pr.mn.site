import {useState, useEffect, useRef} from 'react';
import '../css/PreInterview.css';
import getFetchData from '../hooks/getFetchData';
import ReactDOM from 'react-dom/client';
import React from 'react';
import Submit from './Submit';
import { useLocation } from 'react-router-dom';

const DIVIDER_HEIGHT = 5;
let Ques_num;
let submitInterview = [];   //답변 항목

//질문&답변 목록
function Question({question}){
    const answer = JSON.parse(question.ANS);

    return(
        <div className='inner'>
            <div>
                <b>{question.QST_NO}. {question.QST_CNTE}</b>
            
                {answer?.map(answer=>(
                    <div>
                        <input name={question.QST_ID} id={answer.ANS_ID} type={'radio'} value={answer.ANS_ID}
                               onChange ={()=>buttonClick(question,answer)} />{answer.ANS_CNTE}
                    </div>
                ))}
            </div>
        </div>
    );
}
/* onClick */
//라디오 버튼 클릭
function buttonClick(question,answer){
    const index = submitInterview.findIndex(item => item.QST_ID == question.QST_ID);
    if(index > -1) {
        const updatedSaveInterview = [...submitInterview];
        updatedSaveInterview[index].ANS_ID = answer.ANS_ID;
        updatedSaveInterview[index].ANS_CNTE = answer.ANS_CNTE;
        submitInterview = updatedSaveInterview;
    }
    else{
        const updatedSaveInterview = [...submitInterview];
        updatedSaveInterview.push({QST_ID: question.QST_ID,
                                    ANS_ID: answer.ANS_ID,
                                    ANS_CNTE : answer.ANS_CNTE});
        submitInterview = updatedSaveInterview;
    }
}

//제출하기 버튼 클릭
function submit(){
    if(submitInterview.length != Ques_num){
        alert("모든 항목에 답이 작성되지 않았습니다.");
    }
    else{
        const data = [{"method":"SavePreInterviewArray","HSP_TP_CD":"01"}];
        submitInterview?.map(p=>(
            data.push({"IN_ARR_HSP_TP_CD" : "01",
                       "IN_ARR_MDRC_ID" : "1",
                       "IN_ARR_MDRC_FOM_SEQ" : 1,
                       "IN_ARR_QST_ID" : p.QST_ID,
                       "IN_ARR_ANS_ID" : p.ANS_ID,
                       "IN_ARR_ANS_CNTE" : p.ANS_CNTE,
                       "IN_ARR_FSR_STF_NO" : "TEST",
                       "IN_ARR_FSR_PRGM_NM" : "사전문진표 작성",
                       "IN_ARR_FSR_IP_ADDR" : "."})))
        console.log(data);

        getFetchData(data, (result) => {
            console.log(result);
            if (result === undefined || result.length === 0) {
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(
                <React.StrictMode>
                    <Submit />
                </React.StrictMode>
                );
            }
            else{
                alert(result.m_message);
            }
        });
    }
}

function PreInterview(){

    
    const location = useLocation();

    
    const [questions, setQuestions] = useState();
    const outerDivRef = useRef();
    const [scrollIndex, setScrollIndex] = useState(1);

    useEffect(() => {
        const data = [
            {
                "method": "SelectPreMediQuesionList"
            },
            {
                "HSP_TP_CD": location.state.hsp_tp_cd,
                "MDFM_ID": location.state.mdfm_id,
                "MDFM_FOM_SEQ":location.state.mdfm_fom_seq
            }
        ];

        getFetchData(data, (result) => {
            setQuestions(result);
            Ques_num = result.length;
        });

        const wheelHandler = (e) => {
            e.preventDefault();
            const { deltaY } = e;
            const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
            const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.
      
            //Scroll Down
            if (deltaY > 0)
            {
                for(let i=1; i<=Ques_num; i++ ){
                    if(scrollTop >= pageHeight*(i-1) && scrollTop < pageHeight*i){
                        const p = (i==Ques_num)? i-1 : i;
    
                        outerDivRef.current.scrollTo({
                            top: pageHeight*p + DIVIDER_HEIGHT*p,
                            left:0,
                            behavior: "smooth",
                        });
                        setScrollIndex(p);
                    }
                }
            } 
            //Scroll Up
            else 
            {
                for(let i=1; i<=Ques_num; i++ ){
                    if(scrollTop >= pageHeight*(i-1) && scrollTop < pageHeight*i){
                        const p = (i==1)? i : i-1;
    
                        outerDivRef.current.scrollTo({
                            top: pageHeight*(p-1) + DIVIDER_HEIGHT*(p-1),
                            left:0,
                            behavior: "smooth",
                        });
                        setScrollIndex(p);
                    }
                }
            }
          };
          const outerDivRefCurrent = outerDivRef.current;
          outerDivRefCurrent.addEventListener("wheel", wheelHandler);
          return () => {
            outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
          };

    },[]);

    return(
        <div ref={outerDivRef} className='outer'>
            <div className='header'>
                <label className='top-text'> 충북대학교병원<br/>사전문진표<br/></label>
                <label className='text'>홍길동님의 2023-01-01일 호흡기내과 사전문진표입니다.</label>
            </div>

            <div>
                {questions?.map(question => (
                    <Question question={question} />
                ))}
            </div>

            <div>
                <button className='submit' onClick={() => submit()}>제출하기</button>
            </div>
        </div>
    )
}

export default PreInterview;