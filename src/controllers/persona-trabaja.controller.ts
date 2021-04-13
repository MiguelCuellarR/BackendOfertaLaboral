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
Persona,
ProfesionPersona,
Trabaja,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaTrabajaController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/trabajas', {
    responses: {
      '200': {
        description: 'Array of Persona has many Trabaja through ProfesionPersona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Trabaja)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Trabaja>,
  ): Promise<Trabaja[]> {
    return this.personaRepository.trabajas(id).find(filter);
  }

  @post('/personas/{id}/trabajas', {
    responses: {
      '200': {
        description: 'create a Trabaja model instance',
        content: {'application/json': {schema: getModelSchemaRef(Trabaja)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trabaja, {
            title: 'NewTrabajaInPersona',
            exclude: ['id'],
          }),
        },
      },
    }) trabaja: Omit<Trabaja, 'id'>,
  ): Promise<Trabaja> {
    return this.personaRepository.trabajas(id).create(trabaja);
  }

  @patch('/personas/{id}/trabajas', {
    responses: {
      '200': {
        description: 'Persona.Trabaja PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Trabaja, {partial: true}),
        },
      },
    })
    trabaja: Partial<Trabaja>,
    @param.query.object('where', getWhereSchemaFor(Trabaja)) where?: Where<Trabaja>,
  ): Promise<Count> {
    return this.personaRepository.trabajas(id).patch(trabaja, where);
  }

  @del('/personas/{id}/trabajas', {
    responses: {
      '200': {
        description: 'Persona.Trabaja DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Trabaja)) where?: Where<Trabaja>,
  ): Promise<Count> {
    return this.personaRepository.trabajas(id).delete(where);
  }
}
