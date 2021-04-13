import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Documento} from './documento.model';
import {Empresa} from './empresa.model';
import {Estado} from './estado.model';
import {HabilidadPersona} from './habilidad-persona.model';
import {Habilidad} from './habilidad.model';
import {ProfesionPersona} from './profesion-persona.model';
import {Profesion} from './profesion.model';
import {SolicitudEmpresaPersona} from './solicitud-empresa-persona.model';
import {Trabaja} from './trabaja.model';

@model({
  settings: {
    foreignKeys: {
      fk_ciudad_id: {
        name: 'fk_ciudad_id',
        entity: 'Ciudad',
        entityKey: 'id',
        foreignKey: 'ciudadId',
      },
      fk_estado_id: {
        name: 'fk_estado_id',
        entity: 'Estado',
        entityKey: 'id',
        foreignKey: 'estadoId',
      },
    },
  },
})
export class Persona extends Entity {
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
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  primer_nombre: string;

  @property({
    type: 'string',
  })
  segundo_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  primer_apellido: string;

  @property({
    type: 'string',
  })
  segundo_apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo_electronico: string;

  @property({
    type: 'string',
    required: true,
  })
  numero_celular: string;

  @property({
    type: 'string',
  })
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  perfil_profesional: string;

  @hasMany(() => Habilidad, {through: {model: () => HabilidadPersona}})
  habilidades: Habilidad[];

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @hasMany(() => Documento)
  documentos: Documento[];

  @belongsTo(() => Estado)
  estadoId: number;

  @hasMany(() => Empresa, {through: {model: () => SolicitudEmpresaPersona}})
  empresas: Empresa[];

  @hasMany(() => Profesion, {through: {model: () => ProfesionPersona}})
  profesiones: Profesion[];

  @hasMany(() => Trabaja, {through: {model: () => ProfesionPersona}})
  trabajas: Trabaja[];

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
