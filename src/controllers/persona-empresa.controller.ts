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
SolicitudEmpresaPersona,
Empresa,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaEmpresaController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/empresas', {
    responses: {
      '200': {
        description: 'Array of Persona has many Empresa through SolicitudEmpresaPersona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empresa)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Empresa>,
  ): Promise<Empresa[]> {
    return this.personaRepository.empresas(id).find(filter);
  }

  @post('/personas/{id}/empresas', {
    responses: {
      '200': {
        description: 'create a Empresa model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empresa)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, {
            title: 'NewEmpresaInPersona',
            exclude: ['id'],
          }),
        },
      },
    }) empresa: Omit<Empresa, 'id'>,
  ): Promise<Empresa> {
    return this.personaRepository.empresas(id).create(empresa);
  }

  @patch('/personas/{id}/empresas', {
    responses: {
      '200': {
        description: 'Persona.Empresa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empresa, {partial: true}),
        },
      },
    })
    empresa: Partial<Empresa>,
    @param.query.object('where', getWhereSchemaFor(Empresa)) where?: Where<Empresa>,
  ): Promise<Count> {
    return this.personaRepository.empresas(id).patch(empresa, where);
  }

  @del('/personas/{id}/empresas', {
    responses: {
      '200': {
        description: 'Persona.Empresa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Empresa)) where?: Where<Empresa>,
  ): Promise<Count> {
    return this.personaRepository.empresas(id).delete(where);
  }
}
