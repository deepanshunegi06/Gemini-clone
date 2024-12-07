import { createContext, useState } from "react";
import runChat from "../config/Gemini";
                              
// Create a new context to be used by the application
export const Context = createContext();

const ContextProvider = (props) => {
    // State variables to manage various aspects of the chat application
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [error, setError] = useState(null);

    // Function to simulate typing effect by adding each character one by one with a delay
    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData((prev) => prev + nextWord);
        }, 10 * index);
    };

    // Function to reset the chat session state
    const newChat = () => {
        setLoading(false);
        setShowResults(false);
    };

    // Function to handle sending a prompt to the chat API and processing the response
    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResults(true);
        setError(null);

        try {
            // Determine the prompt to use: either the provided one or the current input
            const userPrompt = prompt !== undefined ? prompt : input;

            if (prompt === undefined) {
                // If no prompt is provided, use the current input and add it to previous prompts
                setPrevPrompts((prev) => [...prev, input]);
            }
            setRecentPrompt(userPrompt);

            // Send the prompt to the chat API
            const response = await runChat(userPrompt);

            // Format the response: make text between ** bold and replace * with line breaks
            let formattedResponse = response
                .split("**")
                .map((part, index) => (index % 2 === 1 ? `<b>${part}</b>` : part))
                .join("")
                .replace(/\*/g, "<br/>");

            // Display the formatted response character by character
            formattedResponse.split("").forEach((char, index) => {
                delayPara(index, char);
            });
        } catch (error) {
            console.error("Error while running chat:", error);
            setError("An error occurred while processing your request.");
        } finally {
            // Reset the loading state and clear the input
            setLoading(false);
            setInput("");
        }
    };

    // Context value that will be provided to consuming components
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        input,
        setInput,
        showResults,
        loading,
        resultData,
        newChat,
        error,
    };

    // Provide the context to children components
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
