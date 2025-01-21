import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(authValidation.userRegistrationValidationSchema),
);
