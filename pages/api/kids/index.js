import nc from "next-connect";
import dbConnect from "@/helpers/dbConnect";
import KidModel from "@/models/Kid.model";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.json({ error: err.message });
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(async (req, res, next) => {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      req.user = session.user;
      next();
    } else {
      res.status(401).end("Unauthorized");
    }
  })
  .get(async (req, res) => {
    await dbConnect();
    const user = req.user;
    const kids = await KidModel.find({ user: user.email });
    res.json(kids);
  })
  .post(async (req, res) => {
    await dbConnect();
    const newKid = req.body;
    newKid.user = req.user.email;
    const kid = await KidModel.create(newKid);
    res.json(kid);
  });

export default handler;