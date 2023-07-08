import fs from 'fs';
import path from 'path';
import uniqueString from '../utils/uniqueString';

export default class FileService {
    static saveToCSVFile = async (header: string[], data: any[], fileName: string): Promise<string> => {
        const uniqueNamePart = uniqueString(10);
        const filePath = path.join(__dirname, `../../uploads/${fileName}-${uniqueNamePart}.csv`);
        const stream = this.createStream(filePath);

        const csvData = this.generateCSVDataStructure(header, data);

        stream.write(csvData);

        return new Promise((resolve, reject) => {
            stream.on('finish', () => {
                resolve(filePath);
            });
            stream.on('error', (error) => {
                reject(error);
            });
            stream.end();
        });
    }

    private static generateCSVDataStructure = (header: string[], body: any[]): string => {
        const headerString = `${header.join(',')}\n`;
        const bodyString = body.map((el) => {
            return `${Object.values(el).join(',')}\n`;
        }).join('');

        return headerString + bodyString;
    }

    private static createStream = (filePath: string) => {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '');
        }

        return fs.createWriteStream(filePath);
    }
}