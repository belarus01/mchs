export abstract class Exception{
    abstract type: string;

    constructor(
        public readonly code: number,
        public readonly message: string,
        public readonly inner?: any//внутрення ошибка, которая может быть завёрнута в исключение
    ){}

    toString(): string {
        return;
        // Здесь логика сериализации, работа со стек-трейсами, вложенными ошибками и проч.
    }
}