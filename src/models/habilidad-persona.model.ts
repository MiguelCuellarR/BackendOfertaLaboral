import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_persona_id: {
        name: 'fk_persona_hab_id',
        entity: 'Persona',
        entityKey: 'id',
        foreignKey: 'personaId',
      },
      fk_habilidad_id: {
        name: 'fk_habilidad_id',
        entity: 'Habilidad',
        entityKey: 'id',
        foreignKey: 'habilidadId',
      }
    },
  },
})
export class HabilidadPersona extends Entity {
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
  habilidadId?: number;

  constructor(data?: Partial<HabilidadPersona>) {
    super(data);
  }
}

export interface HabilidadPersonaRelations {
  // describe navigational properties here
}

export type HabilidadPersonaWithRelations = HabilidadPersona & HabilidadPersonaRelations;
