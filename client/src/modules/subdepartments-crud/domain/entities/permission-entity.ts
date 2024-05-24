import PermissionInterface from "../interfaces/permission-interface";


export default class PermissionEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): PermissionInterface {
        return {
            id: '',
            featureId: '',
            subdepartmentId: '',
            roleId: '',
        };
    }
}
