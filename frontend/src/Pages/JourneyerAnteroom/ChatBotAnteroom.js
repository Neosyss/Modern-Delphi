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

    const chatBoxRef = useRef(null); // Reference to chat box

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMessage = { role: 'user', content: input };
        setMessages([...messages, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('/api/chat', { message: input, chatbot, sessionId });
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
        return () => {
            clearChat(); // Runs when component unmounts
        };
    }, []);

    return (
        <div className="chatbot-anteroom">
            <div className="topbar-ca d-flex justify-content-between align-items-center px-3">
                <h5 className='mt-1'>{chatbot === 'Homepage' ? 'Homepage' : 'Kleio Anteroom'}</h5>
                <div className="d-flex justify-content-center flex-column align-items-center">
                    <div className="dot-b"></div>
                    <div className="dot-b"></div>
                    <div className="dot-b"></div>
                </div>
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
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <div className="d-flex justify-content-center align-items-center mx-3">
                    <RiSendPlaneFill className='cursor-pointer send-svg' onClick={sendMessage} />
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
