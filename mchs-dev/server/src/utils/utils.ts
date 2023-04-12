import { skip } from "rxjs";
import { FindManyOptions } from "typeorm";

export interface Pagination {
    current?: string;
    pageSize?: string;
    total?: number;
  }

export function skipPage<T>(array:T[], current: string, pageSize: string, total: number){
  const skip = parseInt(pageSize)*(parseInt(current)-1);
  const take = pageSize;
  const result = array.slice(skip, skip+parseInt(take));
  total = array.length;
  return {result, skip, take, total};
  }

export interface Order{
    field:string;
    order:string;
}

export function sortByField<T>(array:T[], field:string, order:string){
  const sorted = array.sort((a,b)=>{
    if(a[field] < b[field])
      return -1*parseInt(order);
    else if(a[field] > b[field])
      return 1*parseInt(order);
    else return 0;
  })
  return sorted;
}
