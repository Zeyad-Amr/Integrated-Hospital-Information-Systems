import PermissionInterface from "../interfaces/permission-interface";
import { Yup } from '@/core/shared/utils/validation';


export default class PermissionEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): PermissionInterface {
        return {
            id: '',
            featureId : '',
            subdepartmentId : '',
            roleId : '',
        };
    }
}
