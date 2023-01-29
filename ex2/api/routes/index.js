import { authRoute } from './auth.js';

const route = app => {
    app.use('/auth', authRoute);
}

export default route;
