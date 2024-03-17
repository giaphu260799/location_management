import { Body, ConflictException, Controller, Delete, ForbiddenException, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res, ValidationPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { InputLocationDto } from './dto/input-location';
import { Response } from 'express';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Post()
    async create(@Body(ValidationPipe) createLocation: InputLocationDto, @Res() res: Response) {
        try {
            const result = await this.locationService.create(createLocation)
            if (result) {
                return res.status(HttpStatus.CREATED).json({
                    message: 'Create location successfully',
                    statusCode: HttpStatus.CREATED
                })
            } else {
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'This ocation already exists',
                    statusCode: HttpStatus.CONFLICT
                })
            }
        } catch (error) {
            if (error instanceof ForbiddenException) {
                return res.status(HttpStatus.FORBIDDEN).json({
                    message: 'The parent of this location does not exist.',
                    statusCode: HttpStatus.FORBIDDEN
                })
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'An error occurred while creating the location',
                    statusCode: HttpStatus.BAD_REQUEST
                })
            }
        }
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateLocation: InputLocationDto, @Res() res: Response) {
        try {
            const result = await this.locationService.update(id, updateLocation)
            if (result) {
                return res.status(HttpStatus.OK).json({
                    message: 'Update location successfully',
                    statusCode: HttpStatus.OK
                })
            } else {
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'This ocation already exists',
                    statusCode: HttpStatus.CONFLICT
                })
            }
        } catch (error) {
            if (error instanceof ForbiddenException) {
                return res.status(HttpStatus.FORBIDDEN).json({
                    message: 'The parent of this location does not exist.',
                    statusCode: HttpStatus.FORBIDDEN
                })
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'An error occurred while updating the location',
                    statusCode: HttpStatus.BAD_REQUEST
                })
            }
        }
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        try {
            await this.locationService.delete(Number(id))
            return res.status(HttpStatus.OK).json({
                message: 'Delete location successfully',
                statusCode: HttpStatus.OK
            })
        } catch (error) {
            if (error instanceof ForbiddenException) {
                return res.status(HttpStatus.FORBIDDEN).json({
                    message: 'This location does not exist.',
                    statusCode: HttpStatus.FORBIDDEN
                })
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'An error occurred while deleting the location',
                    statusCode: HttpStatus.BAD_REQUEST
                })
            }
        }
    }

}
