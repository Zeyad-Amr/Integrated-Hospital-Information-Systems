import { Yup } from "@/core/shared/utils/validation";

export default class IncidentEntity {

    // static defaultValue(): AdditionalDataInterface {
    //     return {
    //         comeFrom: undefined,
    //         attendantName: undefined,
    //         attendantSSN: undefined,
    //         attendantSerialNumber: undefined,
    //         attendantRole: undefined,
    //         carNum: undefined,
    //         firstChar: undefined,
    //         secondChar: undefined,
    //         thirdChar: undefined,
    //         reason: undefined,
    //         place: undefined,
    //         notes: undefined,
    //     }
    // }

    static getNumOfPatientsSchema(): Yup.ObjectSchema<any> {

        return Yup.object({
            numOfPatients: Yup.number().required("يجب إدخال عدد المرضى"),
        });

    }


}


