import { Router } from "express"
import { register, login, getMyDetails, registerAdmin } from "../controller/authController"
import { authenticate } from "../middleware/auth"
import { isAdmin } from "../middleware/isAdmin"


const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me", authenticate, getMyDetails)
router.post("/admin/register", authenticate, isAdmin, registerAdmin);

export default router