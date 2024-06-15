import * as expressValidator from "express-validator";

export default class UserValidator {
    static validate = () => {
        try {
            return [
                expressValidator.body("_id").optional().isMongoId(),
                expressValidator
                    .body("email")
                    .isString()
                    .notEmpty()
                    .matches(
                        /^(?:(?:[a-zA-Z0-9_'^&/+-]|(?:\.(?!\.))){1,64}(?:(?:(?:\.(?!\.))[a-zA-Z0-9_'^&/+-]){1,64})*)@(?:(?:[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,})|(?:"(?:[^\\"\r\n]|(?:\\[\s\S]))*"))$/
                    ),
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
