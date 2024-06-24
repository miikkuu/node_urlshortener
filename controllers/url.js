const shortid = require('shortid');

const URL = require('../models/url');

async function handleGenerateNewShortUrl(req,res)
{

  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

    return res.render('home', {shortUrl: shortID  });

}
async function handleUpdateandRedirect(req,res)
{
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitedHistory: {
            $each: [{ timestamp: Date.now() }],
          },
        },
      },
    );
    if (!entry || !entry.originalUrl) {
        // Handle the error: the shortId was not found or the originalUrl is undefined
        res.status(404).send('Not found an ye entry for this id' );
      } else {
        res.redirect(entry.originalUrl);
      }

}

async function handleGetAnalytics(req,res)
{
    console.log("inside handleGetAnalytics")
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId
    });

    if(!result)
    {
        return res.status(404).json({message: "Short URL not found"});
    }
    return res.json(
        {
            totalClicks: result.visitedHistory.length,
            analytics: result.visitedHistory
        }
    )
}


module.exports = {handleGenerateNewShortUrl , handleUpdateandRedirect, handleGetAnalytics};