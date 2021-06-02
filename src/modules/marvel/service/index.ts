import { IGetCharactedNested, IGetColaborators } from '../../../interface/responses';
import * as Repository from '../repository/index';

export const getColaboratorsOfACharacter = async (characterName: string): Promise<IGetColaborators | undefined> => {
    try {
        const character = await Repository.getCharacter(characterName)
        if (!character) throw new Error()
        const { last_sync, colaborators } = character
        const formatResponse: IGetColaborators = {
            last_sync: formatLastSync(last_sync),
            colaborators
        }
        return formatResponse;
    } catch (error) {
        console.error(error)
    }
}

export const getCharacterNestedOfACharacter = async (characterName: string): Promise<IGetCharactedNested | undefined> => {
    try {
        const character = await Repository.getCharacter(characterName)
        if (!character) throw new Error()
        const { last_sync, characters } = character
        const formatResponse: IGetCharactedNested = {
            last_sync: formatLastSync(last_sync),
            characters
        }
        return formatResponse;
    } catch (error) {
        console.error(error)
    }
}

const formatLastSync = (date: Date) => {
    const formatDate: string = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    return formatDate
}