import UserEntity from "@/modules/auth/domain/entities/user-entity";
import EmployeeInterface from "../interfaces/employee-interface";

export default class EmployeeEntity extends UserEntity {
    constructor(data: EmployeeInterface) {
        super(data); // Call the constructor of the base class (UserEntity)
    }

    //* --------------------- Getters ---------------------

    //* --------------------- Setters ---------------------

    //* --------------------- Methods ---------------------
}
