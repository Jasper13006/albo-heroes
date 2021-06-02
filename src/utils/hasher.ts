import md5 from 'md5';

export const hasher = (dataToHash: string[]): string => {
    const stringToHash: string = dataToHash.join('')
    const hash: string = md5(stringToHash)
    return hash
}
