import ButtonView from "../components/ButtonView/ButtonView";
import HeadingView from "../components/HeadingView/HeadingView";
import HorizontalView from "../components/HorizontalView/HorizontalView";
import ImageView from "../components/ImageView/ImageView";
import LayoutView from "../components/LayoutView/LayoutView";
import ListView from "../components/ListView/ListView";
import PageView from "../components/PageView/PageView";
import ParagraphView from "../components/ParagraphView/ParagraphView";
import SectionView from "../components/SectionView/SectionView";
import TextView from "../components/TextView/TextView";
import VerticalView from "../components/VerticalView/VerticalView";
import View from "../components/View/View";

const ComponentMap: {[key: string]: any} = {
	// Layout
	'View': View,
	'LayoutView': LayoutView,
	'VerticalView': VerticalView,
	'HorizontalView': HorizontalView,
	'SectionView': SectionView,
	// Page
	'PageView': PageView,
	// Text
	'HeadingView': HeadingView,
	'TextView': TextView,
	'ParagraphView': ParagraphView,
	'ListView': ListView,
	// Media
	'ImageView': ImageView,
	// Button
	'ButtonView': ButtonView,
};
export default ComponentMap;