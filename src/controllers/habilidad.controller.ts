import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Habilidad} from '../models';
import {HabilidadRepository} from '../repositories';

export class HabilidadController {
  constructor(
    @repository(HabilidadRepository)
    public habilidadRepository : HabilidadRepository,
  ) {}

  @post('/habilidades')
  @response(200, {
    description: 'Habilidad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Habilidad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habilidad, {
            title: 'NewHabilidad',
            exclude: ['id'],
          }),
        },
      },
    })
    habilidad: Omit<Habilidad, 'id'>,
  ): Promise<Habilidad> {
    return this.habilidadRepository.create(habilidad);
  }

  @get('/habilidades/count')
  @response(200, {
    description: 'Habilidad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Habilidad) where?: Where<Habilidad>,
  ): Promise<Count> {
    return this.habilidadRepository.count(where);
  }

  @get('/habilidades')
  @response(200, {
    description: 'Array of Habilidad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Habilidad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Habilidad) filter?: Filter<Habilidad>,
  ): Promise<Habilidad[]> {
    return this.habilidadRepository.find(filter);
  }

  @patch('/habilidades')
  @response(200, {
    description: 'Habilidad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habilidad, {partial: true}),
        },
      },
    })
    habilidad: Habilidad,
    @param.where(Habilidad) where?: Where<Habilidad>,
  ): Promise<Count> {
    return this.habilidadRepository.updateAll(habilidad, where);
  }

  @get('/habilidades/{id}')
  @response(200, {
    description: 'Habilidad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Habilidad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Habilidad, {exclude: 'where'}) filter?: FilterExcludingWhere<Habilidad>
  ): Promise<Habilidad> {
    return this.habilidadRepository.findById(id, filter);
  }

  @patch('/habilidades/{id}')
  @response(204, {
    description: 'Habilidad PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habilidad, {partial: true}),
        },
      },
    })
    habilidad: Habilidad,
  ): Promise<void> {
    await this.habilidadRepository.updateById(id, habilidad);
  }

  @put('/habilidades/{id}')
  @response(204, {
    description: 'Habilidad PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() habilidad: Habilidad,
  ): Promise<void> {
    await this.habilidadRepository.replaceById(id, habilidad);
  }

  @del('/habilidades/{id}')
  @response(204, {
    description: 'Habilidad DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.habilidadRepository.deleteById(id);
  }
}
