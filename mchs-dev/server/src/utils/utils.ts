import { skip } from "rxjs";
import { FindManyOptions } from "typeorm";

export interface Pagination {
    current?: number;
    pageSize?: number;
    total?: number;
  }

/* export function skipPage<T extends FindManyOptions>(array:T[], current: number, pageSize: number){ // или все-таки передавать сюда total..
  (current: number, pageSize: number): FindManyOptions => ({
    skip: pageSize*(current-1),
    take: pageSize
    });
  const total = array.length;
  return{array, current, pageSize, total};///стоооооппппп а то ли ты возвращаешь??} */
  
  //const{current, pageSize, total} = pagination;
  /* skip: pageSize*(current-1),
  take: pageSize */
  //return { array, pagination};

   /**pagination.total = users.length;
        return {users, pagination}; */

//skip:pagination.pageSize*(pagination.current-1), take:pagination.pageSize}


//попробоать без skip take из FindManyOptions, создать свое
export function skipPage<T>(array:T[], current: number, pageSize: number){
  const skip = pageSize*(current-1);
  const take = pageSize;
  const total = array.length;
  return {array, skip, take, total};
  }



export interface Order{
    field:string;
    order:number;
}

export function sortByField<T>(array:T[], field:string, order:number){
  const sorted = array.sort((a,b)=>{
    if(a[field] < b[field])
      return -1*order;
    else if(a[field] > b[field])
      return 1*order;
    else return 0;
  })
  return sorted;
}
