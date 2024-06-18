import axios from "axios";

export default class WeatherApiService {
    static getWeather = async (location) => {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=38fb2dd35fee522d8ec4f4fb7793f9df&units=metric`
        );
        return this.#processWeatherData(response.data);
    };

    //* The /forecast API returns data in 3-hour intervals for the next 5 days.
    //* This function processes the data to return an array of 5 entries, with daily averages, by reducing and accumulating the data
    static #processWeatherData(data) {
        //? This is an array with a date as key, and for value: an object with [temperature, description, humidity, pressure] arrays with the values for each day
        const processedData = data.list.reduce((accumulator, current) => {
            const date = current.dt_txt.split(" ")[0]; // Extract the date in YYYY-MM-DD format
            // Create entry for each day if it doesn't exist
            if (!accumulator[date]) {
                accumulator[date] = {
                    temps: [],
                    descriptions: [],
                    humidity: [],
                    pressure: [],
                };
            }
            // Push the temperature, description, humidity, and pressure values to the corresponding arrays
            accumulator[date].temps.push(current.main.temp);
            accumulator[date].descriptions.push(current.weather[0].description);
            accumulator[date].humidity.push(current.main.humidity);
            accumulator[date].pressure.push(current.main.pressure);
            return accumulator;
        }, {});

        // Reduce the data into a single array of objects containing the averages for each parameter, each day
        return Object.keys(processedData).map((date) => ({
            date,
            avgTemp:
                processedData[date].temps.reduce((a, b) => a + b, 0) /
                processedData[date].temps.length,
            description: processedData[date].descriptions[0], //? Taking the first description of the day for simplicity
            avgHumidity:
                processedData[date].humidity.reduce((a, b) => a + b, 0) /
                processedData[date].humidity.length,
            avgPressure:
                processedData[date].pressure.reduce((a, b) => a + b, 0) /
                processedData[date].pressure.length,
        }));
    }
}
