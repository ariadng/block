import React from "react";
import "./Icon.scss";

interface Props {
	name: string,
	className?: string,
}

export default function Icon ({
	name,
	className,
}: Props) {

	return (
		<span className={`Icon ${className ? className : ''}`}>{name}</span>
	);

}