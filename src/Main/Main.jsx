import { useState, useEffect } from "react";

function Main() {
    const [ askedQuestion, setAskedQuestion ] = useState("")
    

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
