import { getDatabase } from "@/lib/mongodb";
import authenticateToken from "@/middlewares/authenticateToken";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    authenticateToken(req, res, async () => {
        const product = req.body.product;
        const db = await getDatabase(process.env.MONGODB_DBNAME);
        const collection = db.collection("products_authama");
        try {
            const objectId = new ObjectId(product._id);
            const result = await collection.updateOne(
                { _id: objectId },
                {
                    $set: {
                        products_name: product.products_name,
                        description: product.description,
                        sku: product.sku,
                        batch_code: product.batch_code
                    }
                }
            );
            res.status(200).json({ status: true });
        } catch (error) {
            res.status(200).json({ status: false, error: error.message });
        }
    });
}