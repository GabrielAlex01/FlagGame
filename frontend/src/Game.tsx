import { useEffect, useState } from "react";
import { FetchFile } from "./consts";
import { TOTAL_NUMBER_OF_COUNTRIES } from "./consts";

type File = Record<string, string>;

const Game = () => {
    const [file, setFile] = useState<File | null>(null);
    const [draft, setDraft] = useState<number[] | null>(null);
    const [correctIndex, setCorrectIndex] = useState<number | null>(null);
    const [errors, setErrors] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [options, setOptions] = useState<number>(4);

    useEffect(() => {
        Load();
    }, []);

    const RestartGame = () => {
        setDraft(null);
        setErrors(0);
        setScore(0);
        setCorrectIndex(null);
        setNewDraft();
    }

    useEffect(() => {
        // só fazer o que tá aqui dentro, se o "options" for alterado
        RestartGame();
    }, [options]) // por isso o array de dependencias não é vazio, e sim dependente da variável options

    // useEffect(() => {
    //     console.log("ERROS FORAM ALTERADOS", errors);
    // }, [errors])

    const Load = async () => {
        let x = await FetchFile<File>();
        setFile(x);
        setNewDraft();
    }

    const setNewDraft = () => {
        const newDraft = GetRandomNumbers();
        setDraft(newDraft);
        setCorrectIndex(RandomNumber(0, newDraft.length - 1));
    }

    const GetRandomNumbers = (): number[] => {
        let array: number[] = [];
        while (array.length < options) {
            let number = RandomNumber(0, TOTAL_NUMBER_OF_COUNTRIES - 1);
            if (!array.includes(number)) {
                array.push(number);
            }
        }
        return array;
    }

    //onChange.. toda vez que escrever no input, já tem que reiniciar o jogo.
    // a gente não tem um botão pra "atualizar o valor das opções"

    const RandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

    return (
        <div className="container mx-auto">
            <div>
                {file && draft && correctIndex !== null &&
                    <div className="flex flex-col gap-4 text-white font-bold text-xl">
                        <div className="flex flex-col p-6 items-center gap-4">
                            <span>FlagGame</span>
                            <span>Clique no país: {Object.values(file)[draft[correctIndex]]}</span>
                            <span>Contagem de erros: {errors}</span>
                            <span>Contagem de acertos: {score}</span>
                            <input
                            className="h-10 rounded-md bg-zinc-800 p-4 text-center max-w-32"
                            type="text"
                            inputMode="numeric"
                            maxLength={3}
                            max={TOTAL_NUMBER_OF_COUNTRIES}
                            min={2}
                            onChange={(e) => {
                                let value: number = Number(e.target.value);
                                    // if (value > TOTAL_NUMBER_OF_COUNTRIES) {
                                    //     value = TOTAL_NUMBER_OF_COUNTRIES;
                                    // }
                                    // else if (value < 2){
                                    //     value = 2;
                                    // }
                                    value = value > TOTAL_NUMBER_OF_COUNTRIES ? TOTAL_NUMBER_OF_COUNTRIES : value < 2 ? 2 : value;
                                    // switch (value) {
                                    //     case 1:
                                    //         console.log("Ë igual a 1")
                                    //         break;
                                    //     case 190:
                                    //         console.log("É igual a  190")
                                    //         break;
                                    //     default:
                                    //         console.log("não é nem 1 nem 190")
                                    //         break;
                                    // }
                                    // switch (value) {
                                    //     case Number(value > 239):
                                    //         value = 239;
                                    //         break;
                                    //     case Number(value < 2):
                                    //         value = 2;
                                    //         break;
                                    //     default: 
                                    //         break;
                                    // }
                                setOptions(value);
                            }}
                            placeholder={String(options)}>
                        </input>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {draft.map((element, index) => {
                                return (
                                    <span
                                        key={index}
                                        onClick={() => {
                                            if (index === correctIndex) {
                                                setNewDraft();
                                                setScore(prev => prev + 1);
                                            }
                                            else {
                                                setErrors(prev => prev + 1);
                                            }
                                        }}>
                                        <img className="w-16 h-12 md:w-32 md:h-20 rounded-md aspect-square object-cover" src={`/svg/${Object.keys(file)[element].toLocaleLowerCase()}.svg`} alt="" />
                                    </span>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Game;
