import { fabric } from "fabric";
import { getQuestionMaskColor, stopDraw } from "./lib";

export const drawTriangle = (canvas: any) => {
    let triangle, isDown, origX, origY;

    stopDraw(canvas);

    canvas.on("mouse:down", function (o) {
        isDown = true;

        let pointer = canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;

        triangle = new fabric.Triangle({
            left: pointer.x,
            top: pointer.y,
            fill: getQuestionMaskColor()!,
            width: 0,
            height: 0,
            transparentCorners: false,
            selectable: false,
        });

        canvas.add(triangle);
    });

    canvas.on("mouse:move", function (o) {
        if (!isDown) return;

        let pointer = canvas.getPointer(o.e);
        triangle.set({
            width: Math.abs(origX - pointer.x),
            height: Math.abs(origY - pointer.y),
        });

        canvas.renderAll();
    });

    canvas.on("mouse:up", function (o) {
        isDown = false;

        let pointer = canvas.getPointer(o.e);
        let width = Math.abs(origX - pointer.x);
        let height = Math.abs(origY - pointer.y);
        if (width < 5 || height < 5) {
            canvas.remove(triangle);
        }
        triangle.setCoords();
    });
};
