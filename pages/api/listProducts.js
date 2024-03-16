import { getDatabase } from "@/lib/mongodb";
import authenticateToken from "@/middlewares/authenticateToken";

export default async function handler(req, res) {
    authenticateToken(req, res, async () => {
        const db = await getDatabase(process.env.MONGODB_DBNAME);
        const collection = db.collection("products_authama");
        
        try {
            const products = await collection.find().toArray();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}