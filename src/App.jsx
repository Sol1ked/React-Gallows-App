import React, {useState, useEffect} from "react";
import Help from "./components/help/Help.jsx";
import Modal from "./components/modal/Modal.jsx";
import Button from "./components/button/Button.jsx";

function App() {
    const [words, setWords] = useState([
        {id: 1, word: 'Арбуз'},
        // {id: 2, word: 'Банан'},
        // {id: 3, word: 'Апельсин'},
        // {id: 4, word: 'Кокос'},
        // {id: 5, word: 'Манго'},
        // {id: 6, word: 'Авокадо'},
        // {id: 7, word: 'Яблоко'},
        // {id: 8, word: 'Персик'},
        // {id: 9, word: 'Виноград'},
        // {id: 10, word: 'Мандарин'},
    ])
    const [randomWord, setRandomWord] = useState([])
    const [isStart, setIsStart] = useState(false)
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [error, setError] = useState(false)
    const [mistakes, setMistakes] = useState(0)
    const [modal, setModal] = useState(false)
    const [isWin, setIsWin] = useState(false)
    const randomIndexGenerate = () => {
        let random = Math.floor(Math.random() * (words.length))
        let word = words[random].word.split('')
        setRandomWord(word)
    }
    const demoStart = () => {
        randomIndexGenerate()
        setIsStart(true)
    }
    useEffect(() => {
        demoStart()
    }, [])

    const handleKeyPress = (e) => {
        if (isStart) {
            const char = e.key.toUpperCase()
            const isCurrentLetterGuess = guessedLetters.includes(char)
            if (isCurrentLetterGuess) {
                setError(!error)
            } else {
                if (randomWord.map((w) => w.toUpperCase()).includes(char)) {
                    setGuessedLetters((prevGuessedLetters) => [...prevGuessedLetters, char]);
                } else {
                    setMistakes(mistakes + 1)
                    loseGame()
                }
            }

            checkWinGame()
        }
    }
    const loseGame = () => {
        if (mistakes === randomWord.length) {
            setModal(true)
        }
    }
    const checkWinGame = () => {
        if (randomWord.length - 1 === guessedLetters.length) {
            setIsWin(!isWin)
            setModal(!modal)
        }
    }
    useEffect(() => {
        document.body.addEventListener('keydown', handleKeyPress);
        return () => {
            document.body.removeEventListener('keydown', handleKeyPress);
        };
    }, [isStart, guessedLetters, checkWinGame]);

    return (
        <div className="bg-[#303642] h-screen w-full">
            <div className="max-w-[1200px] h-screen m-auto p-15 flex flex-col justify-start relative">
                {modal
                    ? <Modal>
                        <div>
                            {isWin &&
                                <div className="flex flex-col gap-3">
                                    <p>{isWin ? 'Вы Победили!!!' : 'Вы проиграли(('}</p>
                                    <p>Ошибок сделано: {mistakes}</p>
                                </div>
                            }
                            <Button>Начать заново</Button>
                        </div>
                    </Modal>
                    :
                    <div className="flex flex-col gap-5 pt-[170px]">
                        <h1 className="text-5xl text-[#fff] font-bold">Виселица</h1>
                        <p className="text-[#fff] text-xl">Отгадайте фрукт - введите букву</p>
                        <div className="mt-16 flex max-w-[540px] justify-between items-center">
                            <img src="src/assets/images/gallows/gallows.svg" alt="image"/>
                            {/*Добавить разделение фотографии*/}
                            <div className="mr-16 flex gap-2">
                                {randomWord &&
                                    //Разделить на компоненты массив и элемент массива
                                    randomWord.map((l, index) => (
                                        <div
                                            key={index}
                                            className="
                                                border-b-4 border-b-[#FF7461]
                                                inline-flex items-center justify-center
                                                h-[50px] w-[20px] text-3xl
                                                text-[#fff] p-1"
                                        >{guessedLetters.includes(l.toUpperCase()) ? l.toUpperCase() : ''}</div>
                                    ))
                                }
                            </div>
                        </div>
                        {error &&
                            <Help>
                                Вы уже вводили данную букву!!!
                            </Help>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default App;
