import BlockContext from "../../BlockContext";
import React, { useContext } from "react";
import "./StepsView.scss";
import View from "../View/View";
import BlockText from "../../interfaces/BlockText";
import StepsViewProps from "./StepsViewProps";

export default function StepsView (props: StepsViewProps) {

	const { language } = useContext(BlockContext);

	// *** Props Management *** //
	const { className, steps, ...otherProps } = props;

	// *** CSS Classes *** //
	const getClassName = () => {
		let result: string[] = ["StepsView"];
		return result.join(' ');
	};
	
	// *** Values *** //
	const getTag = () => {
		return "div";
	};

	const getText = (text: BlockText) => {
		return text[language] ? text[language] : "";
	};
	
	// *** JSX Element *** //
	return (
		<View
			tag={getTag()}
			className={getClassName()}
			{...otherProps}
		>
			{steps && steps.map((step, index) => (
				<React.Fragment key={index}>
					<div className={`Step`} key={index}>
						<div className={`StepIcon ${!step.image || step.image === "" ? "NoImage" : ""}`}>
							{step.image && step.image !== "" && <img src={step.image} />}
							<div className="Index">{index + 1}</div>
						</div>
						{step.text && <div className="Text">{getText(step.text)}</div>}
					</div>
					{(index < steps.length - 1) && <div key={'step-line-' + index} className="Line"></div>}
				</React.Fragment>
			))}
		</View>
	);

}