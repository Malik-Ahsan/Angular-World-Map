import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorldBankService {
  url = 'https://api.worldbank.org/V2/country'


  constructor() { }

  async getCountryData(countryId: string): Promise<Object | undefined> {
    const response = await fetch(`${this.url}/${countryId}?format=json`);
    const data = await response.json() ?? [];
    return data;
  }
}
