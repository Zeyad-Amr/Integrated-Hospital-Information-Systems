import PersonInterface from "../interfaces/person-interface";

export default abstract class BasePersonRepository {
    abstract getPerson(ssn: string): Promise<PersonInterface>;
}

