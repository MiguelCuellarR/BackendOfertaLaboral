import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Documento,
  Persona,
} from '../models';
import {DocumentoRepository} from '../repositories';

export class DocumentoPersonaController {
  constructor(
    @repository(DocumentoRepository)
    public documentoRepository: DocumentoRepository,
  ) { }

  @get('/documentos/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Documento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.number('id') id: typeof Documento.prototype.id,
  ): Promise<Persona> {
    return this.documentoRepository.persona(id);
  }
}
