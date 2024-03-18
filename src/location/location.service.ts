import { Injectable, ForbiddenException } from '@nestjs/common';
import LocationRepository from './location.repository';
import { InputLocationDto } from './dto/input-location';
@Injectable()
export class LocationService {
    constructor(private readonly locationRepository: LocationRepository) {}

    async create(createLocation: InputLocationDto) {
        let parts = createLocation.number.split('-');
        let label = parts.pop();
        if (parts.length > 1) {
            let parentNumber = parts.join('-');
            let records = await this.locationRepository.getByNumber(parentNumber);
            if (records.length === 0) {
                throw new ForbiddenException()
            }
        }
        return await this.locationRepository.create({...createLocation, label: label})
    }

    async update(id: number, updateLocation: InputLocationDto) {
        let parts = updateLocation.number.split('-');
        let label = parts.pop();
        if (parts.length > 1) {
            let parentNumber = parts.join('-');
            let records = await this.locationRepository.getByNumber(parentNumber);
            if (records.length === 0) {
                throw new ForbiddenException()
            }
        }
        return await this.locationRepository.update(id, {...updateLocation, label: label})
    }

    async delete(id: number) {
        let records = await this.locationRepository.getById(id);
        if (records.length === 0) {
            throw new ForbiddenException()
        }
        return await this.locationRepository.delete(records[0].number)
    }
}
