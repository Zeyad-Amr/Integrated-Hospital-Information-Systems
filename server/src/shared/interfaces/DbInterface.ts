import { methodsArgs } from "./methodsArgs";

export interface DbInterface<T, R, W extends methodsArgs> {
    create(data: T, ids?: W['ids']): Promise<R>;
    getAll(args?: W['FindManyArgs']): Promise<R[]>
    getOne(args: W['FindFirstOrThrowArgs'], isThrow?: boolean): Promise<R | null>
    updateOne(args: W['UpdateArgs']): Promise<R>
    deleteOne(args: W['DeleteArgs']): void;
    deleteMany?(args: W['DeleteArgs']): void;
    count?(args: W['CountArgs']): Promise<number>;
}










