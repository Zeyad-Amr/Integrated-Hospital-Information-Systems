class Either<L, R> {
    private readonly value: L | R;

    private constructor(value: L | R) {
        this.value = value;
    }

    static left<L, R>(l: L): Either<L, R> {
        return new Either<L, R>(l);
    }

    static right<L, R>(r: R): Either<L, R> {
        return new Either<L, R>(r);
    }

    isLeft(): boolean {
        return this.value instanceof Left;
    }

    isRight(): boolean {
        return this.value instanceof Right;
    }

    left(): L {
        if (this.isLeft()) {
            return this.value as L;
        }
        throw new Error("Cannot get left value from a Right Either");
    }

    right(): R {
        if (this.isRight()) {
            return this.value as R;
        }
        throw new Error("Cannot get right value from a Left Either");
    }
}

class Left<L> {
    constructor(private readonly value: L) { }
}

class Right<R> {
    constructor(private readonly value: R) { }
}

export { Either, Left, Right };