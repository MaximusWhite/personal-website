const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());
const port = 3001;
const router = express.Router();

router.get('/tmp', (req, res) => {
    res.json({
        msg: "Ah, that's a good message"
    });
});

app.use("/api", router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));