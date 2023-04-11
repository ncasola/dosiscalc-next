import nc from "next-connect";
import dbConnect from "@/helpers/dbConnect";
import KidModel from "@/models/Kid.model";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
.get(async (req, res) => {
    await dbConnect();
    // check if id is passed
    if (req.query.id) {
      const id_kid = req.query.id;
      const kid = KidModel.findOne({ _id: id_kid });
      res.json(kid);
    } else {
      const kids = await KidModel.find({});
      res.json(kids);
    }
})
.post(async (req, res) => {
    await dbConnect();
    const kid = await KidModel.create(req.body);
    res.json(kid);
})
.put(async (req, res) => {
    await dbConnect();
    const id_kid = req.query.id;
    const kid = await KidModel.updateOne({ _id: id_kid }, req.body);
    res.json(kid);
})
.delete(async (req, res) => {
    await dbConnect();
    const id_kid = req.query.id;
    const kid = await KidModel.deleteOne({ _id: id_kid });
    res.json(kid);
});


export default handler;