import { LookupsInterface } from "../interfaces/lookups-interface";

abstract class BaseLookupsRepository {
    abstract getLookups(): Promise<LookupsInterface>;
}

export default BaseLookupsRepository;