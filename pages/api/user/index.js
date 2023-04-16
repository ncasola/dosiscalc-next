import nc from "next-connect";
import dbConnect from "@/helpers/dbConnect";
import User from "@/models/User.model";
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
      const newUser = req.body;
      // check is email already exists
      const findUser = await User.findOne({email: newUser.email});
      if(findUser) {
        res.json({error: "El usuario ya existe"});
        return false;
      }
      const user = await User.create(newUser);
      if(user) {
        res.json(user);
      } else {
        res.json({error: "El usuario no se pudo crear"});
      }
    });
  
  export default handler;