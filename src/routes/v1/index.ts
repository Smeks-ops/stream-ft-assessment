import express from 'express';
import authRoute from './auth.route';
import userRoute from './user.route';
import productRoute from './product.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/products',
    route: productRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
