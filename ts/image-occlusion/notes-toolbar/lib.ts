import {
    mdiCodeTags,
    mdiFormatAlignCenter,
    mdiFormatAlignJustify,
    mdiFormatAlignLeft,
    mdiFormatAlignRight,
    mdiFormatBold,
    mdiFormatHeader1,
    mdiFormatHeader2,
    mdiFormatHeader3,
    mdiFormatHeader4,
    mdiFormatHeader5,
    mdiFormatHeader6,
    mdiFormatHeaderPound,
    mdiMinus,
    mdiFormatIndentDecrease,
    mdiFormatIndentIncrease,
    mdiFormatItalic,
    mdiFormatParagraph,
    mdiFormatStrikethrough,
    mdiFormatSubscript,
    mdiFormatSuperscript,
    mdiFormatUnderline,
} from "../icons";

import { changePreviewHTMLView } from "./text-edit";

export let textFormatting = [
    {
        name: "b",
        title: "Bold",
        icon: mdiFormatBold,
        action: "bold",
    },
    {
        name: "i",
        title: "Italic",
        icon: mdiFormatItalic,
        action: "italic",
    },
    {
        name: "u",
        title: "Underline",
        icon: mdiFormatUnderline,
        action: "underline",
    },
    {
        name: "s",
        title: "Strikethrough",
        icon: mdiFormatStrikethrough,
        action: "strikethrough",
    },
    {
        name: "sub",
        title: "Subscript",
        icon: mdiFormatSubscript,
        action: "subscript",
    },
    {
        name: "sup",
        title: "Superscript",
        icon: mdiFormatSuperscript,
        action: "superscript",
    },
    {
        name: "hr",
        title: "Horizontal Rule",
        icon: mdiMinus,
        action: "inserthorizontalrule",
    },
];

export let textFormattingAlign = [
    {
        id: 0,
        name: "align-left",
        title: "Align Left",
        icon: mdiFormatAlignLeft,
        action: "justifyleft",
    },
    {
        id: 1,
        name: "align-center",
        title: "Align Center",
        icon: mdiFormatAlignCenter,
        action: "justifycenter",
    },
    {
        id: 2,
        name: "align-right",
        title: "Align Right",
        icon: mdiFormatAlignRight,
        action: "justifyright",
    },
    {
        id: 3,
        name: "align-justify",
        title: "Align Justify",
        icon: mdiFormatAlignJustify,
        action: "justifyfull",
    },
];

export let textFormattingIdent = [
    {
        name: "indent",
        title: "Indent",
        icon: mdiFormatIndentIncrease,
        action: "indent",
    },
    {
        name: "outdent",
        title: "Outdent",
        icon: mdiFormatIndentDecrease,
        action: "outdent",
    },
];

export let textFormattingHeader = [
    {
        id: 0,
        name: "p",
        title: "Paragraph",
        icon: mdiFormatParagraph,
        action: "formatblock",
        value: "p",
    },
    {
        id: 1,
        name: "h1",
        title: "Header 1",
        icon: mdiFormatHeader1,
        action: "formatblock",
        value: "h1",
    },
    {
        id: 2,
        name: "h2",
        title: "Header 2",
        icon: mdiFormatHeader2,
        action: "formatblock",
        value: "h2",
    },
    {
        id: 3,
        name: "h3",
        title: "Header 3",
        icon: mdiFormatHeader3,
        action: "formatblock",
        value: "h3",
    },
    {
        id: 4,
        name: "h4",
        title: "Header 4",
        icon: mdiFormatHeader4,
        action: "formatblock",
        value: "h4",
    },
    {
        id: 5,
        name: "h5",
        title: "Header 5",
        icon: mdiFormatHeader5,
        action: "formatblock",
        value: "h5",
    },
    {
        id: 6,
        name: "h6",
        title: "Header 6",
        icon: mdiFormatHeader6,
        action: "formatblock",
        value: "h6",
    },
    {
        id: 7,
        name: "pre",
        title: "Preformatted",
        icon: mdiFormatHeaderPound,
        action: "formatblock",
    },
];

export let moreTools = [
    {
        name: "code",
        title: "Code",
        icon: mdiCodeTags,
        action: changePreviewHTMLView,
    },
];
