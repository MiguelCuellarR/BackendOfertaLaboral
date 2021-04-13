import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Profesion, ProfesionRelations, Persona, ProfesionPersona} from '../models';
import {ProfesionPersonaRepository} from './profesion-persona.repository';
import {PersonaRepository} from './persona.repository';

export class ProfesionRepository extends DefaultCrudRepository<
  Profesion,
  typeof Profesion.prototype.id,
  ProfesionRelations
> {

  public readonly personas: HasManyThroughRepositoryFactory<Persona, typeof Persona.prototype.id,
          ProfesionPersona,
          typeof Profesion.prototype.id
        >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ProfesionPersonaRepository') protected profesionPersonaRepositoryGetter: Getter<ProfesionPersonaRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Profesion, dataSource);
    this.personas = this.createHasManyThroughRepositoryFactoryFor('personas', personaRepositoryGetter, profesionPersonaRepositoryGetter,);
    this.registerInclusionResolver('personas', this.personas.inclusionResolver);
  }
}
