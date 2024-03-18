import { getDatabase } from "@/lib/mongodb";
import authenticateToken from "@/middlewares/authenticateToken";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    authenticateToken(req, res, async () => {
        const { id } = req.query;
        const db = await getDatabase(process.env.MONGODB_DBNAME);
        const collection = db.collection("products_authama");
        try {
            const objectId = new ObjectId(id);
            const result = await collection.deleteOne({ _id: objectId });

            if (result.deletedCount === 1) {
                res.status(200).json({ status: true });
            } else {
                res.status(200).json({ status: false, message: "Dokumen tidak ditemukan." });
            }
        } catch (error) {
            res.status(200).json({ status: false, error: error.message });
        }
    });
}

