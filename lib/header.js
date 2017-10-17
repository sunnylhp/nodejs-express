/**
 * Created by Administrator on 2017/4/11.
 */
module.exports = function (req, res, next) {
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.header = getHeader();
    next();
}
