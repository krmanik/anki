import { addImageOcclusionNotes } from "./lib";
import { getAnswerMaskColor } from "./tools/lib";
import { noteFieldsData, tagsWritable } from "./store";
import { get } from "svelte/store";

let divData = ["type", "left", "top", "width", "height", "fill", "stroke", "strokeWidth", "angle", "radius", "startAngle", "endAngle", "rx", "ry", "points"];

export function generate(imagePath: string, generateTye: string, deckId: number): void {
    let canvas = globalThis.canvas;
    let canvasObjects = canvas.getObjects();

    let occlusionNotes = `<div id='io_cloze' data-answer-mask-color='${getAnswerMaskColor()}'>`;
    let clozeDiv = "";

    canvasObjects.forEach((object, index) => {
        let obJson = object.toJSON();
        if (obJson.type === "group") {
            clozeDiv += getGroupCloze(object, index, generateTye);
        } else {
            clozeDiv += getCloze(object, index, generateTye, null);
        }
    });

    occlusionNotes += clozeDiv + "</div>";
    console.log(occlusionNotes);

    saveImageNotes(imagePath, occlusionNotes, deckId);
}

const getCloze = (object, index, generateTye, relativePos) => {
    let obJson = object.toJSON();
    let clozeDiv = `<div `;

    Object.keys(obJson).forEach(function (key) {
        if (divData.includes(key)) {
            if (key === "points") {
                let points = JSON.stringify(obJson[key]);
                clozeDiv += `data-${key}='${points}' `;
            } else if (relativePos && key === "top") {
                clozeDiv += `data-top="${relativePos.top}" `;
            } else if (relativePos && key === "left") {
                clozeDiv += `data-left="${relativePos.left}" `;
            } else {
                clozeDiv += `data-${key}="${obJson[key]}" `;
            }
        }
    });

    clozeDiv += `>{{c${index + 1}::${generateTye}::prompted}}</div>\n`;
    return clozeDiv;
};

const getGroupCloze = (group, index, generateTye) => {
    let clozeDiv = "";
    let objects = group._objects;

    objects.forEach((object, idx) => {
        let { top, left } = getObjectPositionInGroup(group, object);
        clozeDiv += getCloze(object, index, generateTye, { top, left });
    });

    return clozeDiv;
};

const getObjectPositionInGroup = (group, object) => {
    let left = object.left + group.left + group.width / 2;
    let top = object.top + group.top + group.height / 2;
    left = left.toFixed(2);
    top = top.toFixed(2);
    return { top, left };
};

const saveImageNotes = async function (
    imagePath: string,
    occlusions: string,
    deckId: number,
) {
    const fieldsData = get(noteFieldsData);
    const header = fieldsData["header"];
    const notes = fieldsData["notes"];
    const tags = get(tagsWritable);

    await addImageOcclusionNotes(imagePath, deckId, occlusions, header, notes, tags);
};
