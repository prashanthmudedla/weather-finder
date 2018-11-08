// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ACCUWEATHER_API_KEY: 'yQGtOCtuhcnvTRzf3aGhhGTDT6iWHaJ2',
  // ACCUWEATHER_API_KEY: 'Gq1oAAHDUQTpQPGqub92flHV90AyXRz0',
  ACCUWEATHER_CURRENT_CONDITIONS_API_END_POINT: 'http://dataservice.accuweather.com/currentconditions/v1',
  ACCUWEATHER_COUNTRY_LIST_API_END_POINT: 'http://dataservice.accuweather.com/locations/v1/countries',
  ACCUWEATHER_REGION_LIST_API_END_POINT: 'http://dataservice.accuweather.com/locations/v1/regions',
  ACCUWEATHER_CITY_SEARCH_API_END_POINT: 'http://dataservice.accuweather.com/locations/v1/{countryCode}/search',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
