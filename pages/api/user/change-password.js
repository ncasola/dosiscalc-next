import nc from "next-connect";
import dbConnect from "@/helpers/dbConnect";
import User from "@/models/User.model";
import * as jwt from "jsonwebtoken";

const handler = nc({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.json({error: err.message});
    },
    onNoMatch: (req, res) => {
      res.status(404).end("No se encontró la página");
    },
  })
  .post(async (req, res) => {
    await dbConnect();
    console.log(req.body);
    const { password } = req.body;
    const { token } = req.body;
    const secret = process.env.JWT_SECRET;
    const user = jwt.verify(token, secret);
    if(user) {
      const updateUser = await User.findOne({email: user.email});
      if(updateUser) {
        updateUser.password = password;
        updateUser.save();
        res.json({message: "Contraseña cambiada correctamente"});
      } else {
        res.json({error: "El usuario no existe"});
      }
    } else {
        res.json({error: "El token no es válido"});
    }
});

export default handler;