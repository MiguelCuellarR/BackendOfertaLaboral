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
Profesion,
ProfesionPersona,
Persona,
} from '../models';
import {ProfesionRepository} from '../repositories';

export class ProfesionPersonaController {
  constructor(
    @repository(ProfesionRepository) protected profesionRepository: ProfesionRepository,
  ) { }

  @get('/profesions/{id}/personas', {
    responses: {
      '200': {
        description: 'Array of Profesion has many Persona through ProfesionPersona',
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
    return this.profesionRepository.personas(id).find(filter);
  }

  @post('/profesions/{id}/personas', {
    responses: {
      '200': {
        description: 'create a Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Profesion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInProfesion',
            exclude: ['id'],
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.profesionRepository.personas(id).create(persona);
  }

  @patch('/profesions/{id}/personas', {
    responses: {
      '200': {
        description: 'Profesion.Persona PATCH success count',
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
    return this.profesionRepository.personas(id).patch(persona, where);
  }

  @del('/profesions/{id}/personas', {
    responses: {
      '200': {
        description: 'Profesion.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.profesionRepository.personas(id).delete(where);
  }
}
