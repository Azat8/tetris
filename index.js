class Tetris extends Shapes {
    constructor(el) {
        super();
        const self = this;

        this.el = el;

        this.yCellCount = 16;
        this.xCellCount = 8;

        this.offsetY = 0;
        this.offsetX = 0;

        this.coordinates = [];

        this.direction = 'down';

        this.hasShape = false;
        this.Ycoordinates = {};

        window.onload = function() {
            self.canvas =  document.getElementById(self.el);
            self.ctx = self.canvas.getContext('2d');


            self.area = {};
            self.canvasHeight = self.canvas.height;
            self.canvasWidth = self.canvas.width;

            self.cellWidth = self.canvasWidth / self.xCellCount;
            self.cellHeight = self.canvasHeight / self.yCellCount;

            self.offsetX = (self.xCellCount/2) * (self.cellWidth / 2)

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
        window.onkeyup = function (e) {
            if(e.code === 'ArrowRight' && self.offsetX + self.cellWidth + (self.rotation[0].length * self.cellWidth) <= self.canvasWidth) {
                self.direction = 'right';
            }
            if(e.code === 'ArrowLeft' && self.offsetX) {
                self.direction = 'left';
            }
        };

       let interval = () => {
           this.initShape();
           clearInterval(interval);
           self.drawGrid();
       };

      setInterval(interval, 300);
    }
}

const tetris = new Tetris('tetris');
