export interface VitalsInterface {
    id?: string | number;
    patientId?: string;
    visitCode?: string;
    CVP: number | undefined;
    GCS: number | undefined;
    PR: number | undefined;
    RR: number | undefined;
    SpO2: number | undefined;
    temp: number | undefined;
    SBP: number | undefined;
    DBP: number | undefined;
    weight: number | undefined;
    height: number | undefined;
}