const VisitingRulesController = require("../controllers/visiting-rules.controller");
const router = require("express").Router();

router.get("/", VisitingRulesController.getText);
router.put("/", VisitingRulesController.updateText);

module.exports = router;
