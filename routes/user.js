const { Router } = require("express");
const { usuariosGet, usuariosPut, usuariosPost, userDelete, userPatch } = require("../controllers/user");

const router = Router();

router.get("/", usuariosGet);
router.put("/:id", usuariosPut);
router.post("/", usuariosPost);
router.delete("/", userDelete);
router.patch("/", userPatch);

module.exports = router;
