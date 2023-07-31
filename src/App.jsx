import React, {useState, useEffect} from "react";
import Help from "./components/UI/help/Help.jsx";
import Modal from "./components/UI/modal/Modal.jsx";
import Button from "./components/UI/button/Button.jsx";
import Mistakes from "./components/Mistakes.jsx";
import WordList from "./components/WordList.jsx";
import Gallows from "./components/Gallows.jsx";

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
    const [mistakesCount, setMistakesCount] = useState(0);
    const [isWin, setIsWin] = useState(false);
    const [isLose, setIsLose] = useState(false);
    const [maxMistakes] = useState(5);

    const randomIndexGenerate = () => {
        const random = Math.floor(Math.random() * words.length);
        const word = words[random].word.toLowerCase().split('');
        setRandomWord(word);
    };

    const demoStart = () => {
        randomIndexGenerate();
        setIsStart(true);
    };

    const checkWinGame = () => {
        const isWordGuessed = randomWord.every((letter) =>
            guessedLetters.includes(letter)
        );

        if (isWordGuessed && isStart) {
            setIsWin(true);
        }

    };

    useEffect(() => {
        checkWinGame();
    }, [guessedLetters, randomWord]);

    const handleStart = () => {
        demoStart();
        setIsStart(true);
        document.body.addEventListener('keydown', handleKeyPress);
    };

    const handleRestart = () => {
        randomIndexGenerate();
        setGuessedLetters([]);
        setError(false);
        setIsLose(false);
        setIsWin(false);
        setMistakes([]);
        setMistakesCount(0);
        setIsStart(true);
        document.body.addEventListener('keydown', handleKeyPress);
    };
    const handleKeyPress = (e) => {
        if (isStart && !isLose) {
            const char = e.key;
            const russianCharactersPattern = /[а-яА-Я]/;
            if (russianCharactersPattern.test(char)) {
                const isCurrentLetterGuess = guessedLetters.includes(char);
                const isCurrentLetterMistakes = mistakes.includes(char);
                if (isCurrentLetterGuess || isCurrentLetterMistakes) {
                    setError(true);
                } else {
                    if (randomWord.map((w) => w).includes(char)) {
                        setGuessedLetters((prevGuessedLetters) => [...prevGuessedLetters, char]);
                    } else {
                        setMistakes((prevMistakes) => [...prevMistakes, char]);
                        setMistakesCount(prevCount => prevCount + 1);
                        if (mistakesCount === maxMistakes) {
                            setIsLose(true);
                        }
                        setError(false);
                    }
                }
                checkWinGame()
            }
        }
        if (isWin || isLose) {
            document.body.removeEventListener('keydown', handleKeyPress);
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
                            <Gallows mistakesCount={mistakesCount}/>
                        ) : (
                            <Button onClick={handleStart}>Начать игру</Button>
                        )}
                        <WordList randomWord={randomWord} guessedLetters={guessedLetters}/>
                        <Mistakes mistakesCount={mistakesCount} mistakes={mistakes}/>
                    </div>
                    {isWin && isStart && (
                        <Modal>
                            <div className="flex flex-col gap-3">
                                <p>Вы выиграли!!!</p>
                                <p>Ошибок сделано: {mistakesCount}</p>
                                <Button onClick={handleRestart}>Начать заново</Button>
                            </div>
                        </Modal>
                    )}
                    {isLose && (
                        <Modal>
                            <div className="flex flex-col gap-3">
                                <p>Вы проиграли((</p>
                                <p>Ошибок сделано: {mistakesCount}</p>
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
