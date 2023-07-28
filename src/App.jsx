import React, {useState, useEffect} from "react";
import Help from "./components/help/Help.jsx";
import Modal from "./components/modal/Modal.jsx";
import Button from "./components/button/Button.jsx";

function App() {
    const [words, setWords] = useState([
        {id: 1, word: 'Арбуз'},
        {id: 2, word: 'Банан'},
        {id: 3, word: 'Апельсин'},
        {id: 4, word: 'Кокос'},
        {id: 5, word: 'Манго'},
        {id: 6, word: 'Авокадо'},
        {id: 7, word: 'Яблоко'},
        {id: 8, word: 'Персик'},
        {id: 9, word: 'Виноград'},
        {id: 10, word: 'Мандарин'},
    ]);
    const [randomWord, setRandomWord] = useState([]);
    const [isStart, setIsStart] = useState(false);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [error, setError] = useState(false);
    const [mistakes, setMistakes] = useState([]);
    const [mistakesCount, setMistakesCount] = useState(1);
    const [isWin, setIsWin] = useState(false);
    const [isLose, setIsLose] = useState(false);

    const randomIndexGenerate = () => {
        const random = Math.floor(Math.random() * words.length);
        const word = words[random].word.split('');
        setRandomWord(word);
    };

    const demoStart = () => {
        randomIndexGenerate();
        setIsStart(true);
    };

    const checkWinGame = () => {
        const isWordGuessed = randomWord.every((letter) =>
            guessedLetters.includes(letter.toUpperCase())
        );

        if (isWordGuessed && isStart) {
            setIsWin(true);
            setIsLose(true);
        }

        if (mistakesCount >= 6) {
            setIsLose(true);
        }
    };

    useEffect(() => {
        checkWinGame();
    }, [guessedLetters, randomWord]);

    const handleStart = () => {
        demoStart();
        setIsStart(true);
    };

    const handleRestart = () => {
        randomIndexGenerate();
        setGuessedLetters([]);
        setError(false);
        setIsLose(false);
        setIsWin(false);
        setMistakes([]);
        setMistakesCount(1);
        setIsStart(true);
    };

    const handleKeyPress = (e) => {
        if (isStart && !isLose) {
            const char = e.key.toUpperCase();
            const russianCharactersPattern = /[а-яА-Я]/;
            if (russianCharactersPattern.test(char)) {
                const isCurrentLetterGuess = guessedLetters.includes(char);
                if (isCurrentLetterGuess) {
                    setError(!error);
                } else {
                    if (randomWord.map((w) => w.toUpperCase()).includes(char)) {
                        setGuessedLetters((prevGuessedLetters) => [...prevGuessedLetters, char]);
                    } else {
                        setMistakes([...mistakes, char]);
                        setMistakesCount(mistakesCount + 1);
                    }
                }
                checkWinGame();
            }
        }
    };

    useEffect(() => {
        document.body.addEventListener('keydown', handleKeyPress);
        return () => {
            document.body.removeEventListener('keydown', handleKeyPress);
        };
    }, [isStart, guessedLetters, checkWinGame]);


    return (
        <div className="bg-[#303642] h-screen w-full">
            <div className="max-w-[1200px] h-screen m-auto p-15 flex flex-col justify-start relative">
                <div className="flex flex-col gap-5 pt-[170px]">
                    <h1 className="text-5xl text-[#fff] font-bold">Виселица</h1>
                    <p className="text-[#fff] text-xl">Отгадайте фрукт - введите букву</p>
                    <div className="mt-16 flex max-w-[540px] justify-between items-center gap-14">
                        {isStart ? (
                            <img
                                className="min-w-[250px]"
                                src={`src/assets/images/gallows/gallows${mistakesCount}.svg`}
                                alt="image"
                            />
                        ) : (
                            <Button onClick={handleStart}>Start</Button>
                        )}
                        <div className="mr-16 flex gap-2">
                            {randomWord &&
                                randomWord.map((l, index) => (
                                    <div
                                        key={index}
                                        className="
                                          border-b-4 border-b-[#FF7461]
                                          inline-flex items-center justify-center
                                          h-[50px] w-[20px] text-3xl
                                          text-[#fff] p-1"
                                    >
                                        {guessedLetters.includes(l.toUpperCase()) ? l.toUpperCase() : ''}
                                    </div>
                                ))}
                        </div>
                        <div className="min-w-[200px]">
                            {mistakes.length > 0 && (
                                <div className="flex flex-col gap-4 text-[#fff] text-xl">
                                    <p> Ошибок сделано: {mistakesCount - 1}</p>
                                    <div className="flex">
                                        <p className="mr-2">Ошибки:</p>
                                        {mistakes.map((m, index) => (
                                            <p key={index} className="mr-1">
                                                {m}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {isWin && isStart && (
                        <Modal>
                            <div className="flex flex-col gap-3">
                                <p>Вы выиграли</p>
                                <p>Ошибок сделано: {mistakesCount - 1}</p>
                                <Button onClick={handleRestart}>Начать заново</Button>
                            </div>
                        </Modal>
                    )}
                    {isLose && (
                        <Modal>
                            <div className="flex flex-col gap-3">
                                <p>Вы проиграли((</p>
                                <p>Ошибок сделано: {mistakesCount - 1}</p>
                                <Button onClick={handleRestart}>Начать заново</Button>
                            </div>
                        </Modal>
                    )}
                    {error && <Help>Вы уже вводили данную букву!!!</Help>}
                </div>
            </div>
        </div>
    );
}

export default App;