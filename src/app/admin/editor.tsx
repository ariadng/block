import React, { useState } from "react";
import { Typo } from "../typo";
import TypoEditor from "../TypoEditor/TypoEditor";
import "./editor.scss";

export default function Editor () {

	const [ content, setContent ] = useState<string>("## Test");

	return (
		<div className="EditorPage">
			<TypoEditor value={content} onUpdate={(value) => setContent(value)} options={{ input: "html" }} />
		</div>
	)
}