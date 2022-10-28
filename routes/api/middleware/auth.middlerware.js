const jwt = require('jsonwebtoken');
const { getUserInfo } = require('../service/user.service');
const {
    tokenExpiredError,
    jsonWebTokenError,
    hasNotAdminPermission,
} = require('../constant/er.type');

const auth = async (ctx, next) => {
    const { token } = ctx.request.header;
    // const token = authorization.replace('Bearea ', '');
    try {
        //user中包含了payload的信息(id, user_name_ is_admin等)
        const user = jwt.verify(token, 'jdsc');
        ctx.state.user = user;
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                return ctx.app.emit('error', tokenExpiredError, ctx);
            case 'JsonWebTokenError':
                return ctx.app.emit('error', jsonWebTokenError, ctx);
            default:
                return ctx.app.emit('error', jsonWebTokenError, ctx);
        }
    }
    await next();
}

const hadAdminpermission = async (ctx, next) => {
    const { is_admin } = ctx.state.user;
    if (!is_admin) {
        return ctx.app.emit('error', hasNotAdminPermission, ctx);
    }
    await next();
}
module.exports = {
    auth, hadAdminpermission
}