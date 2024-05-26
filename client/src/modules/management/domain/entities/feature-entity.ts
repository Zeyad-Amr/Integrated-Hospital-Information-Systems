import FeatureInterface from "../interfaces/feature-interface";


export default class FeatureEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): FeatureInterface {
        return {
            id: '',
            name: '',
            subDepartmentId: '',
        };
    }
}
