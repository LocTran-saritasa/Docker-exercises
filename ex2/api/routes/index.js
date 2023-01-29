import { authRoute } from './auth.js';
import { userRoute } from './user.js';

const route = app => {
    app.use('/auth', authRoute);
    app.use('/user', userRoute);
}

export default route;
