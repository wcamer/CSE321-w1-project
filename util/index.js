const util = {}
util.handleErrors= fn => (req, res, next) => Promise.resolve(fn(req,res,next)).catch(next)

