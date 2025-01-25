/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import soundButton from '../assets/speaker.svg';
import languages from "../languages/language";
import swapButton from '../assets/arrow-left-right.svg'

function Translator() {

    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");

    const [inputLanguage, setInputLanguage] = useState("en-GB"); // default input language is english
    const [outputLanguage, setOutputLanguage] = useState("hi-IN"); // default output language is hindi

    const [loading, setLoading] = useState(false); // loading state

    function handleSwapBetweenTextAndLanguage() {
        //text
        let tempText = inputText;
        setInputText(outputText);
        setOutputText(tempText);

        //language
        let tempLanguage = inputLanguage;
        setInputLanguage(outputLanguage);
        setOutputLanguage(tempLanguage);
    }


    //speak functionality
    const utterText = (text, lanuage) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lanuage;
        window.speechSynthesis.speak(utterance);
    };


    const speak = (text, lan) => {
        utterText(text, lan);
    };


    function handleTranslator() {
        setLoading(true);
        const url = `https://api.mymemory.translated.net/get?q=${inputText}&langpair=${inputLanguage}|${outputLanguage}`;

        axios.get(url).then((res) => {
            setOutputText(res.data.responseData?.translatedText);
            setLoading(false);
        })
    };



    return (
        <>
            <section className="w-1/2 mx-auto text-center rounded my-28">
                <h1 className="text-5xl font-bold">Trans Lingo</h1>
                <div className="flex justify-between py-6">
                    <div className="w-1/2 border rounded-md shadow-md">
                        {/* text area for input language */}
                        <textarea
                            name="input-text"
                            id="input-text"
                            placeholder="Enter Text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full p-2 focus:outline-gray-200"
                            rows={8} >
                        </textarea>

                        <div className="flex items-center justify-between w-full gap-2 p-2 border rounded-md">
                            {/* speak area for input text and language */}
                            <img
                                onClick={() => speak(inputText, inputLanguage)}
                                className="rounded-sm cursor-pointer hover:bg-gray-200"
                                src={soundButton}
                                alt="speak" />

                            <select
                                name="input-language"
                                id="input-language"
                                value={inputLanguage}
                                onChange={(e) => setInputLanguage(e.target.value)}
                                className="w-full p-1 border border-gray-200 outline-gray-500">

                                {Object.entries(languages).map(([code, name]) => (
                                    <option key={code} value={code}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>


                    <img
                        className="my-auto cursor-pointer"
                        onClick={handleSwapBetweenTextAndLanguage}
                        src={swapButton}
                        alt="inter-change" />

                    <div className="w-1/2 border rounded-md">
                        {/* translated language text area or Output language text area */}
                        <textarea
                            name="output-text"
                            id="output-text"
                            value={outputText}
                            onChange={(e) => setOutputText(e.target.value)}
                            className="w-full p-2 focus:outline-gray-300"
                            rows={8}
                        ></textarea>

                        <div className="flex items-center justify-between w-full gap-2 p-2 border rounded-md shadow-md">
                            <img
                                onClick={() => speak(outputText, outputLanguage)}
                                className="rounded-sm cursor-pointer hover:bg-gray-100"
                                src={soundButton}
                                alt="speak" />

                            <select
                                name="output-language"
                                id="output-language"
                                value={outputLanguage}
                                onChange={(e) => setOutputLanguage(e.target.value)}
                                className="w-full p-1 border border-gray-200 outline-gray-500"
                            >
                                {Object.entries(languages).map(([code, name]) => (
                                    <option key={code} value={code}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* button for translation */}
                <button
                    className="w-full p-2 text-white bg-gray-800 border rounded-md hover:bg-gray-600"
                    onClick={handleTranslator}
                >
                    {loading ? "Translating..." : "Translate Text"}
                </button>
            </section>
        </>
    )

}

export default Translator;