export type PromiseValue<PromiseType> = PromiseType extends PromiseLike<infer Value> ? PromiseValue<Value> : PromiseType;


type AsyncFunction = (...args: any[]) => Promise<unknown>;
export type AsyncReturnType<Target extends AsyncFunction> = PromiseValue<ReturnType<Target>>;