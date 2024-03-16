import { getDatabase } from "@/lib/mongodb";
import authenticateToken from "@/middlewares/authenticateToken";

export default async function handler(req, res) {
    authenticateToken(req, res, async () => {
        const db = await getDatabase(process.env.MONGODB_DBNAME);
        const collection = db.collection("products_authama");
        try {
            const result = await collection.deleteOne({ id_writer: 'diki' });
            res.status(200).json({ status: true, deletedCount: result.deletedCount });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
}
