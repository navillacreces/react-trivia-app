import './App.css';
import React, { useEffect} from 'react';
import {useSPC} from './StateProvider';
import Quiz from 'react-quiz-component';


function App() {

  

  const [{quiz, questionsBool},dispatch] = useSPC();

  // like component did load
  useEffect(() => {
    document.title = `React Trivia Game`;

    Promise.all([
      fetch('https://opentdb.com/api.php?amount=10&category=20'), //  mythology
      fetch('https://opentdb.com/api.php?amount=10&category=23'), //history
      fetch('https://opentdb.com/api.php?amount=10&category=18') // computer science
    ])
    .then(([mythRes, hisRes,csRes]) => {
      if (!mythRes.ok)
          return mythRes.json().then(e => Promise.reject(e));
      if (!hisRes.ok)
          return hisRes.json().then(e => Promise.reject(e));
      if (!csRes.ok)
          return csRes.json().then(e => Promise.reject(e));
  
      return Promise.all([mythRes.json(), hisRes.json(),csRes.json()]);
  
    })
    .then(([mythQs,hisQs,csQs]) => {
     
      
      const historyQuestions = hisQs.results;
      const mythologyQuestions = mythQs.results;
      const csQuestions = csQs.results;

      
        const totalArray = historyQuestions.concat(mythologyQuestions).concat(csQuestions);
        const qArray = [];
       

        for (let x = 0 ; x < totalArray.length; x++){
            let currentQ = totalArray[x];
            let q = currentQ.question;
            let answers = currentQ.incorrect_answers.concat(currentQ.correct_answer).sort(() => Math.random() - 0.5);
            let correctAns = answers.indexOf(currentQ.correct_answer) + 1;
            let ex = currentQ.correct_answer;
      

            function Question(question,answers,correctAnswer, ex){
              this.question = question;
              this.questionType = "text";
               this.questionPic = "";
              this.answers = answers;
              this.correctAnswer = correctAnswer.toString();
              this.messageForCorrectAnswer = "Correct!";
              this.messageForIncorrectAnswer = "wrong";
              this.explanation = ex;
              this.point = "1";
              this.answerSelectionType = 'single';
          }
            const ques = new Question(q,answers,correctAns, ex);
            qArray.push(ques);
        }
        quiz.questions = qArray;
        
        dispatch({
          type: 'SET_QUESTIONS_BOOL',
          questionsBool: true
        }) 
        
    })
    .catch(error => {
      console.error({error});
      dispatch({
        type: 'SET_QUESTIONS_BOOL',
        questionsBool: false
      })
  })
   
  },[]);
 

  return (
    <>
      {
        questionsBool ? <Quiz quiz={quiz} /> : <h1>Loading App...</h1>
      }
    </>
  
  );
}

export default App;
