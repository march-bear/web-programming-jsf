function trimValue(value, min, max) {
    if (value < min)
        return min;
    if (value > max)
        return max;
    return value;
}

class CanvasController {
    constructor(canvas) {
        this.canvas = canvas;
        this.r = 1
        this.translateX = 0;
        this.translateY = 0;
        this.scale = 1;
    }

    trimX(x) {
        console.log(`x ${this.scale} ${this.translateX}`)
        return (x - this.translateX);
    }

    trimY(y) {
        console.log(`y ${this.scale} ${this.translateY}`)
        return (y - this.translateY);
    }

    addTranslate(x, y) {
        this.translateX += x * this.scale;
        this.translateY += y * this.scale;
    }
    setTranslate(x, y) {
        this.translateX = x;
        this.translateY = y;
    }

    setScale(scale) {
        this.scale = scale;
    }

    clearCanvas() {
        if (this.canvas && this.canvas.getContext) {
            const context = this.canvas.getContext('2d');
            context.clearRect(0, 0, 400, 400);
        }
    }

    drawCanvas() {
        if (this.canvas && this.canvas.getContext) {
            const context = this.canvas.getContext('2d');

            this.clearCanvas();

            context.scale(this.scale, this.scale);
            context.translate((this.translateX + 200 * (1 - this.scale)) / this.scale, (this.translateY + 200 * (1 - this.scale)) / this.scale);


            context.lineWidth = 5;
            context.fillStyle = "#55AA99";
            context.strokeStyle = "#005533";

            context.beginPath()
            context.arc(200, 200, 100, Math.PI, Math.PI / 2, true);
            context.stroke();

            context.moveTo(250, 200);
            context.lineTo(200, 100);
            context.stroke();

            context.beginPath();
            context.moveTo(100, 200);
            context.lineTo(100, 100);
            context.lineTo(200, 100)
            context.stroke();
            context.closePath();

            context.beginPath();
            context.moveTo(200, 200);
            context.arc(200, 200, 100, Math.PI, Math.PI / 2, true);
            context.fill();
            context.closePath();

            context.moveTo(200, 200);

            context.beginPath();
            context.lineTo(250, 200);
            context.lineTo(200, 100);
            context.lineTo(200, 200);
            context.fill();
            context.closePath()

            context.moveTo(200, 200);

            context.beginPath();
            context.lineTo(100, 200);
            context.lineTo(100, 100);
            context.lineTo(200, 100);
            context.lineTo(200, 200)
            context.fill();
            context.closePath()

            context.strokeStyle = "#004422";
            context.lineWidth = 3;

            context.translate(-(this.translateX + 200 * (1 - this.scale)) / this.scale, -(this.translateY + 200 * (1 - this.scale)) / this.scale);
            context.scale(1 / this.scale, 1 / this.scale);

            context.beginPath();
            context.moveTo(trimValue(200 + this.translateX, 0, 400), 400);
            context.lineTo(trimValue(200 + this.translateX, 0, 400), 3);
            context.moveTo(trimValue(207 + this.translateX, 7, 400), 13);
            context.lineTo(trimValue(200 + this.translateX, 0, 400), 3);
            context.lineTo(trimValue(193 + this.translateX, 0, 393), 13);
            context.stroke();
            context.closePath();

            context.beginPath();
            context.moveTo(0, trimValue(200 + this.translateY, 0, 400));
            context.lineTo(397, trimValue(200 + this.translateY, 0, 400));
            context.moveTo(387, trimValue(193 + this.translateY, 0, 393));
            context.lineTo(397, trimValue(200 + this.translateY, 0, 400));
            context.lineTo(387, trimValue(207 + this.translateY, 7, 400));
            context.stroke();
            context.closePath();
        }
    }
    drawPoint(x, y, r, hit = false) {
        if (this.canvas && this.canvas.getContext) {
            const context = canvas.getContext('2d');

            context.scale(this.scale, this.scale);
            context.translate((this.translateX + 200 * (1 - this.scale)) / this.scale, (this.translateY + 200 * (1 - this.scale)) / this.scale);

            context.lineWidth = 2;
            if (hit) {
                context.fillStyle = "#2255CC";
                context.strokeStyle = "#223399";
            } else {
                context.fillStyle = "#CC1122";
                context.strokeStyle = "#991122";
            }
            context.beginPath()
            context.arc(200 + x / r * 100 , 200 - (y / r * 100), 2 / this.scale, 0, Math.PI * 2, true);
            context.stroke();
            context.closePath();

            context.translate(-(this.translateX + 200 * (1 - this.scale)) / this.scale, -(this.translateY + 200 * (1 - this.scale)) / this.scale);
            context.scale(1 / this.scale, 1 / this.scale);
        }
    }
    removeAllPoints() {
        this.drawCanvas()
    }
}

