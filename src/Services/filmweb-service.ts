import axios from "axios";
import { load } from "cheerio";

import FileService from "./file-service";

const CURRENT_YEAR = new Date().getFullYear();

export interface Movie {
    title: string;
    rate: string;
    platform?: string;
}

export interface SearchQuery {
    platform?: Platform;
    year?: string;
    limit?: number;
    orderByRate?: boolean;
}

export type Platform = 'netflix' | 'hbo_max' | 'canal_plus_manual' | 'disney';

export default class FilmWebService {
    private static readonly baseUrl = 'https://www.filmweb.pl';

    static getListOfMovies = async (SearchQuery: SearchQuery = {}): Promise<Movie[]> => {
        const { platform, year, limit = 10, orderByRate } = SearchQuery;
        const platformQuery = platform ? `${platform}/` : '';
        const yearQuery = year ? `${year}/` : '';
        const searchUrl = `${this.baseUrl}/ranking/vod/${platformQuery}film/${yearQuery}`;

        try {
            const response = await axios.get(searchUrl);
            const $ = load(response.data);

            const list = $('.rankingType').map((index, movieElement): Movie => {
                const title = $(movieElement).find('.rankingType__title').text();
                const rate = $(movieElement).find('.rankingType__rate--value').text().replace(',', '.');

                let movieData: Movie = {
                    title,
                    rate,
                }

                if (platform) {
                    movieData = {
                        ...movieData,
                        platform: platform,
                    }
                }

                return movieData;
            }).get();

            const filteredList = list.filter((el, index) => index < limit);

            return orderByRate ? filteredList.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate)) : filteredList;
        } catch (error) {
            if (error instanceof Error || error instanceof axios.AxiosError) {
                throw new Error(error.message);
            }

            throw new Error("Unknown error");
        }
    }

    static createReportByPlatform = async (platforms: Platform[], year: string = CURRENT_YEAR.toString(), limit = 10): Promise<string> => {
        const movies: Movie[] = [];
        const uniquesMoviesTitles = new Set();

        for (const platform of platforms) {
            const moviesFromPlatform = await FilmWebService.getListOfMovies({ platform, year, limit });
            moviesFromPlatform.forEach(movie => {
                if (!uniquesMoviesTitles.has(movie.title)) {
                    uniquesMoviesTitles.add(movie.title);
                } else {
                    const index = movies.findIndex(el => el.title === movie.title);
                    if (movies[index].rate < movie.rate) {
                        movies.splice(index, 1);
                    }
                }
            });

            movies.push(...moviesFromPlatform);
        }

        const sortedMovies = movies.sort((a, b) => parseFloat(b.rate) - parseFloat(a.rate));

        return await FileService.saveToCSVFile(['title', 'rate', 'platform'], sortedMovies, 'movies');
    }
}