import {Entity, model, property, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';
import {ProfesionPersona} from './profesion-persona.model';

@model()
export class Profesion extends Entity {
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

  @hasMany(() => Persona, {through: {model: () => ProfesionPersona}})
  personas: Persona[];

  constructor(data?: Partial<Profesion>) {
    super(data);
  }
}

export interface ProfesionRelations {
  // describe navigational properties here
}

export type ProfesionWithRelations = Profesion & ProfesionRelations;
