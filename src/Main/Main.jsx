import { useState, useEffect } from "react";

function Main() {
    const [ askedQuestion, setAskedQuestion ] = useState("")
    const API_KEY = "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"

    function askAway(){
    console.log("WHat's being asked? ",askedQuestion)
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

           
        
        </>
    )
}
export default Main;
