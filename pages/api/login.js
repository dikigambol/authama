import { getDatabase } from "@/lib/mongodb";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

export default async function handler(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const db = await getDatabase(process.env.MONGODB_DBNAME);
    const collection = db.collection("users_authama");
    try {
        const data = await collection.findOne({ email: email });
        if (data) {
            const match = await bcrypt.compare(password, data.password);
            if (match) {
                const token = jwt.sign({ id: data._id, email: data.email, username: data.username }, process.env.SECRET_KEY);
                return res.json({ token: token });
            }else{
                return res.json({ message: "invalid password" });
            }
        } else {
            return res.json({ message: "invalid email" });
        }
    } catch (error) {
        return res.json({ message: "Internal server error", error: error });
    }
}