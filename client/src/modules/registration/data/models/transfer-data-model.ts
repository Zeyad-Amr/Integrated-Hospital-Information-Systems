import { TransferDataInterface } from "../../domain/interfaces/transfer-data-interface";

export default class TransferDataModel {

    // //* --------------------- Serialization: Convert the model to JSON ---------------------
    static toJson(data: TransferDataInterface): any {
        const formatDateTime = (date: any) => {
            if (!date) return undefined;
            const parsedDate = new Date(date);
            if (isNaN(parsedDate.getTime())) return undefined;
            return parsedDate.toISOString();
          };
        return {
            toSubDepId: data.toSubDepId,
            transferDate: formatDateTime(data.transferDate),
        }
    }


    // //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): TransferDataInterface {
        return {
            toSubDepId: json.toSubDepId,
            transferDate: json.transferDate,
        };
    }
}
