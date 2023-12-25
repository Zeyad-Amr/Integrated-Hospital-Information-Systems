import { LookupsInterface } from "../../domain/interfaces/lookups-interface";

export interface LookupsState {
    lookups: LookupsInterface;
    loading: boolean;
    error: string;
}