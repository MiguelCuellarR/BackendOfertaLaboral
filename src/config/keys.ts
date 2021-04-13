export namespace Keys {
  export const OrigenCorreoElectronico = 'miguel.1701823659@ucaldas.edu.co';
  export const asuntoNuevoUsuario = '[Nuevo Usuario Oferta Laboral] Mensaje de Bienvenida';
  export const tiempoVencimientoJWT = Math.floor(Date.now() / 1000) + (60 * 60);
  export const claveSecretaJWT = 'jwt@Prog3*';
  export const twilioPhone = '+15704059449';
  export const carpetaImagenPersonas = '../../files/people';
  export const nombreCampoImagenPersona = 'file';
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenPersona = 1024 * 1024;
  export const carpetaDocumentoPersona = '../../files/documents';
  export const nombreCampoDocumentoPersona = 'file';
  export const extensionesPermitidasDOC: string[] = ['.DOC', '.PDF', '.DOCX', '.XLS', '.XLSX'];
}
