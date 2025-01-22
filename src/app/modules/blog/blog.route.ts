import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { blogValidation } from './blog.validation';
import { blogController } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import verifyOwnership from '../../middlewares/verifyOwnership';

const router = express.Router();
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(blogValidation.createBlogValidationSchema),
  blogController.createBlog,
);

router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(blogValidation.updateBlogValidationSchema),
  blogController.updateBlog,
);

router.delete('/:id', auth(USER_ROLE.user), verifyOwnership, blogController.deleteBlog);

export const blogRoutes = router;
