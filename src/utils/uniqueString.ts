import crypto from 'crypto';

const uniqueString = (length: number) => {
    return crypto.randomBytes(length).toString('hex');
}

export default uniqueString;