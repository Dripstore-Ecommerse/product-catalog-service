import express from "express";
import productRoute from "./products.route";
const router = express.Router();
const defaultIRoute = [
    {
        path: "/products",
        route: productRoute,
    },
];
defaultIRoute.forEach((route) => {
    router.use(route.path, route.route);
});
export default router;
//# sourceMappingURL=index.js.map