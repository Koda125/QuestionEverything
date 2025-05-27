import { useState, useEffect } from "react";
import OpenAI from "openai";
import './Game.css';

function Game() {
    const [ questions, setQuestions ] = useState([])
    const [ difficulty, setDifficulty ] = useState('Easy')
    const [ isTrue, setIsTrue ] = useState(false)

    const openai = new OpenAI({
        apiKey: "",
        dangerouslyAllowBrowser: true
        });

    async function TwoTruthsOneLie() {
        console.log("Can you determine the lie??😉")
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
            setQuestions([response.output_text, response2.output_text, response3.output_text])
            setIsTrue(true);
        
        }catch (err) {
            console.log("Error in the API request: ", err);
        }
    }

    async function verifyFact(event) {
        console.log(event)
    }

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
                <h2>Can you determine the lie in the following?</h2>
            {questions.map((question, index) => (
                <h4 key={index} onClick={(e)=>{verifyFact(question)}}>{question}</h4>
            ))}

            </div>
        :
            null
        
        }
        </div>
    )
}

export default Game;