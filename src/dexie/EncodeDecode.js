import CryptoJS from "crypto-js"



export const generateRandomKey = () => {
    const secretKey = process.env.REACT_APP_SECRET_KEY;
}

export const encryption = async (data) => {
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    try {
        const cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
        return cipherText;

    } catch (e) {
        console.error('Encryption Error : ', e);
        return null;
    }

}
export const decryption = (cipherText) => {
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    try {
        if (cipherText) {

            let bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
            const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decrypted;
        }
    } catch (e) {
        console.error('Decryption Error : ', e);
        return null;
    }
}