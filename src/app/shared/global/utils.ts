import { Type } from '../interface/json';

export class Utils {
  public static toNumber = (data: Type): number => {
    data = Number(data);
    if (Number.isNaN(data)) return 0;
    return data;
  };

  public static getQueryParameter(key: string): string {
    const parameters = new URLSearchParams(window.location.search);
    return parameters.get(key) || '';
  }

  public static getAllQueryParameters(): Record<string, string> {
    const parameters = new URLSearchParams(window.location.search);
    const queryParams: Record<string, string> = {};

    parameters.forEach((value, key) => {
      queryParams[key] = value;
    });

    return queryParams;
  }
}
