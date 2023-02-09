import Showdown from "showdown";

const converter = new Showdown.Converter();

export default class TypoUtils {

	public static markdownToHTML (input: string): string {
		const htmlString = converter.makeHtml(input);
		return htmlString;
	}

}