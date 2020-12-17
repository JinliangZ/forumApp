const express = require('express');
const { comments_show,comments_add } = require('../controllers/commentController');
const router = express.Router();
const protected = require('../middleware/protected');


router.get('/show-comments/:id',protected, comments_show);
router.post('/add-comment',protected, comments_add);


module.exports = router;