import { getDatabase } from "@/lib/mongodb";
import authenticateToken from "@/middlewares/authenticateToken";

export default async function handler(req, res) {
    authenticateToken(req, res, async () => {
        const product = req.body.product;

        const db = await getDatabase(process.env.MONGODB_DBNAME);
        const collection = db.collection("products_authama");
        try {
            await collection.insertOne(product);
            res.status(200).json({ status: true });
        } catch (error) {
            res.status(200).json({ status: false });
        }
    });
};