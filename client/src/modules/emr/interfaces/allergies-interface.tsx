export interface AllergiesInterface {
    id? : string | number;
    patientId? : string;
    name : string;
    beginDate : Date | null;
    endDate : Date | null;
    reaction : string;
    severity : string;
    occurrence : string;
    verification : string;
    comments : string;
}