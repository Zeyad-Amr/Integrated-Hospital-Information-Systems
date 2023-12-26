import { LookupsInterface } from '../../domain/interfaces/lookups-interface';

export default class LookupsModel {

    //* --------------------- Serialization: Convert the model to JSON ---------------------


    //* --------------------- Deserialization: Create a model from JSON data ---------------------
    static fromJson(json: any): LookupsInterface {

        return {
            identityTypes: json.identityType || [],
            genderTypes: json.genderType || [],
            kinshipTypes: json.kinshipType || [],
            roleTypes: json.roleType || [],
            shiftTypes: json.shiftType || [],
            cameFromOptions: json.cameFromOptions || [],
            attendantRoles: json.attendantRole || [],
            triageTypes: json.triageType || [],
            LOC: json.LOC || [],
            comorbidities: json.comorbidities || [],
            governates: json.governates || [
                { id: 1, value: "الإسكندرية" },
                { id: 2, value: "أسوان" },
                { id: 3, value: "أسيوط" },
                { id: 4, value: "الأقصر" },
                { id: 5, value: "البحر الأحمر" },
                { id: 6, value: "البحيرة" },
                { id: 7, value: "بني سويف" },
                { id: 8, value: "بورسعيد" },
                { id: 9, value: "جنوب سيناء" },
                { id: 10, value: "الجيزة" },
                { id: 11, value: "الدقهلية" },
                { id: 12, value: "دمياط" },
                { id: 13, value: "سوهاج" },
                { id: 14, value: "السويس" },
                { id: 15, value: "الشرقية" },
                { id: 16, value: "شمال سيناء" },
                { id: 17, value: "الغربية" },
                { id: 18, value: "الفيوم" },
                { id: 19, value: "القاهرة" },
                { id: 20, value: "القليوبية" },
                { id: 21, value: "قنا" },
                { id: 22, value: "كفر الشيخ" },
                { id: 23, value: "مطروح" },
                { id: 24, value: "المنوفية" },
                { id: 25, value: "المنيا" },
            ],
            departments: json.departments || [],
        };
    }


}
