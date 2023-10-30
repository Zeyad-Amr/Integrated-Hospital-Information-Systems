import StaffEntity from "@/modules/staff/domain/entities/staff-entity";

// Define the initial state using that type
export interface StaffState {
    staffList: StaffEntity[];
    loading: boolean;
    error: string;
}