import { useState, useEffect } from "react";
import OpenAI from "openai";

function Main() {
    const [ askedQuestion, setAskedQuestion ] = useState("")
    const [ AIResponse, setAIResponse ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false);
    

    
const openai = new OpenAI({
    apiKey: "",
    dangerouslyAllowBrowser: true
    });


    async function  askAway(){
    console.log("What's being asked? ",askedQuestion)
    try {
        setIsLoading(true);
        setAIResponse("")
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
}finally{
    setIsLoading(false);

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
            {isLoading ? 
            <h3>Please wait while we complile and answer for you...</h3>
            :
            null }
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
