/* import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserGroupNotFoundException } from "./exception/user-group.not-found.exception";
import { UserGroup } from "./user-group.entity";

@Injectable()//..или все же в модуле group сделать..
export class UserGroupService {
    constructor(@InjectRepository(UserGroup, 'mchs_connection') private userGroupRepository: Repository<UserGroup>){}

    //getDateBegin
    
    //getDateEnd

    
    
    async getAllUsersInGroupByGrId(idGroup: number): Promise<UserGroup[]>{
        const users = await this.userGroupRepository.find({where: {
            active:1, idGroup: idGroup,
        }, relations:{
            uidGr2: true
        }
    });
        if(users.length == 0){
            throw new UserGroupNotFoundException(idGroup);
        }
        return users;
    }



    

} */

