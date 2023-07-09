Sure! Here's an example of a README file for your web scraper project:

# Movie Web Scraper

This is a simple web scraper written in TypeScript that downloads a list of movies from different platforms and generates separate lists based on the platform. The supported platforms are Netflix, HBO Max, Canal Plus, and Disney. The scraper uses Axios for making HTTP requests and Cheerio for parsing HTML.

## Installation

1. Clone the repository:

```shell
git clone https://github.com/Pokerek/web-scraper
cd web-scraper
```

2. Install the dependencies:

```shell
npm install
or 
yarn
```

## Usage

1. Run the scraper UI version using the following command:

```shell
npm start
or 
yarn start
```
The webpage will be available at the link http://localhost:3000/

2. Run the scraper demo version that generate report for all platforms, limit - 10, year - 2023:

```shell
npm run demo
or 
yarn demo
```

The scraper will download the movie lists from each platform and generate separate output files for each platform in the `uploads` directory.

## Testing

The project includes a set of tests written using the Jest testing framework. You can run the tests using the following command:

```shell
npm test
or
yarn test
```

The tests cover the functionality of the scraper and ensure that the generated movie lists are accurate.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).