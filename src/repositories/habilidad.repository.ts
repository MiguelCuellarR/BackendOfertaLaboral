import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Habilidad, HabilidadRelations, Persona, HabilidadPersona} from '../models';
import {HabilidadPersonaRepository} from './habilidad-persona.repository';
import {PersonaRepository} from './persona.repository';

export class HabilidadRepository extends DefaultCrudRepository<
  Habilidad,
  typeof Habilidad.prototype.id,
  HabilidadRelations
> {

  public readonly personas: HasManyThroughRepositoryFactory<Persona, typeof Persona.prototype.id,
          HabilidadPersona,
          typeof Habilidad.prototype.id
        >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('HabilidadPersonaRepository') protected habilidadPersonaRepositoryGetter: Getter<HabilidadPersonaRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Habilidad, dataSource);
    this.personas = this.createHasManyThroughRepositoryFactoryFor('personas', personaRepositoryGetter, habilidadPersonaRepositoryGetter,);
    this.registerInclusionResolver('personas', this.personas.inclusionResolver);
  }
}
