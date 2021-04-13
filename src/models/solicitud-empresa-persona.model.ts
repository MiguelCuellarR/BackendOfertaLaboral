import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_persona_id: {
        name: 'fk_persona_emp_id',
        entity: 'Persona',
        entityKey: 'id',
        foreignKey: 'personaId',
      },
      fk_empresa_id: {
        name: 'fk_empresa_id',
        entity: 'Empresa',
        entityKey: 'id',
        foreignKey: 'empresaId',
      }
    },
  },
})
export class SolicitudEmpresaPersona extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  asunto: string;

  @property({
    type: 'string',
    required: true,
  })
  contenido: string;

  @property({
    type: 'number',
  })
  empresaId?: number;

  @property({
    type: 'number',
  })
  personaId?: number;

  constructor(data?: Partial<SolicitudEmpresaPersona>) {
    super(data);
  }
}

export interface SolicitudEmpresaPersonaRelations {
  // describe navigational properties here
}

export type SolicitudEmpresaPersonaWithRelations = SolicitudEmpresaPersona & SolicitudEmpresaPersonaRelations;
