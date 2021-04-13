import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Persona, PersonaRelations, Habilidad, HabilidadPersona, Ciudad, Documento, Estado, Empresa, SolicitudEmpresaPersona, Profesion, ProfesionPersona, Trabaja} from '../models';
import {HabilidadPersonaRepository} from './habilidad-persona.repository';
import {HabilidadRepository} from './habilidad.repository';
import {CiudadRepository} from './ciudad.repository';
import {DocumentoRepository} from './documento.repository';
import {EstadoRepository} from './estado.repository';
import {SolicitudEmpresaPersonaRepository} from './solicitud-empresa-persona.repository';
import {EmpresaRepository} from './empresa.repository';
import {ProfesionPersonaRepository} from './profesion-persona.repository';
import {ProfesionRepository} from './profesion.repository';
import {TrabajaRepository} from './trabaja.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly habilidades: HasManyThroughRepositoryFactory<Habilidad, typeof Habilidad.prototype.id,
          HabilidadPersona,
          typeof Persona.prototype.id
        >;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Persona.prototype.id>;

  public readonly documentos: HasManyRepositoryFactory<Documento, typeof Persona.prototype.id>;

  public readonly estado: BelongsToAccessor<Estado, typeof Persona.prototype.id>;

  public readonly empresas: HasManyThroughRepositoryFactory<Empresa, typeof Empresa.prototype.id,
          SolicitudEmpresaPersona,
          typeof Persona.prototype.id
        >;

  public readonly profesiones: HasManyThroughRepositoryFactory<Profesion, typeof Profesion.prototype.id,
          ProfesionPersona,
          typeof Persona.prototype.id
        >;

  public readonly trabajas: HasManyThroughRepositoryFactory<Trabaja, typeof Trabaja.prototype.id,
          ProfesionPersona,
          typeof Persona.prototype.id
        >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('HabilidadPersonaRepository') protected habilidadPersonaRepositoryGetter: Getter<HabilidadPersonaRepository>, @repository.getter('HabilidadRepository') protected habilidadRepositoryGetter: Getter<HabilidadRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('DocumentoRepository') protected documentoRepositoryGetter: Getter<DocumentoRepository>, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>, @repository.getter('SolicitudEmpresaPersonaRepository') protected solicitudEmpresaPersonaRepositoryGetter: Getter<SolicitudEmpresaPersonaRepository>, @repository.getter('EmpresaRepository') protected empresaRepositoryGetter: Getter<EmpresaRepository>, @repository.getter('ProfesionPersonaRepository') protected profesionPersonaRepositoryGetter: Getter<ProfesionPersonaRepository>, @repository.getter('ProfesionRepository') protected profesionRepositoryGetter: Getter<ProfesionRepository>, @repository.getter('TrabajaRepository') protected trabajaRepositoryGetter: Getter<TrabajaRepository>,
  ) {
    super(Persona, dataSource);
    this.trabajas = this.createHasManyThroughRepositoryFactoryFor('trabajas', trabajaRepositoryGetter, profesionPersonaRepositoryGetter,);
    this.registerInclusionResolver('trabajas', this.trabajas.inclusionResolver);
    this.profesiones = this.createHasManyThroughRepositoryFactoryFor('profesiones', profesionRepositoryGetter, profesionPersonaRepositoryGetter,);
    this.registerInclusionResolver('profesiones', this.profesiones.inclusionResolver);
    this.empresas = this.createHasManyThroughRepositoryFactoryFor('empresas', empresaRepositoryGetter, solicitudEmpresaPersonaRepositoryGetter,);
    this.registerInclusionResolver('empresas', this.empresas.inclusionResolver);
    this.estado = this.createBelongsToAccessorFor('estado', estadoRepositoryGetter,);
    this.registerInclusionResolver('estado', this.estado.inclusionResolver);
    this.documentos = this.createHasManyRepositoryFactoryFor('documentos', documentoRepositoryGetter,);
    this.registerInclusionResolver('documentos', this.documentos.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.habilidades = this.createHasManyThroughRepositoryFactoryFor('habilidades', habilidadRepositoryGetter, habilidadPersonaRepositoryGetter,);
    this.registerInclusionResolver('habilidades', this.habilidades.inclusionResolver);
  }
}
