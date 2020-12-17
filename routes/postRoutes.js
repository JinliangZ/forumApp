const express = require("express");
const router = express.Router();
const protected = require('../middleware/protected');
const postController = require('../controllers/postController')

router.get('/show_posts', protected, postController.posts_show);
router.get('/manage_posts', protected, postController.posts_manage);
router.get('/posts-detail/:id', protected, postController.posts_detail);
router.post('/create_posts', protected, postController.posts_create);
router.delete('/delete_posts/:id',protected, postController.posts_delete);

module.exports = router;