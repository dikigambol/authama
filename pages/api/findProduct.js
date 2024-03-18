import { getDatabase } from "@/lib/mongodb";

export default async function handler(req, res) {
    const { trx } = req.query;
    const db = await getDatabase(process.env.MONGODB_DBNAME);
    const collection = db.collection("products_authama");
    try {
        const match = await collection.findOne({ id_trx: trx });
        if (match) {
            res.status(200).json(match);
        } else {
            res.status(200).json({ status: false });
        }
    } catch (error) {
        res.json({ message: "Internal server error", error: error });
    }
}