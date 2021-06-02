import { Response, RequestHandler } from "express";
import { validateRequiredParams } from "../../../utils";
import * as Service from '../service/index';

export const getColaborators: RequestHandler = async (req, res) => {
    const { characterName } = req.params
    try {
        validateRequiredParams({ characterName })
        const response = await Service.getColaboratorsOfACharacter(characterName)
        return res.json(response)
    } catch (error) {
        return res.status(500).send({ error: 'Something failed!' });
    }
}

export const getCharactersNested: RequestHandler = async (req, res) => {
    const { characterName } = req.params
    try {
        validateRequiredParams({ characterName })
        const response = await Service.getCharacterNestedOfACharacter(characterName)
        return res.json(response)
    } catch (error) {
        return res.status(500).send({ error: 'Something failed!' });
    }
}


