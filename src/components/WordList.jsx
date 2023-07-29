import React from 'react';
import Word from "../components/Word.jsx";

const WordList = ({randomWord, guessedLetters}) => {
    return (
        <div className="mr-16 flex gap-2">
            {randomWord.map((w, index) => (
                <Word
                    key={index}
                    letter={w}
                    isGuessed={guessedLetters.includes(w)}
                />
            ))}
        </div>
    );
};

export default WordList;