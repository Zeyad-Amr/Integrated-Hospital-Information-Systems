import { Yup } from "@/core/shared/utils/validation";
import { IncidentInterface } from "../interfaces/incident-interface";

export default class IncidentEntity {

    static defaultValue(): IncidentInterface {
        return {
            numOfPatients: "",
            additionalInfo: undefined,
            comoanions: undefined,
        }
    }

    static getNumOfPatientsSchema(): Yup.ObjectSchema<any> {

        return Yup.object({
            numOfPatients: Yup.number().required("يجب إدخال عدد المرضى"),
        });

    }


}


