"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate(object, rules) {
    const errors = {};
    for (let field of Object.keys(rules)) {
        for (let rule of rules[field].split("|")) {
            // Required
            if (rule === "required" && typeof object[field] === "undefined") {
                errors[field] = typeof errors[field] === "undefined" ? "required" : errors[field] + "|required";
            }
        }
    }
    let errorCount = 0;
    for (let field of Object.keys(errors)) {
        if (errors[field] !== "")
            errorCount++;
    }
    return {
        errors: errors,
        errorCount: errorCount,
        valid: errorCount === 0,
        invalid: errorCount > 0,
    };
}
exports.default = validate;
