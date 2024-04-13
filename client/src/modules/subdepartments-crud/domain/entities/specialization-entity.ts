import SpecializationInterface from "../interfaces/specialization -interface";

export default class SpecializationEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): SpecializationInterface {
        return {
            id: '',
            name : '',
            description : '',
        };
    }
}
