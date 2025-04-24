const ENDPOINT = "http://localhost:5173";
export const TOTAL_NUMBER_OF_COUNTRIES = 237;

export const FetchFile = async <T>(): Promise<T> => {
    let x = await fetch(ENDPOINT + "/countries.json");
    let y = await x.json() as T;
    return y;
}