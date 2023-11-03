import StaffEntity from "@/modules/staff/domain/entities/staff-entity";

// Define the initial state using that type
export interface StaffState {
    staffList: StaffEntity[];
    currentStaffMember: StaffEntity | null;
    loading: boolean;
    error: string;
}