export const validateRequiredParams = (objectToValidate: any) => {
    for (const key in objectToValidate) {
        if (!objectToValidate[key]) {
            throw new Error(`Property ${key} is required`);
        }
    }
};
