import FilmWebService from "./Services/filmweb-service";

(async () => {
    FilmWebService.createReportByPlatform(['netflix', 'hbo_max', 'canal_plus_manual', 'disney'], {
        limit: 10,
        orderByRate: true,
        year: '2023',
    })
})();