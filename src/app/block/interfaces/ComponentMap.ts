import ButtonView from "../components/ButtonView/ButtonView";
import HeadingView from "../components/HeadingView/HeadingView";
import LayoutView from "../components/LayoutView/LayoutView";
import PageView from "../components/PageView/PageView";
import TextView from "../components/TextView/TextView";
import View from "../components/View/View";

const ComponentMap: {[key: string]: any} = {
	// Layout
	'View': View,
	'LayoutView': LayoutView,
	// Page
	'PageView': PageView,
	// Text
	'HeadingView': HeadingView,
	'TextView': TextView,
	// Button
	'ButtonView': ButtonView,
};
export default ComponentMap;