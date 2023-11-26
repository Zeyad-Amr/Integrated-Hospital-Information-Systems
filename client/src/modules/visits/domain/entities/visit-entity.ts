import PersonEntity from "@/modules/auth/domain/entities/person-entity";

export default class VisitEntity {
    code: string;
    sequenceNumber: number | null;
    kinship: string | null;
    createdAt: Date;
    updatedAt: Date;
    creator: PersonEntity;
    patient: PersonEntity;
    companion: PersonEntity;
    incidentId: string;

    constructor(data: {
        code: string;
        sequenceNumber: number | null;
        kinship: string | null;
        createdAt: Date;
        updatedAt: Date;
        creator: PersonEntity;
        patient: PersonEntity;
        companion: PersonEntity;
        incidentId: string;
    }) {
        this.code = data.code;
        this.sequenceNumber = data.sequenceNumber;
        this.kinship = data.kinship;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.creator = data.creator;
        this.patient = data.patient;
        this.companion = data.companion;
        this.incidentId = data.incidentId;
    }

    //* --------------------- Getters ---------------------
    getCode(): string {
        return this.code;
    }

    getSequenceNumber(): number | null {
        return this.sequenceNumber;
    }

    getKinship(): string | null {
        return this.kinship;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    getCreator(): PersonEntity {
        return this.creator;
    }

    getPatient(): PersonEntity {
        return this.patient;
    }

    getCompanion(): PersonEntity {
        return this.companion;
    }

    getIncidentId(): string {
        return this.incidentId;
    }

    //* --------------------- Setters ---------------------

    setCode(code: string): void {
        this.code = code;
    }

    setSequenceNumber(sequenceNumber: number | null): void {
        this.sequenceNumber = sequenceNumber;
    }

    setKinship(kinship: string | null): void {
        this.kinship = kinship;
    }

    setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt;
    }

    setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt;
    }

    setCreator(creator: PersonEntity): void {
        this.creator = creator;
    }

    setPatient(patient: PersonEntity): void {
        this.patient = patient;
    }

    setCompanion(companion: PersonEntity): void {
        this.companion = companion;
    }

    setIncidentId(incidentId: string): void {
        this.incidentId = incidentId;
    }
    //* --------------------- Methods ---------------------

}


