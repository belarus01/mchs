export interface CreateTaskDataDTO{
    taskName: string;
    dateRecord: Date;//comment: "Дата постановки задачи",
    dateBegin: Date;
    dateEnd: Date;
    dateLastRun: Date;//comment: "Дата последнего запуска"
    periodType: number;//comment: "1-час 2-день 3-неделя 4-месяц 5-год",
    idTaskType: number;//comment: "Тип задания",
    /*там в бд в тестовых данных проставлены типы от 1 до 5, хз что чего обозначает*/
    idTaskStatus: number;//comment: "Текущий статус выполнения задания", статусы:  - не спланирована,  - в работе,  - завершена, - просрочена
    /*там в бд в тестовых данных проставлены статусы от 1 до 5, хз что чего обозначает*/
   }