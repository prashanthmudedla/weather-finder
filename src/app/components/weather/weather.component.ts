import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService } from './weather.service';
import { Country } from 'src/app/models/country';
import { Region } from 'src/app/models/region';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { instantiateDefaultStyleNormalizer } from '@angular/platform-browser/animations/src/providers';
import { CurrentConditions } from 'src/app/models/current-conditions.model';
import { Subscription } from 'rxjs';
import { CitySearchResult } from 'src/app/models/city-search-result.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  public regionList: Region[] = [];
  public countryList: Country[] = [];
  public selectedCountry: Country;
  public location = '';
  public searchForm: FormGroup;
  public weatherReport: CurrentConditions;
  public filteredCityList: CitySearchResult[];
  private cityList: CitySearchResult[];

  private formChangeSubscriptions: Subscription[] = [];

  constructor(private weatherService: WeatherService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.getRegionList();
    this.subscribeToFormChanges();
  }

  ngOnDestroy(): void {
    if (this.formChangeSubscriptions) {
      this.formChangeSubscriptions.forEach((sub: Subscription) => {
        sub.unsubscribe();
      });
    }
  }

  public getWeatherReport(): void {
    if (!this.searchForm || !this.searchForm.valid) { return; }

    const location: CitySearchResult = this.searchForm.controls['location'].value;
    if (location && location.Key) {
      this.weatherService.getCurrentConditionsReport(location.Key)
        .subscribe((report: any[]) => {
          if (report && report.length > 0) {
            this.weatherReport = report[0];
          }
        });
    }
  }

  public displayCityFn(city: CitySearchResult): string {
    return city ? city.EnglishName : undefined;
  }

  private initForm(): void {
    this.searchForm = this.fb.group({
      region: new FormControl('', Validators.compose([Validators.required])),
      country: new FormControl('', Validators.compose([Validators.required])),
      location: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  private subscribeToFormChanges(): void {
    if (!this.searchForm) { return; }

    this.formChangeSubscriptions.push(
      this.searchForm.controls['region'].valueChanges
        .subscribe((reg: Region) => {
          this.getCountryList(reg.ID);
        }),

        this.searchForm.controls['location'].valueChanges
          .pipe(debounceTime(400))
          .subscribe((value: string) => {
            const country = this.searchForm.controls['country'].value;
            if (value && value.length > 2 && country) {
              this.getcitiesForCountry(country.ID, value);
            }
          })

    );
  }

  private getcitiesForCountry(countryCode: string, query: string): void {
    this.weatherService.getCitiesForCountry(countryCode, query)
      .subscribe((cityResult: CitySearchResult[]) => {
        if (cityResult && cityResult.length > 0) {
         this.cityList = [...cityResult];
        }
      }, error => console.error(error));
  }

  private getCountryList(regionCode: string): void {
    if (!regionCode) { return; }

    this.weatherService.getCountryList(regionCode)
      .subscribe((countriesListResult: Country[]) => {
        if (countriesListResult && countriesListResult.length > 0) {
          this.countryList = [...countriesListResult];
        } else {
          this.countryList = [];
        }
      }, error => console.error(error));
  }

  private getRegionList(): void {
    this.weatherService.getRegionList()
      .subscribe((regionListResult: Region[]) => {
        if (regionListResult && regionListResult.length > 0) {
          this.regionList = [...regionListResult];
        } else {
          this.regionList = [];
        }
      }, error => console.error(error));
  }

}
