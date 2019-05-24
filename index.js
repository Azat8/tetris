// import Shapes from 'components/shapes';

class Tetris extends Shapes {
    constructor(el) {
        super();
        const self = this;

        this.el = el;

        this.yCellCount = 16;
        this.xCellCount = 8;

        this.offsetY = 0;
        this.offsetX = (self.xCellCount/2) * (self.cellWidth / 2);

        this.coordinates = [];

        this.direction = 'down';

        this.hasShape = false;
        window.onload = function() {
            self.canvas =  document.getElementById(self.el);
            self.ctx = self.canvas.getContext('2d');


            self.area = {};
            self.canvasHeight = self.canvas.height;
            self.canvasWidth = self.canvas.width;

            self.cellWidth = self.canvasWidth / self.xCellCount;
            self.cellHeight = self.canvasHeight / self.yCellCount;

            self.drawGrid();
            self.generateRandomShape();
            self.moveShape();
        };
    }

    drawGrid() {
        const self = this;
        self.area = Area.generateArea(self.ctx, self.cellWidth, self.cellHeight, self.xCellCount, self.yCellCount);
    }

    generateNewShape() {
        this.generateRandomShape();
        this.offsetX = (this.xCellCount/2) * (this.cellWidth / 2);
        this.offsetY = 0;
    }

    moveShape() {
        const self = this;
        this.offsetX = (this.xCellCount/2) * (this.cellWidth / 2);

        window.onkeyup = function (e) {
            if(e.code === 'ArrowRight' && self.offsetX + self.cellWidth + (self.rotation[0].length * self.cellWidth) <= self.canvasWidth) {
                self.direction = 'right';
                // self.offsetX = self.cellWidth + self.offsetX++;
            }
            if(e.code === 'ArrowLeft' && self.offsetX) {
                self.direction = 'left';
                //self.offsetX = self.offsetX - (self.cellWidth);
            }
        };

        let interval = () => {
            this.initShape();
            // if ((self.cellHeight * self.rotation.length) + self.offsetY !== self.canvasHeight) {
            //     this.hasShape = true;
            //
            // }
            clearInterval(interval);
        };

        setInterval(interval, 5000);
    }
}

const tetris = new Tetris('tetris');
