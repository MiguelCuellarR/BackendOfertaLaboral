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
Trabaja,
ProfesionPersona,
Persona,
} from '../models';
import {TrabajaRepository} from '../repositories';

export class TrabajaPersonaController {
  constructor(
    @repository(TrabajaRepository) protected trabajaRepository: TrabajaRepository,
  ) { }

  @get('/trabajas/{id}/personas', {
    responses: {
      '200': {
        description: 'Array of Trabaja has many Persona through ProfesionPersona',
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
    return this.trabajaRepository.personas(id).find(filter);
  }

  @post('/trabajas/{id}/personas', {
    responses: {
      '200': {
        description: 'create a Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Trabaja.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInTrabaja',
            exclude: ['id'],
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.trabajaRepository.personas(id).create(persona);
  }

  @patch('/trabajas/{id}/personas', {
    responses: {
      '200': {
        description: 'Trabaja.Persona PATCH success count',
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
    return this.trabajaRepository.personas(id).patch(persona, where);
  }

  @del('/trabajas/{id}/personas', {
    responses: {
      '200': {
        description: 'Trabaja.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.trabajaRepository.personas(id).delete(where);
  }
}
