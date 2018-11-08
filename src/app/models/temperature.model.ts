export interface Temperature {
    Metric: Unit;
    Imperial: Unit;
}

export interface Unit {
    Value: number;
    Unit: string;
    UnitType: number;
}
