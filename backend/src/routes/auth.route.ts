import {Router} from "express";
import {loginUser} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post('/login', async (req, res) => {
    const {password, email} = req.body;

    const result = await loginUser(email, password);
    res.send(result);
});

export default authRouter;