import {React, useEffect, useState} from 'react';
import '../App.css'
import '../css/QuestionAnswerBody.css';



//질문&답변 목록
function QuestionAnswerBody({question, callback}){
    
    const answer = JSON.parse(question.ANS);

    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const [arrChkAns, SetArrChkAns] = useState([]);

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            const newHeight = window.innerHeight;
            setWindowHeight(newHeight);

            const userAgent = navigator.userAgent.toLowerCase();

            if(userAgent.indexOf("android")> -1){
                const bodyHeight = document.body.offsetHeight;
                const isKeyboardVisible = windowHeight > bodyHeight;
                
                setKeyboardVisible(isKeyboardVisible);

                if(isKeyboardVisible){
                    const top = document.getElementById('txtArea').clientHeight;
                    window.scrollTo(top, 0, "smooth");
                } else {
                    window.scrollTo(0,0);
                }
            }
        };

        const preventClose = (e) => {
            e.preventDefault();
            e.returnValue = ""; //Chrome에서 동작하도록; deprecated
        };

        window.addEventListener('resize', handleResize);
        //창이 닫히거나, 새로고침
        window.addEventListener("beforeunload", preventClose);
      
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener("beforeunload", preventClose);
        };
        
      }, []);


    useEffect(()=>{
        
    },[question]);

    function getInputValue(e) {

        if(e.target.type !== "textarea"){
        
            const chkAnsIndex = answer.findIndex(ans => ans.ANS_ID === e.target.value);

            if(chkAnsIndex < 0){
                // not found answer then error! 
                //console.log('getInputValue, not found checked value in answer.');
                return;
            }

            if(e.target.type === "checkbox" ){
                //console.log("e.target.type is checkbox.");
                if(e.target.checked === true){
                    //console.log("e.target.checked is true. so insert item.");
                    // checked then insert 
                    const existsChkAnsIndex = arrChkAns.findIndex(ans => ans.ANS_UNQ_ID === e.target.id);

                    if(existsChkAnsIndex > -1){
                        // included item
                        //console.log("included item.");
                    }else{
                        // not found item then insert
                        //console.log("insert into the item.");
                        const tempUpdatedSaveAnswers = [...arrChkAns];
                        tempUpdatedSaveAnswers.push({QST_ID: question.QST_ID,
                                                    ANS_ID: answer[chkAnsIndex].ANS_ID,
                                                    ANS_UNQ_ID : answer[chkAnsIndex].ANS_UNQ_ID,
                                                    REC_CNTE : "",
                                                    ANS_POST_QST_ID : answer[chkAnsIndex].ANS_POST_QST_ID
                                                    });
                        SetArrChkAns(tempUpdatedSaveAnswers);
                    }
                }else{
                    // unchecked then remove
                    //console.log("e.target.checked is false. so remove item.");
                    const existsChkAnsIndex = arrChkAns.findIndex(ans => ans.ANS_ID === e.target.value);

                    if(existsChkAnsIndex > -1){
                        // remove item
                        //console.log("remove item.");
                        SetArrChkAns(arrChkAns.filter(ans => ans.ANS_ID !== e.target.value));
                    }else{
                        //console.log("not found item.");
                        // not found item.
                    }
                }
            }

            if(e.target.type === "radio"){
                const tempUpdatedSaveAnswers = [];
                tempUpdatedSaveAnswers.push({QST_ID: question.QST_ID,
                                            ANS_ID: answer[chkAnsIndex].ANS_ID,
                                            ANS_UNQ_ID : answer[chkAnsIndex].ANS_UNQ_ID,
                                            REC_CNTE : e.target.value,
                                            ANS_POST_QST_ID : answer[chkAnsIndex].ANS_POST_QST_ID
                                            });
                SetArrChkAns(tempUpdatedSaveAnswers);

            }
        }
        if(e.target.type === "textarea" ){

            //console.log("getInputValue text, input value : " + e.target.value + ", e.target.id : " + e.target.id);
            const existsChkAnsIndex = arrChkAns.findIndex(ans => ans.ANS_ID === e.target.id);

            const temp = [...arrChkAns];
            temp[existsChkAnsIndex].ANS_RPY_CNTE = e.target.value;
            // SetArrChkAns(temp);

        }
        
    }

    return(
        <div className='question-outer'>
            <div id={question?.QST_DSP_SEQ} className='qustionBodyInner'>
                <div>
                    <b className='question'>Q. {question?.QST_CNTE}</b>
                    
                    <div >
                        
                        {answer?.map(ans=>(
                            <div>
                                <div className='answerText' key={question.ANS_UNQ_ID}>
                                    
                                    {(question.QST_CLS_CD === "S" ? true : false) &&
                                        <div>
                                            <input name={question.QST_ID} id={ans.ANS_UNQ_ID} type={'radio'} value={ans.ANS_ID} 
                                                checked={arrChkAns.findIndex(i => i.ANS_UNQ_ID === ans.ANS_UNQ_ID) > -1 ? true : false}
                                                onChange={getInputValue} />
                                            <label className='lb-question-cnte' htmlFor={ans.ANS_UNQ_ID}>{ans.ANS_CNTE}</label>
                                        </div>
                                    }

                                    {(question.QST_CLS_CD === "M" ? true : false) &&
                                        <div>
                                            <input name={question.QST_ID} id={ans.ANS_UNQ_ID} type={'checkbox'} value={ans.ANS_ID} 
                                                checked={arrChkAns.findIndex(i => i.ANS_UNQ_ID === ans.ANS_UNQ_ID) > -1 ? true : false}
                                                onChange={getInputValue} />
                                            <label className='lb-question-cnte' htmlFor={ans.ANS_UNQ_ID}>{ans.ANS_CNTE}</label>
                                        </div>
                                    }
                                </div>
                                <div id='txtArea'>
                                    
                                    {(ans.ANS_CLS_CD === "I" ? true : false) &&  (arrChkAns.findIndex(i => i.ANS_UNQ_ID === ans.ANS_UNQ_ID) > -1 ? true : false) &&
                                    <textarea className='txt-ans-rpy-cnte answerText' id={ans.ANS_ID} type={'text'} 
                                        disabled={arrChkAns.findIndex(i => i.ANS_UNQ_ID === ans.ANS_UNQ_ID) > -1 ? false : true}
                                        onChange={getInputValue} />
                                        }
                                </div>
                            </div>
                            
                        ))}
                    
                    </div>
                    <br/>
                </div>
            </div>
            <div className='div-holizonAlign-center'>
                <button className={`btn-question-hover`} // /*버튼 하단고정 기능 삭제*/ ${isBottomFixed ? 'bottom-question-fixed' : ''}`} 
                onClick={() => {
                        if(arrChkAns.length > 0){
                            callback(arrChkAns);
                        }
                    }
                }>다 음</button>
            </div>
            
        </div>
        
    );
}

export default QuestionAnswerBody;
