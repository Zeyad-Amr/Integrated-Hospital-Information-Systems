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
    { id: IdentityEnum.NATIONALIDCARD, label: "بطاقة الهوية الوطنية" },
    { id: IdentityEnum.PASSPORT, label: "جواز السفر" },
];

export const genderList: IGender[] = [
    { id: GenderEnum.MALE, label: "ذكر" },
    { id: GenderEnum.FEMALE, label: "أنثى" },
];

export const roleList: IRole[] = [
    { id: RoleEnum.ADMIN, label: "مدير" },
    { id: RoleEnum.EMPLOYEE, label: "موظف" },
    { id: RoleEnum.DOCTOR, label: "طبيب" },
    { id: RoleEnum.NURSE, label: "ممرضة" },
];

export const shiftList: IShift[] = [
    { id: ShiftEnum.MORNING8, label: "ورديات صباحية لمدة 8 ساعات" },
    { id: ShiftEnum.AFTERNOON8, label: "ورديات مسائية لمدة 8 ساعات" },
    { id: ShiftEnum.NIGHT8, label: "ورديات ليلية لمدة 8 ساعات" },
    { id: ShiftEnum.MORNING12, label: "ورديات صباحية لمدة 12 ساعة" },
    { id: ShiftEnum.NIGHT12, label: "ورديات ليلية لمدة 12 ساعة" },
    { id: ShiftEnum.LONG, label: "وردية طويلة" },
];

export const governateList: IGovernate[] = [
    { id: GovernateEnum.ALEXANDRIA, label: "الإسكندرية" },
    { id: GovernateEnum.ASWAN, label: "أسوان" },
    { id: GovernateEnum.ASYUT, label: "أسيوط" },
    { id: GovernateEnum.LUXOR, label: "الأقصر" },
    { id: GovernateEnum.RED_SEA, label: "البحر الأحمر" },
    { id: GovernateEnum.BEHEIRA, label: "البحيرة" },
    { id: GovernateEnum.BENI_SUEF, label: "بني سويف" },
    { id: GovernateEnum.PORT_SAID, label: "بورسعيد" },
    { id: GovernateEnum.SOUTH_SINAI, label: "جنوب سيناء" },
    { id: GovernateEnum.GIZA, label: "الجيزة" },
    { id: GovernateEnum.DAKAHLIA, label: "الدقهلية" },
    { id: GovernateEnum.DAMIETTA, label: "دمياط" },
    { id: GovernateEnum.SOHAG, label: "سوهاج" },
    { id: GovernateEnum.SUEZ, label: "السويس" },
    { id: GovernateEnum.SHARQIA, label: "الشرقية" },
    { id: GovernateEnum.NORTH_SINAI, label: "شمال سيناء" },
    { id: GovernateEnum.GHARBIA, label: "الغربية" },
    { id: GovernateEnum.FAYOUM, label: "الفيوم" },
    { id: GovernateEnum.CAIRO, label: "القاهرة" },
    { id: GovernateEnum.QALYUBIA, label: "القليوبية" },
    { id: GovernateEnum.QENA, label: "قنا" },
    { id: GovernateEnum.KAFR_EL_SHEIKH, label: "كفر الشيخ" },
    { id: GovernateEnum.MATRUH, label: "مطروح" },
    { id: GovernateEnum.MONUFIA, label: "المنوفية" },
    { id: GovernateEnum.MINYA, label: "المنيا" },
];

export const departmentList: IDepartment[] = [
    { id: DepartmentEnum.CARDIOLOGY, label: "طب القلب" },
    { id: DepartmentEnum.DERMATOLOGY, label: "طب الجلدية" },
    { id: DepartmentEnum.ENDOCRINOLOGY, label: "طب الغدد الصماء" },
    { id: DepartmentEnum.GASTROENTEROLOGY, label: "الجهاز الهضمي" },
    { id: DepartmentEnum.GENERAL_SURGERY, label: "جراحة عامة" },
    { id: DepartmentEnum.GYNECOLOGY, label: "طب نسائي" },
    { id: DepartmentEnum.NEUROLOGY, label: "طب الأعصاب" },
    { id: DepartmentEnum.NEUROSURGERY, label: "جراحة الأعصاب" },
    { id: DepartmentEnum.OPHTHALMOLOGY, label: "طب العيون" },
    { id: DepartmentEnum.ORTHOPEDICS, label: "طب العظام" },
    { id: DepartmentEnum.OTORHINOLARYNGOLOGY, label: "أنف وأذن وحنجرة" },
    { id: DepartmentEnum.PEDIATRICS, label: "طب الأطفال" },
    { id: DepartmentEnum.PSYCHIATRY, label: "طب النفسي" },
    { id: DepartmentEnum.UROLOGY, label: "طب المسالك البولية" },
    { id: DepartmentEnum.RADIOLOGY, label: "الأشعة" },
    { id: DepartmentEnum.ANESTHESIOLOGY, label: "تخدير" },
    { id: DepartmentEnum.EMERGENCY, label: "طوارئ" },
    { id: DepartmentEnum.INTERNAL_MEDICINE, label: "طب الباطنية" },
    { id: DepartmentEnum.PATHOLOGY, label: "علم الأمراض" },
    { id: DepartmentEnum.PHYSICAL_MEDICINE, label: "طب الطب البدني" },
    { id: DepartmentEnum.PLASTIC_SURGERY, label: "جراحة تجميل" },
    { id: DepartmentEnum.PULMONOLOGY, label: "أمراض الصدر" },
    { id: DepartmentEnum.RHEUMATOLOGY, label: "الروماتيزم" },
    { id: DepartmentEnum.THORACIC_SURGERY, label: "جراحة الصدر" },
    { id: DepartmentEnum.VASCULAR_SURGERY, label: "جراحة الأوعية الدموية" },
    { id: DepartmentEnum.DENTISTRY, label: "طب الأسنان" },
    { id: DepartmentEnum.NURSING, label: "تمريض" },
    { id: DepartmentEnum.PHARMACY, label: "صيدلة" },
    { id: DepartmentEnum.PHYSIOTHERAPY, label: "علاج طبيعي" },
    { id: DepartmentEnum.ADMINISTRATION, label: "الإدارة" },
    { id: DepartmentEnum.OTHER, label: "أخرى" },
];