import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Empresa, EmpresaRelations, Persona, SolicitudEmpresaPersona} from '../models';
import {SolicitudEmpresaPersonaRepository} from './solicitud-empresa-persona.repository';
import {PersonaRepository} from './persona.repository';

export class EmpresaRepository extends DefaultCrudRepository<
  Empresa,
  typeof Empresa.prototype.id,
  EmpresaRelations
> {

  public readonly personas: HasManyThroughRepositoryFactory<Persona, typeof Persona.prototype.id,
          SolicitudEmpresaPersona,
          typeof Empresa.prototype.id
        >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('SolicitudEmpresaPersonaRepository') protected solicitudEmpresaPersonaRepositoryGetter: Getter<SolicitudEmpresaPersonaRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Empresa, dataSource);
    this.personas = this.createHasManyThroughRepositoryFactoryFor('personas', personaRepositoryGetter, solicitudEmpresaPersonaRepositoryGetter,);
    this.registerInclusionResolver('personas', this.personas.inclusionResolver);
  }
}
