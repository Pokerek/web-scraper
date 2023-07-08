import { describe, expect, it, afterAll } from "@jest/globals";
import fs from "fs";

import FileService from "../../Services/file-service";

describe('FileService', () => {
    describe('saveToCSVFile', () => {
        afterAll(() => {
            fs.readdirSync('./uploads').forEach((file) => {
                fs.unlinkSync(`./uploads/${file}`);
            });
        });

        it('should save data to a CSV file and return the file path', async () => {

            const header = ['Name', 'Age'];
            const data = [
                { Name: 'John Doe', Age: 25 },
                { Name: 'Jane Smith', Age: 30 },
            ];
            const fileName = 'test-file';

            const filePath = await FileService.saveToCSVFile(header, data, fileName);

            expect(filePath).toContain(fileName);
            expect(filePath).toMatch(/\.csv$/);
        });

        it('should throw error if file path is invalid', async () => {
            const header = ['Name', 'Age'];
            const data = [
                { Name: 'John Doe', Age: 25 },
                { Name: 'Jane Smith', Age: 30 },
            ];
            const fileName = '/path/test-file';

            await expect(FileService.saveToCSVFile(header, data, fileName)).rejects.toThrow();
        });
    });
});