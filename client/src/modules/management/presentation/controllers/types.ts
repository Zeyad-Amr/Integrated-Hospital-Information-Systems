import { PaginatedList } from "@/core/api";
import PermissionInterface from "../../domain/interfaces/permission-interface";
import RoomInterface from "../../domain/interfaces/room-interface";
import SpecializationInterface from "../../domain/interfaces/specialization -interface";
import { SubDepartmentsInterface } from "../../domain/interfaces/sub-departments-interface";

// Define the initial state using that type
export interface RoomState {
    rooms: PaginatedList<RoomInterface>;
    currentRoom: RoomInterface;
    isFetched: boolean;
    loading: boolean;
    error: string;
}

export interface SpecializationState {
    specializations: PaginatedList<SpecializationInterface>;
    currentSpecialization: SpecializationInterface;
    isFetched: boolean;
    loading: boolean;
    error: string;
}
export interface SubDepartmentsState {
    subDepartments: PaginatedList<SubDepartmentsInterface>;
    currentSubDepartment: SubDepartmentsInterface;
    isFetched: boolean;
    loading: boolean;
    error: string;
}

export interface PermissionsState {
    permissionsList: PermissionInterface[];
    currentPermission: PermissionInterface;
    loading: boolean;
    error: string;
}
