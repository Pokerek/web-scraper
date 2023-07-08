import FilmWebService from "./Services/filmweb-service";

(async () => {
    FilmWebService.createReportByPlatform(['netflix', 'hbo_max', 'canal_plus_manual', 'disney'])
})();