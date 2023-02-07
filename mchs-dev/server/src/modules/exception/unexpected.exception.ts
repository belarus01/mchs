//если из сервиса вылетило что-то не унаследованное от Exception

import { Exception } from "./exception";

/*т.е. через интерцептор(exception.intercptor.ts), который все ошибки не являющиеся экземпляром наследников Exception
 заворачивает в new UnexpectedException(error) и прокидывает дальше*/

 export class UnexpectedException extends Exception{
    public readonly type = 'unexpected';
 }