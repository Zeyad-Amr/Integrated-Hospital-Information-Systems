import DepartmentsInterface from "../../domain/interfaces/departments-interface";
import FeatureInterface from "../../domain/interfaces/feature-interface";
import RoomInterface from "../../domain/interfaces/room-interface";
import SpecializationInterface from "../../domain/interfaces/specialization -interface";
import SubDepartmentsInterface from "../../domain/interfaces/sub-departments-interface";

// Define the initial state using that type
export interface RoomState {
    roomList: RoomInterface[];
    currentRoom: RoomInterface;
    loading: boolean;
    error: string;
}

export interface SpecializationState {
    specializationList: SpecializationInterface[];
    currentSpecialization: SpecializationInterface;
    loading: boolean;
    error: string;
}
export interface SubDepartmentsState {
    subDepartmentsList: SubDepartmentsInterface[];
    currentSubDepartment: SubDepartmentsInterface;
    loading: boolean;
    error: string;
}
export interface FeaturesState {
    featuresList: FeatureInterface[];
    currentFeature: FeatureInterface;
    loading: boolean;
    error: string;
}
export interface DepartmentsState {
    departmentsList: DepartmentsInterface[];
    loading: boolean;
    error: string;
}