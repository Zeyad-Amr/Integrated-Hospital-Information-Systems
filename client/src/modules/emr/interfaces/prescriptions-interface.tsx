export interface PrescriptionsInterface {
    id? : string;
    patientId? : string;
    visitCode? : string;
    drugName : string;
    beginDate : Date | null;
    quantity : number | null | undefined;
    medicineUnit : string;
    dosage : string;
    refills : string;
    substitutionAllowed : string;
    notes : string;
}