import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Trabaja, TrabajaRelations, Persona, ProfesionPersona} from '../models';
import {ProfesionPersonaRepository} from './profesion-persona.repository';
import {PersonaRepository} from './persona.repository';

export class TrabajaRepository extends DefaultCrudRepository<
  Trabaja,
  typeof Trabaja.prototype.id,
  TrabajaRelations
> {

  public readonly personas: HasManyThroughRepositoryFactory<Persona, typeof Persona.prototype.id,
          ProfesionPersona,
          typeof Trabaja.prototype.id
        >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('ProfesionPersonaRepository') protected profesionPersonaRepositoryGetter: Getter<ProfesionPersonaRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Trabaja, dataSource);
    this.personas = this.createHasManyThroughRepositoryFactoryFor('personas', personaRepositoryGetter, profesionPersonaRepositoryGetter,);
    this.registerInclusionResolver('personas', this.personas.inclusionResolver);
  }
}
