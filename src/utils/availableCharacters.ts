import * as fs from "fs";

export const availableCharacters = () => {
    const rawData = fs.readFileSync('./characters.json', 'utf-8');
    const formatData = JSON.parse(rawData);
    console.log(formatData)
    return formatData
}