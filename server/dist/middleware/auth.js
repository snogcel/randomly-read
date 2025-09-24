"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.requireAuth = requireAuth;
exports.optionalAuth = optionalAuth;
async function authMiddleware(req, res, next) {
    req.user = null;
    next();
}
function requireAuth(req, res, next) {
    req.user = null;
    next();
}
async function optionalAuth(req, res, next) {
    req.user = null;
    next();
}
//# sourceMappingURL=auth.js.map