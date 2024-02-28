// Copyright: Ankitects Pty Ltd and contributors
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { fabric } from "fabric";
import { SHAPE_MASK_COLOR } from "image-occlusion/tools/lib";

import type { ConstructorParams, Size } from "../types";
import type { ShapeDataForCloze } from "./base";
import { Shape } from "./base";
import { floatToDisplay } from "./floats";
import { xFromNormalized, xToNormalized, yFromNormalized, yToNormalized } from "./position";

export class Path extends Shape {
    path: PathCommand[];

    constructor({ path = [], ...rest }: ConstructorParams<Path> = {}) {
        super(rest);
        this.path = path;
    }

    toDataForCloze(): PathDataForCloze {
        return {
            ...super.toDataForCloze(),
            fill: SHAPE_MASK_COLOR,
            path: getStringFromPath(this.path),
        };
    }

    toFabric(size: Size): fabric.Path {
        const absolute = this.toAbsolute(size);
        return new fabric.Path(absolute.path, absolute);
    }

    toNormal(size: Size): Path {
        const path: string[][] = [];

        this.path.forEach((p) => {
            if (p[0] == "M") {
                path.push(["M", `${xToNormalized(size, p[1])}`, `${yToNormalized(size, p[2])}`]);
            }
            if (p[0] == "L") {
                path.push(["L", `${xToNormalized(size, p[1])}`, `${yToNormalized(size, p[2])}`]);
            }
            if (p[0] == "Q") {
                path.push(["Q",
                    `${xToNormalized(size, p[1])}`,
                    `${yToNormalized(size, p[2])}`,
                    `${xToNormalized(size, p[3])}`,
                    `${yToNormalized(size, p[4])}`,
                ]);
            }
        });

        return new Path({
            ...this,
            ...super.normalPosition(size),
            path,
        });
    }

    toAbsolute(size: Size): Path {
        const path: string[][] = [];

        this.path.forEach((p) => {
            if (p[0] == "M") {
                path.push(["M", `${xFromNormalized(size, p[1])}`, `${yFromNormalized(size, p[2])}`]);
            }
            if (p[0] == "L") {
                path.push(["L", `${xFromNormalized(size, p[1])}`, `${yFromNormalized(size, p[2])}`]);
            }
            if (p[0] == "Q") {
                path.push(["Q",
                    `${xFromNormalized(size, p[1])}`,
                    `${yFromNormalized(size, p[2])}`,
                    `${xFromNormalized(size, p[3])}`,
                    `${yFromNormalized(size, p[4])}`,
                ]);
            }
        });
        return new Path({
            ...this,
            ...super.absolutePosition(size),
            path,
        });
    }
}

interface PathDataForCloze extends ShapeDataForCloze {
    path: string;
    fill: string;
}

export class PathCommand {
    path: string[] = []

    constructor({ path = [] }: ConstructorParams<PathCommand> = {}) {
        this.path = path;
    }
}

function getStringFromPath(pathCommand: PathCommand[]): string {
    let pathStr = "";

    pathCommand.forEach(p => {
        if (p[0] == "M") {
            pathStr += `M${floatToDisplay(p[1])}${floatToDisplay(p[2])} `;
        }
        if (p[0] == "Q") {
            pathStr += `Q${floatToDisplay(p[1])}${floatToDisplay(p[2])}${floatToDisplay(p[3])}${floatToDisplay(p[4])} `;
        }
        if (p[0] == "L") {
            pathStr += `L${floatToDisplay(p[1])}${floatToDisplay(p[2])} `;
        }
    })
    return pathStr;
}
