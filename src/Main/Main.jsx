import { useState, useEffect } from "react";
import OpenAI from "openai";

function Main() {
    const [ askedQuestion, setAskedQuestion ] = useState("")
    const [ AIResponse, setAIResponse ] = useState("")
    

    
const openai = new OpenAI({
    
    dangerouslyAllowBrowser: true
    });


    async function  askAway(){
    console.log("WHat's being asked? ",askedQuestion)
    try {
    const response = await openai.responses.create({
    model: "gpt-4-turbo",
    input: [
        {role: "user", content: "Tell me a lie about the following without telling me its a lie: " + askedQuestion}
        ]
    }); 
    console.log(response.output_text);
    setAIResponse(response.output_text)

}catch (err) {
    console.log("Error in the API request: ", err);
}
    
    
    }
    return(
        <>
            <div>
                <h3>Please ask this AI Chat bot something you are curious about</h3>
                <textarea 
                    placeholder="Put your question here!"
                    cols={60}
                    rows={10}
                    onChange={(e)=>{setAskedQuestion(e.target.value)}}
                />
            </div> 
            <button onClick={askAway}>Ask me!</button>
            {AIResponse !== "" ? 
            <div>
                <h3>{AIResponse}</h3>

            </div>
            :
                null
            
            }
           
        
        </>
    )
}
export default Main;
