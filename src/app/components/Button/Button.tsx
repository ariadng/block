import React from "react";
import Icon from "../Icon/Icon";
import "./Button.scss";

interface Props {
	label?: string,
	leadingIcon?: string,
	trailingIcon?: string,
	color?: "default" | "primary" | "accent",
	shape?: "default" | "pill",
	disabled?: boolean,
	value?: any,
	className?: string,
	onClick?: (value?: any) => void,
}

export default function Button ({
	label,
	leadingIcon,
	trailingIcon,
	color,
	shape,
	disabled,
	value,
	className,
	onClick,
}: Props) {

	const getClassName = () : string => {
		let name: string = "Button";
		if (color) name += " Color_" + color;
		if (shape) name += " Shape_" + shape;
		if (!label && leadingIcon && !trailingIcon) name += " LeadingIconOnly";
		if (!label && !leadingIcon && trailingIcon) name += " TrailingIconOnly";
		if (className) name += " " + className;
		return name;
	};

	const handleOnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
		if (onClick) onClick(value);
	}

	return (
		<button className={getClassName()} onClick={handleOnClick}>
			{ leadingIcon && <Icon className="LeadingIcon" name={leadingIcon} /> }
			{ label && <span className="Label">{label}</span> }
			{ trailingIcon && <Icon className="TrailingIcon" name={trailingIcon} /> }
		</button>
	);
}