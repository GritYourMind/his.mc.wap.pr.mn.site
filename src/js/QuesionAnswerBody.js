import {React, useEffect, useState} from 'react';
import '../App.css'

//질문&답변 목록
function QuestionAnswerBody({question}){
    
    const answer = JSON.parse(question.ANS);

    return(
        <div id={question?.QST_NO} className='inner'>
            <div>
                <b>{question?.QST_NO}. {question?.QST_CNTE}</b>
                
                {answer?.map(answer=>(
                    <div className='answer' key={question.QST_ID}>
                        <input name={question.QST_ID} id={answer.ANS_UNQ_ID} type={'radio'} value={answer.ANS_ID}
                            onChange={this.props.callback(1)}
                        />
                        <label htmlFor={answer.ANS_UNQ_ID}>{answer.ANS_CNTE}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuestionAnswerBody;
