import WeatherApiService from "../services/WeatherApi.service.js";

export default class WeatherApiController {
    static async getWeather(req, res) {
        try {
            const hardcodedResponse = `{
    "data": [
    {
        "date": "2024-06-18",
        "avgTemp": 17.89,
        "description": "light rain",
        "avgHumidity": 64,
        "avgPressure": 1016
    },
    {
        "date": "2024-06-19",
        "avgTemp": 16.05375,
        "description": "scattered clouds",
        "avgHumidity": 65.875,
        "avgPressure": 1020.625
    },
    {
        "date": "2024-06-20",
        "avgTemp": 16.43375,
        "description": "overcast clouds",
        "avgHumidity": 59.875,
        "avgPressure": 1020.5
    },
    {
        "date": "2024-06-21",
        "avgTemp": 15.603750000000002,
        "description": "overcast clouds",
        "avgHumidity": 73.125,
        "avgPressure": 1010.5
    },
    {
        "date": "2024-06-22",
        "avgTemp": 15.16375,
        "description": "overcast clouds",
        "avgHumidity": 84.75,
        "avgPressure": 1010.125
    },
    {
        "date": "2024-06-23",
        "avgTemp": 17.05857142857143,
        "description": "overcast clouds",
        "avgHumidity": 72.42857142857143,
        "avgPressure": 1017.8571428571429
    }
],
    "status": 200,
    "statusText": "OK",
    "headers": {"content-length": "472", "content-type": "application/json; charset=utf-8"},
    "config": {
        "transitional": {"silentJSONParsing": true, "forcedJSONParsing": true, "clarifyTimeoutError": false},
        "adapter": ["xhr", "http", "fetch"],
        "transformRequest": [null],
        "transformResponse": [null],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {"Accept": "application/json, text/plain, */*"},
        "method": "get",
        "url": "http://localhost:3000/weather?location=London"
    },
    "request": {}
    }`;
            const location = req.query.location;
            const response = await WeatherApiService.getWeather(location);
            res.status(200).json(response); // JSON.parse(hardcodedResponse)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
