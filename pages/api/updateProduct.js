import { getDatabase } from "@/lib/mongodb";
import authenticateToken from "@/middlewares/authenticateToken";

export default async function handler(req, res) {
    authenticateToken(req, res, async () => {
        const db = await getDatabase(process.env.MONGODB_DBNAME);
        const collection = db.collection("products_authama");
        try {
            const result = await collection.updateOne(
                { id_writer: 'diki' },
                {
                    $set: {
                        id_writer: 'Diki',
                        id_trx: 'Wkwkw'
                    }
                }
            );
            res.status(200).json({ status: true, modifiedCount: result.modifiedCount });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
}