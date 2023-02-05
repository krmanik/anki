import { fabric } from "fabric";
import { getQuestionMaskColor } from "./lib";

let activeLine;
let activeShape;
let linesList: any = [];
let pointsList: any = [];
let drawMode = false;
let zoomValue = 1;
let panzoomX = 1, panzoomY = 1;

export const drawPolygon = (canvas: any, panzoom: any) => {
    zoomValue = panzoom.getTransform().scale;
    panzoomX = panzoom.getTransform().x;
    panzoomY = panzoom.getTransform().y;

    canvas.on('mouse:down', function (options) {
        if (options.target && options.target.id === pointsList[0].id) {
            generatePolygon(canvas, pointsList);
        } else {
            addPoint(canvas, options);
        }
    });

    canvas.on('mouse:move', function (options) {
        if (activeLine && activeLine.class === 'line') {
            const pointer = canvas.getPointer(options.e);
            activeLine.set({
                x2: pointer.x,
                y2: pointer.y
            });

            const points = activeShape.get('points');
            points[pointsList.length] = {
                x: pointer.x,
                y: pointer.y
            };

            activeShape.set({ points });
        }
        canvas.renderAll();
    });
}

const toggleDrawPolygon = (canvas) => {
    drawMode = !drawMode;
    if (drawMode) {
        activeLine = null;
        activeShape = null;
        linesList = [];
        pointsList = [];
        drawMode = false;
        canvas.selection = true;
    } else {
        drawMode = true;
        canvas.selection = false;
    }
}

const addPoint = (canvas, options) => {
    const point = new fabric.Circle({
        radius: 5,
        fill: '#ffffff',
        stroke: '#333333',
        strokeWidth: 0.5,
        originX: "left",
        originY: "top",
        left: (options.e.layerX - panzoomX) / zoomValue,
        top: (options.e.layerY - panzoomY) / zoomValue,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        objectCaching: false,
    });

    if (pointsList.length === 0) {
        point.set({
            fill: 'red'
        });
    }

    const linePoints = [
        (options.e.layerX - panzoomX) / zoomValue,
        (options.e.layerY - panzoomY) / zoomValue,
        (options.e.layerX - panzoomX) / zoomValue,
        (options.e.layerY - panzoomY) / zoomValue,
    ];

    const line = new fabric.Line(linePoints, {
        strokeWidth: 2,
        fill: '#999999',
        stroke: '#999999',
        originX: "left",
        originY: "top",
        selectable: false,
        hasBorders: false,
        hasControls: false,
        evented: false,
        objectCaching: false,
    });
    line.class = 'line';

    if (activeShape) {
        const pointer = canvas.getPointer(options.e);
        const points = activeShape.get('points');
        points.push({
            x: pointer.x,
            y: pointer.y
        });

        const polygon = new fabric.Polygon(points, {
            stroke: '#333333',
            strokeWidth: 1,
            fill: '#cccccc',
            opacity: 0.3,
            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false,
            objectCaching: false,
        });

        canvas.remove(activeShape);
        canvas.add(polygon);
        activeShape = polygon;
        canvas.renderAll();
    } else {
        const polyPoint = [{
            x: (options.e.layerX - panzoomX) / zoomValue,
            y: (options.e.layerY - panzoomY) / zoomValue,
        }];

        const polygon = new fabric.Polygon(polyPoint, {
            stroke: '#333333',
            strokeWidth: 1,
            fill: '#cccccc',
            opacity: 0.3,
            selectable: false,
            hasBorders: false,
            hasControls: false,
            evented: false,
            objectCaching: false,
        });

        activeShape = polygon;
        canvas.add(polygon);
    }

    activeLine = line;
    pointsList.push(point);
    linesList.push(line);

    canvas.add(line);
    canvas.add(point);
}

const generatePolygon = (canvas, pointsList) => {
    const points: any = [];
    pointsList.forEach((point) => {
        points.push({
            x: point.left,
            y: point.top,
        });
        canvas.remove(point);
    });

    linesList.forEach((line) => {
        canvas.remove(line);
    });

    canvas.remove(activeShape).remove(activeLine);

    const polygon = new fabric.Polygon(points, {
        fill: getQuestionMaskColor(),
        objectCaching: false,
        moveable: false,
    });

    canvas.add(polygon);
    toggleDrawPolygon(canvas);
}