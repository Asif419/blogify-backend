import express from 'express';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// router.post(
//   '/create-user',
//   validateRequest(userValidation.createUserValidationSchema),
// );
