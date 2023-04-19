import nc from "next-connect";
import dbConnect from "@/helpers/dbConnect";
import User from "@/models/User.model";
import mailConnect from "@/helpers/mailConnect";
import * as jwt from "jsonwebtoken";
import { verify } from "hcaptcha";

const handler = nc({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.json({error: err.message});
    },
    onNoMatch: (req, res) => {
      res.status(404).end("No se encontró la página");
    },
  })
  .use(async (req, res, next) => {
    const { hcaptcha } = req.body;
    const secret = process.env.HCAPTCHA_SECRET_KEY;
    const response = await verify(secret, hcaptcha);
    if(response.success) {
      next();
    } else {
      res.json({error: "Captcha no válido"});
    }
  })
  .post(async (req, res) => {
    await dbConnect();
    const { email } = req.body;
    const user = await User.findOne({email: email});
    if(user) {
        const user_token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        const url = `${process.env.NEXTAUTH_URL}/forgot-password/${user_token}`;
        mailConnect.sendMail({
            from: process.env.MAILGUN_FROM,
            to: email,
            subject: 'Recuperar contraseña - DosisCalc',
            html: '<b>Aqui tienes el enlace para recuperar la contraseña: </b><br><br> <a href="' + url + '">Recuperar contraseña</a>',
            text: 'Aqui tienes el enlace para recuperar la contraseña: ' + url
        }, (err, info) => {
            if (err) {
                console.log(`Error: ${err}`);
            }
            else {
                console.log(`Response: ${info}`);
            }
        });
    }
    res.json({message: "Si el correo existe se enviará un correo para restablecer la contraseña"});
});

export default handler;