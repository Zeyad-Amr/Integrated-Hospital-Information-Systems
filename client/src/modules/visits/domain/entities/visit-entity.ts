import PersonInterface from '@/modules/auth/domain/interfaces/person-interface';
import VisitInterface from '../interfaces/visit-interface';

export default class VisitEntity implements VisitInterface {
    // //* --------------------- Properties ---------------------
    _code?: string;
    _sequenceNumber?: number;
    _kinship?: string;
    _createdAt?: Date;
    _updatedAt?: Date;
    _patient?: PersonInterface;
    _companion?: PersonInterface;

    // //* --------------------- Constructor ---------------------
    constructor(data: VisitInterface) {
        this._code = data.code;
        this._sequenceNumber = data.sequenceNumber;
        this._kinship = data.kinship;
        this._createdAt = data.createdAt;
        this._updatedAt = data.updatedAt;
        this._patient = data.patient;
        this._companion = data.companion;
    }

    // //* --------------------- Getters ---------------------
    get code(): string | undefined {
        return this._code;
    }

    get sequenceNumber(): number | undefined {
        return this._sequenceNumber;
    }

    get kinship(): string | undefined {
        return this._kinship;
    }

    get createdAt(): Date | undefined {
        return this._createdAt;
    }

    get updatedAt(): Date | undefined {
        return this._updatedAt;
    }

    get patient(): PersonInterface | undefined {
        return this._patient;
    }

    get companion(): PersonInterface | undefined {
        return this._companion;
    }

    // //* --------------------- Setters ---------------------

    set code(value: string | undefined) {
        this._code = value;
    }

    set sequenceNumber(value: number | undefined) {
        this._sequenceNumber = value;
    }

    set kinship(value: string | undefined) {
        this._kinship = value;
    }

    set createdAt(value: Date | undefined) {
        this._createdAt = value;
    }

    set updatedAt(value: Date | undefined) {
        this._updatedAt = value;
    }

    set patient(value: PersonInterface | undefined) {
        this._patient = value;
    }

    set companion(value: PersonInterface | undefined) {
        this._companion = value;
    }

    //* --------------------- Methods ---------------------
    static defaultValue(): VisitInterface {
        return {
            code: "",
            sequenceNumber: undefined,
            kinship: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            patient: undefined,
            companion: undefined,
        }
    }

}


