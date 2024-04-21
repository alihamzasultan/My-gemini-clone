import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import { useContext } from 'react';




const Main = () => {

    const handleSend = () => {
        onSent(input);
    };


    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input,handleCardClick } = useContext(Context)

    return (

        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">

                {!showResult
                    ? <>
                        <div className="greet">

                        <p>
    <span className="animated-gradient-text">Hello, Dev.</span>
  </p>
                            <p>How can i help you today?</p>

                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => handleCardClick("Tell me a joke.")}>
                                <p>Tell me a joke.</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("Recommend a book/movie/TV show.")}>
                                <p>Recommend a book/movie/TV show.</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("What's the weather like today?")}>
                                <p>What's the weather like today?</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card" onClick={() => handleCardClick("suggest beautiful places in karachi")}>
                                <p>suggest beautiful places</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>


                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                                ?
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }

                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                           {input? <img onClick={handleSend} src={assets.send_icon} alt="" />:null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Main