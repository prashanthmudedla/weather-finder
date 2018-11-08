import { Injectable } from '@angular/core';
import { Observable, Observer, forkJoin } from 'rxjs';
import { map, count } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Country } from 'src/app/models/country';
import { Region } from 'src/app/models/region';
import { CurrentConditions } from 'src/app/models/current-conditions.model';
import { CitySearchResult } from 'src/app/models/city-search-result.model';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) {

  }

  getCurrentConditionsReport(locationkey: number): Observable<CurrentConditions[]> {
    return Observable.create((observer: Observer<any>): void => {
      if (!locationkey) {
        observer.error('Location key is required.');
        return;
      }

      const currentConditionsEndPoint = `${environment.ACCUWEATHER_CURRENT_CONDITIONS_API_END_POINT}/${locationkey}`;
      const options: any = {
        params: {
          'apikey': environment.ACCUWEATHER_API_KEY,
          'details': false,
        }
      };
      this.http.get(currentConditionsEndPoint, options)
        .pipe(map(val => <any>val as CurrentConditions[]))
        .subscribe((report: CurrentConditions[]): void => {
            observer.next(report);
            observer.complete();
          }, (error: any) => {
            observer.error(error);
          });
    });
  }

  getCountryList(regionCode: string): Observable<Country[]> {
    return Observable.create((observer: Observer<Country[]>): void => {
      if (!regionCode) {
        observer.error('Region code is required.');
        return;
      }

      const countryListEndpoint = `${environment.ACCUWEATHER_COUNTRY_LIST_API_END_POINT}/${regionCode}`;
      const options: any = {
        params: {
          'apikey': environment.ACCUWEATHER_API_KEY
        }
      };
      this.http.get(countryListEndpoint, options)
        .pipe(map(val => <any>val as Country[]))
        .subscribe((countryList: Country[]): void => {
            observer.next(countryList);
            observer.complete();
          }, (error: any) => {
            observer.error(error);
          });
    });
  }

  getCitiesForCountry(countryCode: string, query: string): Observable<CitySearchResult[]> {
    return Observable.create((observer: Observer<CitySearchResult[]>): void => {
      if (!countryCode || !query) {
        observer.error('Country code and query are required.');
        return;
      }

      const citySearchEndpoint = environment.ACCUWEATHER_CITY_SEARCH_API_END_POINT
        .replace('{countryCode}', countryCode);
      const options: any = {
        params: {
          'apikey': environment.ACCUWEATHER_API_KEY,
          'q': query,
          'details': false
        }
      };
      this.http.get(citySearchEndpoint, options)
        .pipe(map(val => <any>val as CitySearchResult[]))
        .subscribe((citySearchResult: CitySearchResult[]): void => {
            observer.next(citySearchResult);
            observer.complete();
          }, (error: any) => {
            observer.error(error);
          });
    });
  }

  getCountriesForAllRegions(): Observable<Country[]> {
    return Observable.create((observer: Observer<Country[]>): void => {
      this.getRegionList().subscribe((regions: Region[]) => {
        const countries: Country[] = [];
        if (regions && regions.length > 0) {
          forkJoin(regions.map((region: Region) => this.getCountryList(region.ID)))
            .subscribe((countryResult: Country[][]) => {
              if (countryResult) {
                countryResult.forEach((res: Country[]) => {
                  countries.push(...res);
                });
              }
            }, (error: any) => observer.error(error));
        }
      });
    });
  }

  getRegionList(): Observable<Region[]> {
    return Observable.create((observer: Observer<Region[]>): void => {
      const countryListEndpoint = `${environment.ACCUWEATHER_REGION_LIST_API_END_POINT}`;
      const options: any = {
        params: {
          'apikey': environment.ACCUWEATHER_API_KEY,
          'language': 'en-us'
        }
      };
      this.http.get(countryListEndpoint, options)
        .pipe(map(val => <any>val as Region[]))
        .subscribe((regionList: Region[]): void => {
            observer.next(regionList);
            observer.complete();
          }, (error: any) => {
            observer.error(error);
          });
    });
  }
}
