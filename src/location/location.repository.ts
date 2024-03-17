import { Injectable  } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import { FullLocationDto } from './dto/full-location';
 
@Injectable()
class LocationRepository {
  constructor(private readonly databaseService: DatabaseService) {}
  
  async getByNumber(number: string) {
    const databaseResponse = await this.databaseService.runQuery(`
    SELECT id, name, number FROM locations WHERE number = $1;
    `,[number.replaceAll('-', '.')]);
    return databaseResponse?.rows || [];
  }

  async getById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(`
    SELECT id, name, number FROM locations WHERE id = $1;
    `,[id]);
    return databaseResponse?.rows || [];
  }

  async create(location: FullLocationDto) {
    const databaseResponse = await this.databaseService.runQuery(`
    INSERT INTO locations (name, label, number, area)
    VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING;
    `,[location.name, location.label, location.number.replaceAll('-', '.'), location.area]);
    return databaseResponse?.rowCount || 0;
  }

  async update(id: number, location: FullLocationDto) {
    const databaseResponse = await this.databaseService.runQuery(`
    UPDATE locations
    SET name = $1, label = $2, number = $3, area = $4, updated_at = now()
    WHERE id = $5;
    `,[location.name, location.label, location.number.replaceAll('-', '.'), location.area, id]);
    return databaseResponse?.rowCount || 0;
  }

  async delete(number: string) {
    const databaseResponse = await this.databaseService.runQuery(`
    DELETE FROM locations
    WHERE id IN (SELECT id FROM locations WHERE number <@ $1);
    `,[number.replaceAll('-', '.')]);
    return databaseResponse?.rowCount || 0;
  }
}
 
export default LocationRepository;