import Api from '../../../Api';

export const WeatherApi = new Api(process.env.REACT_APP_WEATHER_API_URL as string);