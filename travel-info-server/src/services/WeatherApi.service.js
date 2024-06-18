import axios from "axios";

export default class WeatherApiService {
    static async getWeather(location) {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=38fb2dd35fee522d8ec4f4fb7793f9df&units=metric`
        );
        return response.data;
    }
}
