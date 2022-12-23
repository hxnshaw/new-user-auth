const express = require("express");
const router = express.Router();
const {
  getSingleUser,
  showMyProfile,
  getAllUsers,
  editUserProfile,
  updateUserPassword,
  updateApprovalStatus,
  deleteUserProfile,
} = require("../controllers/userController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middlewares/authentication");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

router.route("/profile").get(authenticateUser, showMyProfile);

router
  .route("/profile/updatePassword")
  .patch(authenticateUser, updateUserPassword);

router
  .route("/:id/approvalStatus")
  .patch(authenticateUser, authorizePermissions("admin"), updateApprovalStatus);

router
  .route("/profile/deleteMyAccount")
  .delete(
    authenticateUser,
    authorizePermissions("admin", "user"),
    deleteUserProfile
  );

router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("admin"), getSingleUser)
  .patch(authenticateUser, editUserProfile);

module.exports = router;
