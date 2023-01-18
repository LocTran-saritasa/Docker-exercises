import express from 'express';

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.send('Login route');
})


export const authRoute = router;
