

export const initialState ={

    questionsBool : null,
    quiz: {
        "quizTitle" : "React Trivia Game",
        "quizSynopsis" : "A react game written with functional components. Test your knowledge on history, mythology, and computer science.",
        "questions": []
    
    }
};


const reducer = (state,action) => {


    switch(action.type){

        case 'SET_QUESTIONS_BOOL':
            return {
                ...state,
                questionsBool: action.questionsBool
            }

            
        default:
            return state;
    }
}

export default reducer;