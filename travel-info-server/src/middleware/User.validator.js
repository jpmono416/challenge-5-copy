import * as expressValidator from "express-validator";

export default class UserValidator {
    static validate = () => {
        try {
            return [
                expressValidator.body("_id").optional().isMongoId(),
                expressValidator.body("username").isString().notEmpty(),
                expressValidator.body("password").isString().notEmpty(),
                expressValidator.body("favouriteLocations").optional().isArray(),
                UserValidator.handleValidationErrors,
            ];
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    static handleValidationErrors = (req, res, next) => {
        const errors = expressValidator.validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        next();
    };
}
