import {useState, useEffect, useRef} from 'react';
import './PreInterview.css';

const DIVIDER_HEIGHT = 5;
const Ques_num = 4;

function Question({question}){
    const answer = [
        {num:1,
        txt:"예"},
        {num:2,
        txt:"아니오"}
    ];

    const handleChange = (e) => {
        console.log('Radio Choice : ${e.target.value}');
        //console.log(`선택한 값 : ${e.target.value}`);
      };

    return(
        <div className='inner'>
            <b>{question.txt}<br/></b>
            
            {answer.map(answer=>(
                <div>
                    <input id={answer.id} type={'button'} value={answer.txt} />{answer.txt}<br></br>
                </div>
            ))}
        </div>
    );
}

function submit(Answer){
    console.log('${Answer}');
}

function PreInterview(){
    /* 값 가져오기
    const url = "https://bcexternal.cbnuh.or.kr/MC/Pre_InterView_DEV/api/Interface";
    const [questions, setQuestions] = useState(null);
    async function fetchData(){
        const response = await fetch(url);
        response.text().then((value)=>{
            setQuestions(JSON.parse(value));
        });
    }
    */

    const outerDivRef = useRef();
    const [scrollIndex, setScrollIndex] = useState(1);
    useEffect(() => {
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
    }, []);


    const questions = [
        {num:1,
        txt:"1번 질문"},
        {num:2,
        txt:"2번 질문"},
        {num:3,
        txt:"3번 질문"},
        {num:4,
        txt:"4번 질문"}
    ];

    return(
        <div ref={outerDivRef} className='outer'>
            <div className='header'>
                <label className='top-text'> 충북대학교병원<br/>사전문진표<br/></label>
                <label className='text'>홍길동님의 2023-01-01일 호흡기내과 사전문진표입니다.</label>
            </div>

            <div>
                {questions.map(question => (
                    <Question question={question} />
                  ))}
            </div>

            <div>
                <button className='submit' 
                        onClick={() => submit("Answer")}>제출하기</button>
            </div>
        </div>
    )
}


export default PreInterview;