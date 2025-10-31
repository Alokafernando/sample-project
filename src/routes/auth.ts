import { Router } from "express"
import { register, login, getMyDetails, registerAdmin } from "../controller/authController"


const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me", getMyDetails)
router.post("/admin/register", registerAdmin)

export default router