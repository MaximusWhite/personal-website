const { Router } = require('express');
const router = Router();
const { 
    getTesting,
    getUserInfo,
    fetchCaption,
    addNewRequest,
    recordResponse,
    getVerificationInfo
} = require('./sqlUtil');

const crypto = require('crypto');

router.get('/test', async (req, res) => {
    result = await getTesting();
    res.json({
        result
    });
});

router.post('/draw_caption', async (req, res) => {
    username = req.body.username;
    first_name = req.body.first_name;
    result = await fetchCaption(username);
    verification = await getVerificationInfo(username, first_name);
    at = crypto.createHash('md5').update(first_name + verification[0].role + username + verification[0].salt).digest('hex');
    if (at == req.body.token) {
        res.json({
            status: "OK",
            caption_id: result[0].caption_id,
            caption: result[0].caption,
            image_id: result[0].image_id,
            link: result[0].link
        }); 
    } else {
        res.json({
            status: "TOKEN MISMATCH"
        });
    }

});

router.post('/register_response', async (req, res) => {
    try {
        result = await recordResponse(req.body.username, req.body.caption_id, req.body.image_id, req.body.caption_score);
        res.json({
            status: 'OK'
        });
    } catch(err) {
        res.json({
            status: 'ERR',
            detail: err.detail
        });
   }
});

router.post('/access_req', async (req, res) => {
   try {
        result = await addNewRequest(req.body.first_name, req.body.last_name, req.body.email, req.body.username);
        res.json({
            status: 'OK'
        });
   } catch(err) {
        res.json({
            status: 'ERR',
            detail: err.detail
        });
   }
});

router.post('/login', async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    result = await getUserInfo(username, password);
    status = 'rejected';
    role = null;
    token = null;
    salt = null;
    first_name = null;
    if (result.length > 0) {
        status = 'granted';
        role = result[0].role;
        first_name = result[0].first_name;
        salt = result[0].salt;
        token = crypto.createHash('md5').update(first_name + role + username + salt).digest('hex');
    }
    res.json({
        status,
        first_name,
        role,
        token
    });
 });

module.exports = router;