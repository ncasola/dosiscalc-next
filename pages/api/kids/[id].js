import nc from "next-connect";
import dbConnect from "@/helpers/dbConnect";
import KidModel from "@/models/Kid.model";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(async (req, res, next) => {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        // add user to req
        req.user = session.user;
        next();
    } else {
      res.status(401).end("Unauthorized");
    }
  })
  .get(async (req, res) => {
    await dbConnect();
    const id_kid = req.query.id;
    const user = req.user;
    const kid = await KidModel.findOne({ _id: id_kid, user: user.id });
    res.json(kid);
  })
  .put(async (req, res) => {
    await dbConnect();
    const id_kid = req.query.id;
    const user = req.user;
    const kid = await KidModel.updateOne({ _id: id_kid, user: user.id }, req.body);
    res.json(kid);
  })
  .delete(async (req, res) => {
    await dbConnect();
    const id_kid = req.query.id;
    const kid = await KidModel.deleteOne({ _id: id_kid, user: user.id });
    res.json(kid);
  });

export default handler;
