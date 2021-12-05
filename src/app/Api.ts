import { createException } from './createException';
import { IQuery } from './interfaces/IQuery';
import { IEntity } from './interfaces/IEntity';
import { IForecast } from './interfaces/IForecast';

export type RejectResponse = {
  readonly cod: number;
  readonly message: string;
}

export class Api {
  public constructor(private readonly baseUrl: string) {
  }

  public async GET(url: string, payload?: Record<string, any>): Promise<IEntity | IForecast> {

    const getQueryString = (queries: IQuery[]): string => {
      let res = `${this.baseUrl}/${url}?appid=${process.env.REACT_APP_API_KEY as string}&units=metric`;
      queries.forEach(query => {
        res += `&${query.name}=${query.value}`;
      });
      return res;
    };

    const response = await fetch(
      getQueryString(payload as IQuery[]), {
        method: 'GET',
      });

    if (response.ok) {
      try {
        const rawResponse = await response.json() as (IEntity | IForecast | RejectResponse);
        console.log('1');
        if (Boolean(rawResponse['cod']) && rawResponse['cod'] !== 200) {
          console.log('2');
          const rejRes = rawResponse as RejectResponse;
          throw createException(rejRes.message);
        }
        console.log('3');
        return rawResponse as (IEntity | IForecast);

      } catch (e) {
        throw createException('E_UNABLE_TO_PARSE_JSON', `${this.baseUrl}/${url}`);
      }
    }
    throw createException('E_UNABLE_TO_REACH_SERVER', `${this.baseUrl}/${url}`);
  }
}