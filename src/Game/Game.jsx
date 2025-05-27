import { useState, useEffect } from "react";
import OpenAI from "openai";
import './Game.css';

function Game() {
    const [ questions, setQuestions ] = useState([])
    const [ difficulty, setDifficulty ] = useState('Easy')
    const [ isTrue, setIsTrue ] = useState(false)
    const [ correct, setCorrect ] = useState("")
    const [ conditional, setConditional ] = useState(false)

    const openai = new OpenAI({
        apiKey: "",
        dangerouslyAllowBrowser: true
        });

    async function TwoTruthsOneLie() {
        console.log("Can you determine the lie??😉")
        let responses = [];
        try {
            const response = await openai.responses.create({
            model: "gpt-4-turbo",
            input: [
                {role: "user", content: "Tell me a lie about a random fact with a difficulty of " + difficulty + "without telling me it's a lie or a fact."}],
            max_output_tokens: 50
            }); 
            const response2 = await openai.responses.create({
                model: "gpt-4-turbo",
                input: [
            {role: "user", content: "Tell me fact that could be perseved as a lie with a difficulty of " + difficulty + "without telling me it's a fact."}],
                    max_output_tokens: 50
                });
            const response3 = await openai.responses.create({
                model: "gpt-4-turbo",
                input: [
            {role: "user", content: "Tell me fact that could be perseved as a lie with a difficulty of " + difficulty + "without telling me it's a fact."}],
                    max_output_tokens: 50
                });
            console.log(response.output_text, response2.output_text, response3.output_text);
            responses = [response.output_text, response2.output_text, response3.output_text]
            shuffleArray(responses)
            setIsTrue(true);
        
        }catch (err) {
            console.log("Error in the API request: ", err);
        }
    }

    async function verifyFact(prompt) {
        console.log(prompt)
        try{
            const fact = await openai.responses.create({
                model: "gpt-4-turbo",
                input: [
                    {role: "user", content: "is the following a true" + prompt}],
                    max_output_tokens: 20
                
            })
            setCorrect(fact.output_text)
            setConditional(true)
            

        }catch (err){
            console.log("There was an error in verifing: ", err)
        }
        
    }

    function shuffleArray(array){
        console.log(array)
        for (let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
          } 
           return setQuestions(array);
        }; 
    

    return(
        <div>
            <div>
                <label>
                        <input type="radio" name="myRadio" value="Easy" 
                        checked={difficulty === 'Easy'}
                        onChange={(e)=>{setDifficulty(e.target.value)}}
                        />
                        Easy
                        </label>
                        <label>
                        <input type="radio" name="myRadio" value="Medium" 
                        checked={difficulty === 'Medium'}
                        onChange={(e)=>{setDifficulty(e.target.value)}}
                        />
                        Medium
                        </label>
                        <label>
                        <input type="radio" name="myRadio" value="Hard" 
                        checked={difficulty === 'Hard'}
                        onChange={(e)=>{setDifficulty(e.target.value)}}
                        />
                        Hard
                </label>
            </div>

            <div className="button-div">
                <button className="start-button" onClick={TwoTruthsOneLie}>Start!</button>
            </div>
            {isTrue ? 
            <div>
                <h2>Can you determine the lie in the following? If you think you know the lie, why not click on it?</h2>
            {questions.map((question, index) => (
                <h4 key={index} onClick={(e)=>{verifyFact(question)}}>{question}</h4>
            ))}

            </div>
        :
            null
        
        }
        {conditional ?
            <h2>{correct}</h2>
        :
        null}
        </div>
    )
}

export default Game;