import { Yup } from '@/core/shared/utils/validation';
import SubDepartmentsInterface from "../interfaces/sub-departments-interface";


export default class SubDepartmentsEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): SubDepartmentsInterface {
        return {
            id: '',
            name : '',
            roomId : '',
            departmentId : '',
            specializationId : '',
        };
    }
}
