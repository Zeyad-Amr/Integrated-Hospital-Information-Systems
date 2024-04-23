import RoomInterface from "../interfaces/room-interface";
import { Yup } from '@/core/shared/utils/validation';


export default class RoomEntity {

    //* --------------------- Methods ---------------------
    static defaultValue(): RoomInterface {
        return {
            id: '',
            name : '',
            location : '',
        };
    }

    static roomsFormValidations(): Yup.ObjectSchema<any> {
        return Yup.object({
            name: Yup.string()
                .required("Name is required")
                .min(3, "Name must be at least 3 characters")
                .max(45, "Name must be at most 45 characters"),
            location: Yup.string()
                .required("location is required")
        });
    }
}
