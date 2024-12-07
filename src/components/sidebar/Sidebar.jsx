import "./sidebar.css"; // Import the CSS file for styling the sidebar
import { assets } from "../../assets/assets"; // Import assets like icons from the assets folder
import { useContext, useState } from "react"; // Import useContext and useState hooks from React
import { Context } from "../../context/Context"; // Import the Context from the context folder

// Define the Sidebar functional component
const Sidebar = () => {
    const [extended, setExtended] = useState(false); // State to manage the extended/collapsed state of the sidebar
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context); // Destructure values from the Context

    // Function to load a previous prompt and trigger onSent function
    const loadPreviousPrompt = async (prompt) => {
        setRecentPrompt(prompt); // Set the recent prompt in the context
        await onSent(prompt); // Send the prompt
    };

    return (
        <div className="sidebar">
            <div className="top">
                <img
                    src={assets.menu_icon}
                    className="menu"
                    alt="menu-icon"
                    onClick={() => {
                        setExtended((prev) => !prev); // Toggle the extended state on menu icon click
                    }}
                />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="" onClick={() => {
                        newChat(); // Trigger newChat function on plus icon click
                    }} />
                    {extended ? <p>New Chat</p> : null} {/* Show "New Chat" text if extended is true */}
                </div>
                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p> {/* Title for recent prompts section */}
                        {prevPrompts.map((item, index) => {
                            return (
                                <div onClick={() => {
                                    loadPreviousPrompt(item); // Load the clicked previous prompt
                                }} className="recent-entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0, 18)}...</p> {/* Display the first 18 characters of the prompt */}
                                </div>
                            );
                        })}
                    </div>
                ) : null} {/* Show recent prompts if extended is true */}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null} {/* Show "Help" text if extended is true */}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null} {/* Show "Activity" text if extended is true */}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Settings</p> : null} {/* Show "Settings" text if extended is true */}
                </div>
            </div>
        </div>
    );
};

export default Sidebar; // Export the Sidebar component as the default export
