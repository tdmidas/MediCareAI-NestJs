import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

@Injectable()
export class ValidateDoctorPipe implements PipeTransform {
  private readonly logger = new Logger(ValidateDoctorPipe.name);
  transform(value: any, metadata: ArgumentMetadata) {

    if (metadata.type !== 'param' || metadata.metatype !== String) {
      return value;
    }

    if (!uuidValidate(value) || uuidVersion(value) !== 4) {
      throw new BadRequestException('Invalid ID format. Please provide a valid UUID.');
    }

    return value;
  }
}
