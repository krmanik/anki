import { fabric } from "fabric";
import { getQuestionMaskColor, stopDraw } from "./lib";

export const drawRectangle = (canvas: any) => {
    let rect, isDown, origX, origY;

    stopDraw(canvas);

    canvas.on("mouse:down", function (o) {
        isDown = true;

        let pointer = canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;

        rect = new fabric.Rect({
            left: origX,
            top: origY,
            originX: "left",
            originY: "top",
            width: pointer.x - origX,
            height: pointer.y - origY,
            angle: 0,
            fill: getQuestionMaskColor()!,
            transparentCorners: false,
            selectable: false,
        });

        canvas.add(rect);
    });

    canvas.on("mouse:move", function (o) {
        if (!isDown) return;
        let pointer = canvas.getPointer(o.e);

        if (origX > pointer.x) {
            rect.set({
                left: Math.abs(pointer.x),
            });
        }
        if (origY > pointer.y) {
            rect.set({
                top: Math.abs(pointer.y),
            });
        }

        rect.set({
            width: Math.abs(origX - pointer.x),
        });
        rect.set({
            height: Math.abs(origY - pointer.y),
        });

        canvas.renderAll();
    });

    canvas.on("mouse:up", function (o) {
        isDown = false;

        let pointer = canvas.getPointer(o.e);
        let height = Math.abs(origY - pointer.y);
        let width = Math.abs(origX - pointer.x);

        if (height < 5 && width < 5) {
            canvas.remove(rect);
        }
        rect.setCoords();
    });
};