import ButtonView from "../components/ButtonView/ButtonView";
import HeadingView from "../components/HeadingView/HeadingView";
import LayoutView from "../components/LayoutView/LayoutView";
import PageView from "../components/PageView/PageView";
import ParagraphView from "../components/ParagraphView/ParagraphView";
import SectionView from "../components/SectionView/SectionView";
import TextView from "../components/TextView/TextView";
import View from "../components/View/View";

const ComponentMap: {[key: string]: any} = {
	// Layout
	'View': View,
	'LayoutView': LayoutView,
	'SectionView': SectionView,
	// Page
	'PageView': PageView,
	// Text
	'HeadingView': HeadingView,
	'TextView': TextView,
	'ParagraphView': ParagraphView,
	// Button
	'ButtonView': ButtonView,
};
export default ComponentMap;