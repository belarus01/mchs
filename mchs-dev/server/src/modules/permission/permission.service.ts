import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, switchMap } from 'rxjs';
import { Repository } from 'typeorm';
import { CreatePermissionDTO } from './create-permission.dto';
import { DeletePermissionDTO } from './dto/delete-permission.dto';
import { SPermissions } from './entity/permission.entity';

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(SPermissions, 'mchs_connection') private permissionRepository: Repository<SPermissions>){}

    async createPermission(dto:CreatePermissionDTO): Promise<SPermissions>{
        const permission = this.permissionRepository.create(dto);
        return this.permissionRepository.save(permission);
    }

    async getPermissionById(idPerm: number): Promise<SPermissions>{
        const permission = this.permissionRepository.findOneBy({idPerm});
        return permission;
    }

    async getAllPermissions(): Promise<SPermissions[]>{
        const permissions = this.permissionRepository.find({where: {active: 1}});
        return permissions;
    }

    async updatePermission(idPerm: number, dto: CreatePermissionDTO){
        /* return from(this.permissionRepository.update(idPerm, dto)).pipe(
            switchMap(() => this.getPermissionById(idPerm))
        ); */
        return this.permissionRepository.update(idPerm,dto);
    }

    async deletePermission(dto: DeletePermissionDTO){
        return this.permissionRepository.update(dto.idPerm, {active: 0, dateRecord: new Date(Date.now()), uid: dto.uid});
    }
}
