import { ErrorMessage } from "../api";
import { Either } from "../shared/utils/either";

interface BaseUseCase<T, P> {
    call(param: P): Promise<Either<ErrorMessage, T>>;
}

export default BaseUseCase;
