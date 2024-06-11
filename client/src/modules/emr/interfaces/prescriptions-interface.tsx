export interface PrescriptionsInterface {
    id? : string;
    patientId? : string;
    visitCode? : string;
    drugName : string;
    beginDate : Date | null;
    quantity : number | null;
    medicineUnit : string;
    dosage : string;
    refills : string;
    substitutionAllowed : boolean | null;
    notes : string;
}