import RoleInterface from "../interfaces/role-interface";
import { Yup } from '@/core/shared/utils/validation';


export default class RoleEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): RoleInterface {
        return {
            id: '',
            value : '',
        };
    }
}
