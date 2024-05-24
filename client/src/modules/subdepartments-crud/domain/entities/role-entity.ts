import RoleInterface from "../interfaces/role-interface";


export default class RoleEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): RoleInterface {
        return {
            id: '',
            value: '',
        };
    }
}
