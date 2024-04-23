import SpecializationInterface from "../interfaces/specialization -interface";
import { Yup } from '@/core/shared/utils/validation';


export default class SpecializationEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): SpecializationInterface {
        return {
            id: '',
            name : '',
            description : '',
        };
    }

    static specializationsFormValidations(): Yup.ObjectSchema<any> {
        return Yup.object({
            name: Yup.string()
                .required("Name is required")
                .min(3, "Name must be at least 3 characters")
                .max(45, "Name must be at most 45 characters"),
            description: Yup.string()
                .required("description is required")
        });
    }
}
