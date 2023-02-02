import { fabric } from "fabric";
import { getQuestionMaskColor, stopDraw } from "./lib";

export const drawSquare = (canvas: any) => {
    let square, isDown, origX, origY;

    stopDraw(canvas);

    canvas.on("mouse:down", function (o) {
        isDown = true;

        let pointer = canvas.getPointer(o.e);
        origX = pointer.x;
        origY = pointer.y;

        square = new fabric.Rect({
            left: origX,
            top: origY,
            originX: "left",
            originY: "top",
            width: 0,
            height: 0,
            angle: 0,
            fill: getQuestionMaskColor()!,
            transparentCorners: false,
            selectable: false,
        });

        canvas.add(square);
    });

    canvas.on("mouse:move", function (o) {
        if (!isDown) return;
        let pointer = canvas.getPointer(o.e);

        if (origX > pointer.x) {
            square.set({
                left: Math.abs(pointer.x),
            });
        }
        if (origY > pointer.y) {
            square.set({
                top: Math.abs(pointer.y),
            });
        }

        let width = Math.abs(origX - pointer.x);
        let height = Math.abs(origY - pointer.y);

        if (width > height) {
            height = width;
        }
        if (height > width) {
            width = height;
        }

        square.set({
            width: width,
            height: height,
        });

        canvas.renderAll();
    });

    canvas.on("mouse:up", function (o) {
        isDown = false;

        let pointer = canvas.getPointer(o.e);
        let height = Math.abs(origY - pointer.y);
        let width = Math.abs(origX - pointer.x);

        if (height < 5 && width < 5) {
            canvas.remove(square);
        }
        square.setCoords();
    });
};
