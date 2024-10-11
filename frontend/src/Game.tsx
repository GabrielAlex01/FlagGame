import { useEffect, useState } from "react";

type File = Record<string, string>;

const ENDPOINT = "http://localhost:5173";

const FetchFile = async (): Promise<File> => {
    let x = await fetch(ENDPOINT + "/countries.json");
    let y = await x.json() as File;
    return y;
}

const Game = () => {
    // useState [*char, () => void]
    const [file, setFile] = useState<File | null>(null);
    const [draft, setDraft] = useState<number | null>(null);

    useEffect(() => {
        Load(); 
    }, []);

    const Load = async () => {
        let x = await FetchFile();
        setFile(x);
        setDraft(RandomNumber());
    }
    
    const RandomNumber = (): number => Math.floor(Math.random() * 8);

    return (
        <div className="text-white">
            {
                file && 
                <>
                    <span>O país é: {Object.values(file)[7]}</span>
                    <span>O código é: {Object.keys(file)[6]}</span>
                </>
            }
            {
                draft &&
                <>
                    O número aleatório é: {draft}
                </>
            }
        </div>
    )
}

export default Game;