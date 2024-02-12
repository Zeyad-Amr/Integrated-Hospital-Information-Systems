import {
    IdentityEnum,
    GenderEnum,
    RoleEnum,
    ShiftEnum,
    GovernateEnum,
    DepartmentEnum,
} from './enums';
import {
    IIdentity,
    IGender,
    IRole,
    IShift,
    IGovernate,
    IDepartment,
} from './interfaces';

export const identityList: IIdentity[] = [
    { id: IdentityEnum.NATIONALIDCARD, value: "بطاقة الهوية الوطنية" },
    { id: IdentityEnum.PASSPORT, value: "جواز السفر" },
];

export const genderList: IGender[] = [
    { id: GenderEnum.MALE, value: "ذكر" },
    { id: GenderEnum.FEMALE, value: "أنثى" },
];

export const roleList: IRole[] = [
    { id: RoleEnum.ADMIN, value: "مدير" },
    { id: RoleEnum.EMPLOYEE, value: "موظف" },
    { id: RoleEnum.DOCTOR, value: "طبيب" },
    { id: RoleEnum.NURSE, value: "ممرضة" },
];

export const shiftList: IShift[] = [
    { id: ShiftEnum.MORNING8, value: "ورديات صباحية لمدة 8 ساعات" },
    { id: ShiftEnum.AFTERNOON8, value: "ورديات مسائية لمدة 8 ساعات" },
    { id: ShiftEnum.NIGHT8, value: "ورديات ليلية لمدة 8 ساعات" },
    { id: ShiftEnum.MORNING12, value: "ورديات صباحية لمدة 12 ساعة" },
    { id: ShiftEnum.NIGHT12, value: "ورديات ليلية لمدة 12 ساعة" },
    { id: ShiftEnum.LONG, value: "وردية طويلة" },
];

export const governateList: IGovernate[] = [
    { id: GovernateEnum.ALEXANDRIA, value: "الإسكندرية" },
    { id: GovernateEnum.ASWAN, value: "أسوان" },
    { id: GovernateEnum.ASYUT, value: "أسيوط" },
    { id: GovernateEnum.LUXOR, value: "الأقصر" },
    { id: GovernateEnum.RED_SEA, value: "البحر الأحمر" },
    { id: GovernateEnum.BEHEIRA, value: "البحيرة" },
    { id: GovernateEnum.BENI_SUEF, value: "بني سويف" },
    { id: GovernateEnum.PORT_SAID, value: "بورسعيد" },
    { id: GovernateEnum.SOUTH_SINAI, value: "جنوب سيناء" },
    { id: GovernateEnum.GIZA, value: "الجيزة" },
    { id: GovernateEnum.DAKAHLIA, value: "الدقهلية" },
    { id: GovernateEnum.DAMIETTA, value: "دمياط" },
    { id: GovernateEnum.SOHAG, value: "سوهاج" },
    { id: GovernateEnum.SUEZ, value: "السويس" },
    { id: GovernateEnum.SHARQIA, value: "الشرقية" },
    { id: GovernateEnum.NORTH_SINAI, value: "شمال سيناء" },
    { id: GovernateEnum.GHARBIA, value: "الغربية" },
    { id: GovernateEnum.FAYOUM, value: "الفيوم" },
    { id: GovernateEnum.CAIRO, value: "القاهرة" },
    { id: GovernateEnum.QALYUBIA, value: "القليوبية" },
    { id: GovernateEnum.QENA, value: "قنا" },
    { id: GovernateEnum.KAFR_EL_SHEIKH, value: "كفر الشيخ" },
    { id: GovernateEnum.MATRUH, value: "مطروح" },
    { id: GovernateEnum.MONUFIA, value: "المنوفية" },
    { id: GovernateEnum.MINYA, value: "المنيا" },
];

export const departmentList: IDepartment[] = [
    { id: DepartmentEnum.CARDIOLOGY, value: "طب القلب" },
    { id: DepartmentEnum.DERMATOLOGY, value: "طب الجلدية" },
    { id: DepartmentEnum.ENDOCRINOLOGY, value: "طب الغدد الصماء" },
    { id: DepartmentEnum.GASTROENTEROLOGY, value: "الجهاز الهضمي" },
    { id: DepartmentEnum.GENERAL_SURGERY, value: "جراحة عامة" },
    { id: DepartmentEnum.GYNECOLOGY, value: "طب نسائي" },
    { id: DepartmentEnum.NEUROLOGY, value: "طب الأعصاب" },
    { id: DepartmentEnum.NEUROSURGERY, value: "جراحة الأعصاب" },
    { id: DepartmentEnum.OPHTHALMOLOGY, value: "طب العيون" },
    { id: DepartmentEnum.ORTHOPEDICS, value: "طب العظام" },
    { id: DepartmentEnum.OTORHINOLARYNGOLOGY, value: "أنف وأذن وحنجرة" },
    { id: DepartmentEnum.PEDIATRICS, value: "طب الأطفال" },
    { id: DepartmentEnum.PSYCHIATRY, value: "طب النفسي" },
    { id: DepartmentEnum.UROLOGY, value: "طب المسالك البولية" },
    { id: DepartmentEnum.RADIOLOGY, value: "الأشعة" },
    { id: DepartmentEnum.ANESTHESIOLOGY, value: "تخدير" },
    { id: DepartmentEnum.EMERGENCY, value: "طوارئ" },
    { id: DepartmentEnum.INTERNAL_MEDICINE, value: "طب الباطنية" },
    { id: DepartmentEnum.PATHOLOGY, value: "علم الأمراض" },
    { id: DepartmentEnum.PHYSICAL_MEDICINE, value: "طب الطب البدني" },
    { id: DepartmentEnum.PLASTIC_SURGERY, value: "جراحة تجميل" },
    { id: DepartmentEnum.PULMONOLOGY, value: "أمراض الصدر" },
    { id: DepartmentEnum.RHEUMATOLOGY, value: "الروماتيزم" },
    { id: DepartmentEnum.THORACIC_SURGERY, value: "جراحة الصدر" },
    { id: DepartmentEnum.VASCULAR_SURGERY, value: "جراحة الأوعية الدموية" },
    { id: DepartmentEnum.DENTISTRY, value: "طب الأسنان" },
    { id: DepartmentEnum.NURSING, value: "تمريض" },
    { id: DepartmentEnum.PHARMACY, value: "صيدلة" },
    { id: DepartmentEnum.PHYSIOTHERAPY, value: "علاج طبيعي" },
    { id: DepartmentEnum.ADMINISTRATION, value: "الإدارة" },
    { id: DepartmentEnum.OTHER, value: "أخرى" },
];