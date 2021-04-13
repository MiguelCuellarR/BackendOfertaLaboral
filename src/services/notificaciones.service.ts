import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as Llaves} from '../config/keys';
const sgMail = require('@sendgrid/mail');
const twilio = require('twilio');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) { }

  EnviarCorreoElectronico(destino: string, asunto: string, contenido: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: destino, // Change to your recipient
      from: Llaves.OrigenCorreoElectronico, // Change to your verified sender
      subject: asunto,
      html: contenido,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  EnviarSMS(telefono: string, contenido: string) {
    let accountSid = process.env.TWILIO_SID;
    let authToken = process.env.TWILIO_TK;

    let client = new twilio(accountSid, authToken);

    client.messages.create({
      body: contenido,
      to: telefono,
      from: Llaves.twilioPhone
    })
      .then((message: any) => console.log(message.sid));
  }

}
