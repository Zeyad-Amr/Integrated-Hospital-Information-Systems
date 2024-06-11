//* Define Types of different initialStates

import { PaginatedList } from "@/core/api";
import { AllergiesInterface } from "../interfaces/allergies-interface";
import { SurgeriesInterface } from "../interfaces/surgeries-interface";
import { MedicalProblemsInterface } from "../interfaces/medical-problems-interface";
import { MedicationsInterface } from "../interfaces/medications-interface";
import { PrescriptionsInterface } from "../interfaces/prescriptions-interface";
import { DiagnosisInterface } from "../interfaces/diagnosis-interface";
import { VitalsInterface } from "../interfaces/vitals-interface";

export interface AllergiesState {
    allergies: PaginatedList<AllergiesInterface>;
    currentAllergy: AllergiesInterface;
    isFetched: boolean;
    loading: boolean;
    error: string;
}
export interface SurgeriesState {
    surgeries: PaginatedList<SurgeriesInterface>;
    currentSurgery: SurgeriesInterface;
    isFetched: boolean;
    loading: boolean;
    error: string;
}
export interface MedicalProblemsState {
    medicalProblems: PaginatedList<MedicalProblemsInterface>;
    currentMedicalProblem: MedicalProblemsInterface;
    isFetched: boolean;
    loading: boolean;
    error: string;
}
export interface MedicationsState {
    medications: PaginatedList<MedicationsInterface>;
    currentMedication: MedicationsInterface;
    isFetched: boolean;
    loading: boolean;
    error: string;
}
export interface PrescriptionsState {
    prescriptions: PaginatedList<PrescriptionsInterface>;
    currentPrescription: PrescriptionsInterface;
    isFetched: boolean;
    loading: boolean;
    error: string;
}
export interface DiagnosisState {
    diagnosesList: PaginatedList<DiagnosisInterface>;
    currentDiagnosis: DiagnosisInterface;
    isFetched: boolean;
    loading: boolean;
    error: string;
}
export interface VitalsState {
    vitals: PaginatedList<VitalsInterface>;
    currentVital: VitalsInterface;
    isFetched: boolean;
    loading: boolean;
    error: string;
}
