import {
    IdentityEnum,
    GenderEnum,
    RoleEnum,
    ShiftEnum,
} from './enums';
import {
    IIdentity,
    IGender,
    IRole,
    IShift,
} from './interfaces';

export const identityList: IIdentity[] = [
    { key: IdentityEnum.NATIONALIDCARD, label: "بطاقة الهوية الوطنية" },
    { key: IdentityEnum.PASSPORT, label: "جواز السفر" },
];

export const genderList: IGender[] = [
    { key: GenderEnum.MALE, label: "ذكر" },
    { key: GenderEnum.FEMALE, label: "أنثى" },
];

export const roleList: IRole[] = [
    { key: RoleEnum.ADMIN, label: "مدير" },
    { key: RoleEnum.EMPLOYEE, label: "موظف" },
    { key: RoleEnum.DOCTOR, label: "طبيب" },
    { key: RoleEnum.NURSE, label: "ممرضة" },
];

export const shiftList: IShift[] = [
    { key: ShiftEnum.MORNING8, label: "ورديات صباحية لمدة 8 ساعات" },
    { key: ShiftEnum.AFTERNOON8, label: "ورديات مسائية لمدة 8 ساعات" },
    { key: ShiftEnum.NIGHT8, label: "ورديات ليلية لمدة 8 ساعات" },
    { key: ShiftEnum.MORNING12, label: "ورديات صباحية لمدة 12 ساعة" },
    { key: ShiftEnum.NIGHT12, label: "ورديات ليلية لمدة 12 ساعة" },
    { key: ShiftEnum.LONG, label: "وردية طويلة" },
];
