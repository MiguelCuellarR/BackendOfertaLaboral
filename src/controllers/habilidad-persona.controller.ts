import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Habilidad,
HabilidadPersona,
Persona,
} from '../models';
import {HabilidadRepository} from '../repositories';

export class HabilidadPersonaController {
  constructor(
    @repository(HabilidadRepository) protected habilidadRepository: HabilidadRepository,
  ) { }

  @get('/habilidads/{id}/personas', {
    responses: {
      '200': {
        description: 'Array of Habilidad has many Persona through HabilidadPersona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.habilidadRepository.personas(id).find(filter);
  }

  @post('/habilidads/{id}/personas', {
    responses: {
      '200': {
        description: 'create a Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Habilidad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInHabilidad',
            exclude: ['id'],
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.habilidadRepository.personas(id).create(persona);
  }

  @patch('/habilidads/{id}/personas', {
    responses: {
      '200': {
        description: 'Habilidad.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.habilidadRepository.personas(id).patch(persona, where);
  }

  @del('/habilidads/{id}/personas', {
    responses: {
      '200': {
        description: 'Habilidad.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.habilidadRepository.personas(id).delete(where);
  }
}
