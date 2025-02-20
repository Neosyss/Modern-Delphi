import './Questions.css';
import QuestionsData from '../../data/QuestionsData';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from 'react';

const Questions = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <div className="d-flex pt-5 my-3 justify-content-center">
                <div className="tb-2">FAQs</div>
            </div>
            <div className="d-flex flex-column px-4 align-items-center justify-content-center">
                <h1 className="mt-2 px-2 text-dark heading-main-2">Frequently Asked Questions</h1>
                <p className="p mb-4 px-2 text-dark">Explore our frequently asked questions to better understand your consultation experience.</p>
            </div>
            <div className="pad-custom-q">
                {QuestionsData.map((item, index) => (
                    <div key={index}>
                        {/* Click event applied to the whole container */}
                        <div
                            className="question-container border-qc d-flex justify-content-between align-items-center"
                            onClick={() => toggleAnswer(index)}
                            style={{ cursor: "pointer" }} // Makes the entire div clickable
                        >
                            <p className="p text-dark fw-bold m-0 custom-w-ques">{item.question}</p>
                            {openIndex === index ? (
                                <IoIosArrowUp className="arrow-icon" />
                            ) : (
                                <IoIosArrowDown className="arrow-icon" />
                            )}
                        </div>
                        <div
                            className={`answer-container ${
                                openIndex === index ? "show" : "hide"
                            }`}
                        >
                            {item.answer}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Questions;
