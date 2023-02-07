import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entity/location.entity';
import { LocationDTO } from './dto/location.dto';
import { LocationNotFoundException } from './exception/location.not-found.exception';

@Injectable()
export class LocationService {
    constructor(@InjectRepository(Location, 'mchs_connection') private locationRepository: Repository<Location>){}

    async getAllLocation():Promise<Location[]>{
        const locations = await this.locationRepository.find();
        return locations;
    }

    async getLocationsByUserId(uid: number): Promise<Location[]>{
        const locations = await this.locationRepository.find({where:{uid:uid}});
        if(locations){
            throw new LocationNotFoundException(uid);
        }
        return locations;
    }

    async addLocation(dto: LocationDTO){
        const location = this.locationRepository.create(dto);
        return this.locationRepository.save(location);
    }
}
