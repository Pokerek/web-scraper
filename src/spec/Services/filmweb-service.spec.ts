import axios from "axios";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";

import FilmWebService, { Movie } from "../../Services/filmweb-service";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("FilmWebService", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe("getListOfMovies", () => {
        const mockedResponse = {
            data: `
                <div class="rankingType">
                    <div class="rankingType__title">Movie 1</div>
                    <div class="rankingType__rate--value">7.5</div>
                </div>
                <div class="rankingType">
                    <div class="rankingType__title">Movie 2</div>
                    <div class="rankingType__rate--value">8.5</div>
                </div>
                <div class="rankingType">
                    <div class="rankingType__title">Movie 3</div>
                    <div class="rankingType__rate--value">9.5</div>
                </div>
                <div class="rankingType">
                    <div class="rankingType__title">Movie 4</div>
                    <div class="rankingType__rate--value">8.0</div>
                </div>
                <div class="rankingType">
                    <div class="rankingType__title">Movie 5</div>
                    <div class="rankingType__rate--value">7.2</div>
                </div>
                <div class="rankingType">
                    <div class="rankingType__title">Movie 6</div>
                    <div class="rankingType__rate--value">9.2</div>
                </div>
                <div class="rankingType">
                    <div class="rankingType__title">Movie 7</div>
                    <div class="rankingType__rate--value">8.8</div>
                </div>
                <div class="rankingType">
                    <div class="rankingType__title">Movie 8</div>
                    <div class="rankingType__rate--value">7.9</div>
                </div>
                <div class="rankingType">
                    <div class="rankingType__title">Movie 9</div>
                    <div class="rankingType__rate--value">8.3</div>
                </div>
                <div class="rankingType">
                    <div class="rankingType__title">Movie 10</div>
                    <div class="rankingType__rate--value">9.0</div>
                </div>
            `
        };
        beforeEach(() => {
            mockedAxios.get.mockResolvedValue(mockedResponse);
        });

        it("should return list of movies", async () => {
            const expectedMovies: Movie[] = [
                {
                    title: "Movie 1",
                    rate: "7.5",
                },
                {
                    title: "Movie 2",
                    rate: "8.5",
                },
                {
                    title: "Movie 3",
                    rate: "9.5",
                },
                {
                    title: "Movie 4",
                    rate: "8.0",
                },
                {
                    title: "Movie 5",
                    rate: "7.2",
                },
                {
                    title: "Movie 6",
                    rate: "9.2",
                },
                {
                    title: "Movie 7",
                    rate: "8.8",
                },
                {
                    title: "Movie 8",
                    rate: "7.9",
                },
                {
                    title: "Movie 9",
                    rate: "8.3",
                },
                {
                    title: "Movie 10",
                    rate: "9.0",
                },
            ];

            const movies = await FilmWebService.getListOfMovies();

            expect(movies).toEqual(expectedMovies);
        });

        it("should return list of movies with platform", async () => {
            const expectedMovies: Movie[] = [
                {
                    title: "Movie 1",
                    rate: "7.5",
                    platform: "netflix"
                },
                {
                    title: "Movie 2",
                    rate: "8.5",
                    platform: "netflix"
                },
                {
                    title: "Movie 3",
                    rate: "9.5",
                    platform: "netflix"
                },
                {
                    title: "Movie 4",
                    rate: "8.0",
                    platform: "netflix"
                },
                {
                    title: "Movie 5",
                    rate: "7.2",
                    platform: "netflix"
                },
                {
                    title: "Movie 6",
                    rate: "9.2",
                    platform: "netflix"
                },
                {
                    title: "Movie 7",
                    rate: "8.8",
                    platform: "netflix"
                },
                {
                    title: "Movie 8",
                    rate: "7.9",
                    platform: "netflix"
                },
                {
                    title: "Movie 9",
                    rate: "8.3",
                    platform: "netflix"
                },
                {
                    title: "Movie 10",
                    rate: "9.0",
                    platform: "netflix"
                },
            ];

            const movies = await FilmWebService.getListOfMovies({ platform: 'netflix' });

            expect(movies).toEqual(expectedMovies);
        });

        it("should return 5 movies", async () => {
            const expectedMovies: Movie[] = [
                {
                    title: "Movie 1",
                    rate: "7.5",
                },
                {
                    title: "Movie 2",
                    rate: "8.5",
                },
                {
                    title: "Movie 3",
                    rate: "9.5",
                },
                {
                    title: "Movie 4",
                    rate: "8.0",
                },
                {
                    title: "Movie 5",
                    rate: "7.2",
                }
            ];

            const movies = await FilmWebService.getListOfMovies({ limit: 5 });

            expect(movies).toEqual(expectedMovies);
        });

        it("should return 5 movies with platform", async () => {
            const expectedMovies: Movie[] = [
                {
                    title: "Movie 1",
                    rate: "7.5",
                    platform: "netflix"
                },
                {
                    title: "Movie 2",
                    rate: "8.5",
                    platform: "netflix"
                },
                {
                    title: "Movie 3",
                    rate: "9.5",
                    platform: "netflix"
                },
                {
                    title: "Movie 4",
                    rate: "8.0",
                    platform: "netflix"
                },
                {
                    title: "Movie 5",
                    rate: "7.2",
                    platform: "netflix"
                }
            ];

            const movies = await FilmWebService.getListOfMovies({ limit: 5, platform: 'netflix' });

            expect(movies).toEqual(expectedMovies);
        });

        it("should return movies ordered by rate", async () => {
            const expectedMovies: Movie[] = [
                {
                    title: "Movie 3",
                    rate: "9.5",
                },
                {
                    title: "Movie 6",
                    rate: "9.2",
                },
                {
                    title: "Movie 10",
                    rate: "9.0",
                },
                {
                    title: "Movie 7",
                    rate: "8.8",
                },
                {
                    title: "Movie 2",
                    rate: "8.5",
                },
                {
                    title: "Movie 9",
                    rate: "8.3",
                },
                {
                    title: "Movie 4",
                    rate: "8.0",
                },
                {
                    title: "Movie 8",
                    rate: "7.9",
                },
                {
                    title: "Movie 1",
                    rate: "7.5",
                },
                {
                    title: "Movie 5",
                    rate: "7.2",
                }
            ];

            const movies = await FilmWebService.getListOfMovies({ orderByRate: true });

            expect(movies).toEqual(expectedMovies);
        });

        it("should throw error", async () => {
            mockedAxios.get.mockRejectedValue(new Error("error"));

            await expect(FilmWebService.getListOfMovies()).rejects.toThrow("error");
        });
    });
});