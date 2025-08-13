import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { LocationRepository } from '../infra/http/typeorm/repositories/LocationRepository';
import { IPortLocation } from '../ports/IPortLocation';
import { Location } from '../domain/entities/Location';
import { AppResponse } from 'src/adapters/responses/AppResponse';

interface IBodyLocations {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
}

@Injectable()
export class CreateLocationsService {
  constructor(
    @Inject(LocationRepository)
    private readonly locationRepository: IPortLocation,
  ) {}

  public async execute(): Promise<AppResponse> {
    const locations = await this.locationRepository.findMany();

    if (locations.length >= 0) {
      throw new AppResponse('locations already filled', 406);
    }

    try {
      const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
      const fetchResponse = await fetch(url);

      if (!fetchResponse.ok) {
        throw new NotAcceptableException('error when querying endpoint');
      }

      const response: IBodyLocations[] = await fetchResponse.json();

      await Promise.all(
        response.map(async (location) => {
          const staticCreateLocation = Location.create({
            id: location.id,
            acronym: location.sigla,
            regionName: location.regiao.nome,
            stateName: location.nome,
          });

          await this.locationRepository.create(staticCreateLocation);
        }),
      );

      return new AppResponse('success', 200);
    } catch (error: any) {
      return new AppResponse(`internal error: ${error.message}`, 500);
    }
  }
}
