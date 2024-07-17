import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import multerUploads from '../utils/multerUpload.js';

const router = express.Router();

router.get("/:id", protectRoute, getMessages);


router.post("/send/:id", protectRoute, multerUploads.single("image"), sendMessage);

export default router;



// import express from "express";
// import { getMessages, sendMessage } from "../controllers/message.controller.js";
// import protectRoute from "../middleware/protectRoute.js";


// const router = express.Router();

// router.get("/:id", protectRoute, getMessages);
// router.post("/send/:id", protectRoute, sendMessage);

// export default router;