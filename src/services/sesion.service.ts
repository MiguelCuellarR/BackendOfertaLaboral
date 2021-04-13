import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as Llaves} from '../config/keys';
import {Usuario} from '../models';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class SesionService {
  constructor(/* Add @inject to inject parameters */) { }

  GenerarToken(usuario: Usuario): string {
    let tk = jwt.sign({
      exp: Llaves.tiempoVencimientoJWT,
      data: {
        username: usuario.nombre_usuario,
        role: usuario.tipoUsuarioId
      }
    }, Llaves.claveSecretaJWT);
    return tk;
  }

  VerificarTokenJWT(token: string) {
    try {
      const decoded = jwt.verify(token, Llaves.claveSecretaJWT);
      return decoded;
    } catch {
      return null;
    }
  }
}
