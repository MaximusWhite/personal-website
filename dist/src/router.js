const { Router } = require('express');

const router = Router();

router.get('/tmp', (req, res) => {
    res.json({
        msg: "Ah, that's a good message"
    });
});

module.exports = router;