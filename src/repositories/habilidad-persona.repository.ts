import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {HabilidadPersona, HabilidadPersonaRelations} from '../models';

export class HabilidadPersonaRepository extends DefaultCrudRepository<
  HabilidadPersona,
  typeof HabilidadPersona.prototype.id,
  HabilidadPersonaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(HabilidadPersona, dataSource);
  }
}
