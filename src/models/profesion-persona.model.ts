import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_persona_id: {
        name: 'fk_persona_ppt_id',
        entity: 'Persona',
        entityKey: 'id',
        foreignKey: 'personaId',
      },
      fk_profesion_id: {
        name: 'fk_profesion_id',
        entity: 'Profesion',
        entityKey: 'id',
        foreignKey: 'profesionId',
      },
      fk_trabaja_id: {
        name: 'fk_trabaja_id',
        entity: 'Trabaja',
        entityKey: 'id',
        foreignKey: 'trabajaId',
      }
    },
  },
})
export class ProfesionPersona extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  personaId?: number;

  @property({
    type: 'number',
  })
  profesionId?: number;

  @property({
    type: 'number',
  })
  trabajaId?: number;

  constructor(data?: Partial<ProfesionPersona>) {
    super(data);
  }
}

export interface ProfesionPersonaRelations {
  // describe navigational properties here
}

export type ProfesionPersonaWithRelations = ProfesionPersona & ProfesionPersonaRelations;
