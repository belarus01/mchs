import { Global, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SDept } from './entity/department.entity';
import { SDeptUnits } from './entity/departmentUnit.entity';
import { DeptNotFoundException } from './exception/dept.not-found.exception';
import { DeptUnitNotFoundException } from './exception/deptUnit.not-found.exception';

@Injectable()
export class DepartmentService {
    constructor(@InjectRepository(SDept, 'mchs_connection') private deptRepository: Repository<SDept>,
    @InjectRepository(SDeptUnits, 'mchs_connection')private deptUnitRepository: Repository<SDeptUnits>){}

    /* в зависимости от:
            - мчс/надзор
            - админ/суперадмин => @ роли над соответ методом?*/

    async getDeptById(idDept: number): Promise<SDept>{
        const dept = await this.deptRepository.findOneBy({idDept});
        if(!dept){
            throw new DeptNotFoundException(idDept);
        }
        return dept;
    }

    async getDeptUnitById(idDeptUnits: number): Promise<SDeptUnits>{
        const deptUnit = this.deptUnitRepository.findOneBy({idDeptUnits});
        if(!deptUnit){
            throw new DeptUnitNotFoundException(idDeptUnits);
        }
        return deptUnit;
    }

    async getAllMchsDepts(): Promise<SDept[]>{
        const mchsDepts = await this.deptRepository.find({where: {org:1, active:1}});
        return mchsDepts;
    }

    async getAllNadzDepts(): Promise<SDept[]>{
        const nadzDepts = await this.deptRepository.find({where: {org:0, active:1}});
        return nadzDepts;
    }

    async getAllDepts(): Promise<SDept[]>{
        const depts = await this.deptRepository.find({where: {
            active:1
        }});
        return depts;
    }

    async getAllDeptUnits(): Promise<SDeptUnits[]>{
        const depts = await this.deptUnitRepository.find();
        return depts;
    }

    

    /**!!!!!!!!
     * 
     * => создать отдельную таблицу связей sdept и sdeptunits = dept_unit,
     * удалить поле id_dept в таблице s_dept */
    async getAllDeptUnitsByDept(idDept: number): Promise<SDeptUnits[]>{
        const deptsOfDeptUnit = await this.deptUnitRepository.find({where: {
            active:1, id_dept: idDept,
        }})
        if(deptsOfDeptUnit.length == 0){
            throw new DeptNotFoundException(idDept);
        }
        return deptsOfDeptUnit;
    }
    

   /*  async getDepartmentName(){

    }

    async getDepartmentAddress(){

    }

    async getTelHead(){

    }

    async getTelReception(){

    }

    async getTelOper(){

    }

    async getDeptEmail(){

    } */

    

    
}
