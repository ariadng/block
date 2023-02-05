export default function validate (object: {[key: string]: string}, rules: {[key: string]: string}) {

	const errors: {[key: string]: string} = {};

	for (let field of Object.keys(rules)) {
		for (let rule of rules[field].split("|")) {

			// Required
			if (rule === "required" && typeof object[field] === "undefined") {
				errors[field] = typeof errors[field] === "undefined" ? "required" : errors[field] + "|required";
			} 

		}
	}

	let errorCount: number = 0;

	for (let field of Object.keys(errors)) {
		if (errors[field] !== "") errorCount++;
	}

	return {
		errors: errors,
		errorCount: errorCount,
		valid: errorCount === 0,
		invalid: errorCount > 0,
	};

}