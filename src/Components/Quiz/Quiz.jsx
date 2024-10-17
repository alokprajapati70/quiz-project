import React, { useRef, useState } from 'react'
import "./Quiz.css"
import { data } from '../../assets/data';

const Quiz = () => {
    let [ index,setIndex]=useState(0);
    let[ question,setQuestion]=useState(data[index]);
    let[ lock, setLock]= useState(false);
    let [score, setScore]= useState(0);
    let [ result, setResult]= useState(false)


    let Option1=useRef(null);
    let Option2=useRef(null);
    let Option3=useRef(null);
    let Option4=useRef(null);
    
    let option_array=[ Option1,Option2, Option3, Option4]
    
    const cheakAns=(e,ans)=>{
        if(lock=== false){
        if(question.ans===ans){
            e.target.classList.add("correct");
            setLock(true);
            setScore(prev=>prev+1);

        }else{
            e.target.classList.add("wrong");
            setLock(true);
            option_array[question.ans-1].current.classList.add("correct");
        }
    }
}



const next =()=>{
    if(lock===true){

            if (index=== data.length-1){
             setResult(true);
             return 0;
             
            }

        setIndex(++index);
        setQuestion(data[index]);
        setLock(false);
        option_array.map((Option)=>{
            Option.current.classList.remove("wrong");
            Option.current.classList.remove("correct");
            return null;
        })
    }
}
const reset =()=>{
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false); 
    setResult(false);
}
const previous = () => {
    if (index > 0) {
        setIndex(prev => prev - 1);
        setQuestion(data[index - 1]);
        setLock(false);
        resetOptions();
    }
};


  return (
     <div className='container'>

         <div class="sign">
       <span class="fast-flicker">q</span>uiz<span class="flicker">a</span>pp
     </div>
         {/* <h1>Quiz App</h1>  */}
        <hr/>
        {result?<></>:<>
        <h2>{index+1}.{question.question}  </h2>
        <ul>
            <li ref={Option1} onClick={(e)=>{cheakAns(e,1)}}>{question.Option1}</li>
            <li ref={Option2} onClick={(e)=>{cheakAns(e,2)}}>{question.Option2} </li>
            <li ref={Option3 } onClick={(e)=>{cheakAns(e,3)}}>{question.Option3} </li>
            <li ref={Option4} onClick={(e)=>{cheakAns(e,4)}}>{question.Option4} </li>
        </ul>
        <button className='glow-on-hover'   onClick={next}> Next</button>
        <button  className='glow-on-hover'   onClick={previous} disabled={index === 0}>Previous</button>
       
        <div className='index'> {index+1}of {data.length}</div>
    
    
    </>}

    {result?<>
    <h2> You Score - {score} Out  Of { data.length} </h2>
    <button className='glow-on-hover' onClick={reset}>Reset</button>
  </>:<></>  }
    </div>
  )
}

export default Quiz


