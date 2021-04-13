import {Entity, model, property, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';
import {HabilidadPersona} from './habilidad-persona.model';

@model()
export class Habilidad extends Entity {
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
  nombre: string;

  @hasMany(() => Persona, {through: {model: () => HabilidadPersona}})
  personas: Persona[];

  constructor(data?: Partial<Habilidad>) {
    super(data);
  }
}

export interface HabilidadRelations {
  // describe navigational properties here
}

export type HabilidadWithRelations = Habilidad & HabilidadRelations;
