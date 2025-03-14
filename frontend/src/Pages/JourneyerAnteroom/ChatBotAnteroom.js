import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
import { RiSendPlaneFill } from "react-icons/ri";
import './ChatBotAnteroom.css';

const Chatbot = ({ chatbot }) => {
    const initSessionId = uuidv4();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sessionId, setSession] = useState(initSessionId);
    const [loading, setLoading] = useState(false);
    const [botGreeted, setBotGreeted] = useState(false); // Flag to track initial message

    const chatBoxRef = useRef(null);

    const sendMessage = async (message, showUserMessage = true) => {
        if (!message.trim()) return;

        if (showUserMessage) {
            const userMessage = { role: 'user', content: message };
            setMessages(prevMessages => [...prevMessages, userMessage]);
        }

        setInput('');

        setLoading(true);
        try {
            const response = await axios.post('/api/chat', { message, chatbot, sessionId });
            setMessages(prevMessages => [...prevMessages, { role: 'bot', content: response.data.response }]);
        } catch (error) {
            console.error('Error fetching response:', error);
        } finally {
            setLoading(false);
        }
    };

    const clearChat = async () => {
        setMessages([]);
        try {
            await axios.post('/api/reset-chat', { chatbot, sessionId });
            setSession(uuidv4());
        } catch (error) {
            console.error('Error resetting chat:', error);
        }
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (!botGreeted) {
            sendMessage("Hello", false); // Send "Hello" but don't show it in chat
            setBotGreeted(true);
        }
    }, [botGreeted]);

    useEffect(() => {
        return () => {
            clearChat(); // Runs when component unmounts
        };
    }, []);

    return (
        <div className="chatbot-anteroom">
            <div className="topbar-ca d-flex justify-content-between align-items-center px-3">
                <h5 className='mt-2'>{chatbot === 'Homepage' ? 'Kleio' : 'Kleio Anteroom'}</h5>
            </div>

            <div className="chat-box-ca p-3" ref={chatBoxRef}>
                {messages.map((msg, index) => (
                    <div key={index} className={msg.role === 'user' ? 'user-msg' : 'bot-msg'}>
                        <div><ReactMarkdown>{msg.content}</ReactMarkdown></div>
                    </div>
                ))}
                {loading && <div className="bot-msg"><div>Bot is typing...</div></div>}
            </div>

            <div className="message-box d-flex px-2 justify-content-center">
                <input 
                    autoFocus 
                    className='form-control mt-2 message-input-ca' 
                    placeholder='Type a message...' 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
                />
                <div className="d-flex justify-content-center align-items-center mx-3">
                    <RiSendPlaneFill className='cursor-pointer send-svg' onClick={() => sendMessage(input)} />
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
