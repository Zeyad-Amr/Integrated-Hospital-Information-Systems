import FeatureInterface from "../interfaces/feature-interface";
import { Yup } from '@/core/shared/utils/validation';


export default class FeatureEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): FeatureInterface {
        return {
            id: '',
            name : '',
            subDepartmentId : '',
        };
    }
}
