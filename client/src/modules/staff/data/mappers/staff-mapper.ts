import StaffModel from "../models/staff-model";
import StaffEntity from "../../domain/entities/staff-entity";

class StaffMapper {
    static entityToModel(entity: StaffEntity): StaffModel {
        return new StaffModel({
            id: entity.id,
            name: entity.name,
            ssn: entity.ssn,
            email: entity.email,
            phone: entity.phone,
            role: entity.role,
        });
    }

    static modelToEntity(model: StaffModel): StaffEntity {
        return new StaffEntity({
            id: model.id,
            name: model.name,
            ssn: model.ssn,
            email: model.email,
            phone: model.phone,
            role: model.role,
        });
    }
}

export default StaffMapper;
