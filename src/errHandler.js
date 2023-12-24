module.exports = (err, ctx) => {
    let status = 500;
    switch (err.code) {
        case '10001':
            status = 400;
            break;
        case '10002':
            status = 409;
            break;
    }
    console.error(err.message, ctx.request);
    Object.assign(ctx, { status, body: err });
}