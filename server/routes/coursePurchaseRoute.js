import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCheckoutSession, stripeWebhook } from "../controllers/coursePurchaseController.js";

const coursePurchaseRouter = express.Router();

coursePurchaseRouter.post("/checkout/create-checkout-session", isAuthenticated, createCheckoutSession);
coursePurchaseRouter.post("/webhook", express.raw({type: "application/json"}), stripeWebhook);
// coursePurchaseRouter.get("/course/:courseId/detail-with-status");
// coursePurchaseRouter.get("/", );

export default coursePurchaseRouter;