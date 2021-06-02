import { IColaborators } from "./firebaseDocument";
import { ICharacterNested } from "./responsesOfMarvelApi";

export interface IGetColaborators{
    colaborators:IColaborators;
    last_sync: string | Date;
}

export interface IGetCharactedNested{
    characters:ICharacterNested[];
    last_sync: string | Date;
}