import { createContext } from "react";
import runChat from "../config/gemini";
import React, { useState } from 'react';



export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    /*const onSent = async (prompt) => {
        try {
            const result = await runChat(prompt);
            console.log(result); // Display the result in the terminal
        } catch (error) {
            console.error(error);
        }
    };*/

    const delayPara = (index, nextWord) => {

        setTimeout(function(){
            setResultData(prev=>prev+nextWord);
        }, 75*index)

    }
    const onSent = async (prompt) => {

        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
       setPrevPrompts(prev=>[...prev,input]);

       const response = await runChat(input);


    /*    if (prompt !== undefined){
            response =await runChat(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await runChat(input)
        }*/

        let responseArray = response.split("**");
        let newArray= ""
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newArray += responseArray[i];
            }
            else {
                newArray += "<b>" + responseArray[i] + "</b>"
            }

        }
        let newResponse2 = newArray.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for(let i=0; i<newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")

        }
        //setResultData(newResponse2)
        setLoading(false)
        setInput("")
    }

    const handleClick = (item) => {
        setInput(item); // Set the clicked item as input
    }
    const handleCardClick = (prompt) => {
        setInput(prompt); // Set the card content as input
    }
    const handleNewChat = () => {
        // Clear all chat states
        setPrevPrompts([]);
        setRecentPrompt("");
        setShowResult(false);
        setLoading(false);
        setResultData("");
        setInput("");
    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        handleClick,
        handleCardClick,
        handleNewChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;