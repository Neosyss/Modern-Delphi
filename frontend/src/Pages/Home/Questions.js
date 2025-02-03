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
                <div className="tb-2">Do you have</div>
            </div>
            <div className="d-flex justify-content-center">
                <h1 className="mt-2 px-1 text-dark heading-main-2">Any</h1>
                <span className="span mt-3 px-1 style-2">Questions</span>
            </div>
            <div className="pad-custom-q">
                {QuestionsData.map((item, index) => (
                    <div key={index}>
                        <div
                            className="question-container border-qc d-flex justify-content-between"
                            onClick={() => toggleAnswer(index)}
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
