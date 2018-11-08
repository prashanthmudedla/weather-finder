import { Region } from './region';
import { Country } from './country';

export interface CitySearchResult {
    Version: string;
    Key: number;
    Type: string;
    Rank: number;
    LocalizedName: string;
    EnglishName: string;
    PrimaryPostalCode: string;
    Region: Region;
    Country: Country;
    AdministrativeArea: any;
    TimeZone: any;
    GeoPosition: any;
    IsAlias: boolean;
    DataSets: string[];
}
