import { LookupsInterface } from "../../domain/interfaces/lookups-interface";

export interface LookupsState {
    lookups: LookupsInterface;
    isFetched: boolean;
    loading: boolean;
    error: string;
}