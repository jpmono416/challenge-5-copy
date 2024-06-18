import WeatherApiService from "../services/WeatherApi.service.js";

export default class WeatherApiController {
    static async getWeather(req, res) {
        try {
            const location = req.query.location;
            const response = await WeatherApiService.getWeather(location);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}