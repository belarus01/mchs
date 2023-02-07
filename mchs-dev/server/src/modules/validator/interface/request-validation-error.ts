export interface RequestValidationError {
    properties: string[]; //массив потому что ошибка может относится к нескольким полям
    errors: {[key: string]: string};
    nested?: RequestValidationError[];
}