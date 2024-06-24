const express = require('express');
const router = express.Router();
const { handleGenerateNewShortUrl , handleGetAnalytics ,handleUpdateandRedirect} = require('../controllers/url');



router.post("/", handleGenerateNewShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/:shortId", handleUpdateandRedirect);


module.exports = router;
