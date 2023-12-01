import PersonInterface from "./person-interface";

export default interface UserInterface {
    id: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
    createdById?: string;
    person: PersonInterface;
}