import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import FilmWebService from './Services/filmweb-service';
import validateForm from './validations/app-validation';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
    const pagePath = path.join(__dirname, '../public/pages/app.html');
    res.sendFile(pagePath);
});

app.post('/', async (req: Request, res: Response) => {
    if (!req.body.year) req.body.year = new Date().getFullYear().toString();
    if (!req.body.limit) req.body.limit = 10;
    if (!req.body.orderByRate) {
        req.body.orderByRate = false;
    } else {
        req.body.orderByRate = true;
    }

    const { error, value } = validateForm(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const { platform, year, limit, orderByRate } = value;

    const filePath = await FilmWebService.createReportByPlatform(platform, { year, limit, orderByRate });
    if (!fs.existsSync(filePath)) {
        res.status(500).send('Something went wrong');
        return;
    }

    res.sendFile(filePath);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});