import {
    KinshipEnum,
} from './enums';
import {
    IKinship,
} from './interfaces';

export const kinshipList: IKinship[] = [
    { key: KinshipEnum.BROTHER, label: "أخ" },
    { key: KinshipEnum.SISTER, label: "أخت" },
    { key: KinshipEnum.FATHER, label: "أب" },
    { key: KinshipEnum.MOTHER, label: "أم" },
    { key: KinshipEnum.COUSIN, label: "ابن عم/ابنة عم" },
    { key: KinshipEnum.AUNT, label: "عمة" },
    { key: KinshipEnum.OTHER, label: "آخر" },
];
