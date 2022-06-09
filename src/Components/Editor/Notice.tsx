import { useState } from 'react';
import Modal from 'react-modal';
import './Notice.css';

const Notice = () => {
    const [showNotice, setShowNotice] = useState(true);

    const handleOpenModal = () => {
        setShowNotice(true);
    }

    const handleCloseModal = () => {
        setShowNotice(false);
    }

    return (
    <span>
        <button
        className='i-btn'
        onClick={handleOpenModal}>
            i
        </button>
        <Modal 
            isOpen={showNotice}
            contentLabel="Minimal Modal Example"
            className="Modal"
            overlayClassName="Overlay"
            onRequestClose={handleCloseModal}
        >
            <div
                className='text'
            >
                <h2>Welcome to Pointer Visualizer!</h2>

                <h4>
                    Here are a few things to keep in mind before you begin:
                </h4>

                <ul>
                    <li>This is not a compiler nor an IDE, so do not expect any sort of error handling or correction.</li>
                    <li>This application is mostly for beginners who are trying to understand how pointers work in a language like C++.</li>
                    <li>I am assuming that you are familiar with the C++ syntax, so that is what you should write.</li>
                    <li>Make sure your struct is written like in the snippets. This does not mean that it is the only way nor the best way to write it, but how I parse your code. Otherwise, it may not work as well or be even buggier.</li>
                    <li>Some things may still be a little buggy. Will try my best to fix them promptly. Sorry about that :(</li>
                </ul>

                <p>
                Hope you have fun, but mainly that you get to clarify some doubts about pointers :)
                <br /> <br />
                Thank you for trying it out! <br />
                With all &hearts;, <br /> <br />
                Nestor Alfaro <br />
                </p>
            </div>
            <button 
                className='ok-btn'
                onClick={handleCloseModal}
            >
                Ok
            </button>
        </Modal>
    </span>
    );
}


export default Notice;