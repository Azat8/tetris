const shapesArray = [
    {
        name: 'Z',
        color: 'red',
        rotations: [
            [
                [1,1,0],
                [0,1,1],
            ],
            [
                [0,1],
                [1,1],
                [1,0],
            ]
        ]
    },
    {
        name: 'I',
        color: 'blue',
        rotations: [
            [
                [1],
                [1],
                [1],
                [1]
            ],
            [
                [1,1,1,1]
            ]
        ]

    }
];

class Shapes {
    generateRandomShape() {
        this.shape = shapesArray[Math.floor(Math.random() * shapesArray.length)];
        this.generateRandomRotation();
    }

    generateRandomRotation() {
        this.rotation = this.shape.rotations[Math.floor(Math.random() * this.shape.rotations.length)];
    }

    canMove() {
        let canMove = true;
        let coordinate = 0;

        let offsetX = 0;
        let offsetY = 0;


        this.rotation.forEach((v, row) =>  v.forEach((val, column) => {
            if(val) {
                if(this.direction === 'down') {
                    offsetY = row++ * this.cellHeight + this.offsetY;
                    offsetX = column * this.cellWidth + this.offsetX;

                    coordinate = offsetX * offsetY;
                    canMove = !this.coordinates.includes(coordinate);

                    if ((this.cellHeight * this.rotation.length) + this.offsetY === this.canvasHeight) {
                        canMove = false;
                    }
                }
            }

        }));

        return canMove;
    }

    move() {
        this.rotation.forEach((v, row) =>  v.forEach((val, column) => {
            if(val) {
                if(this.direction === 'down') {
                    console.log(this.offsetY, this.offsetX);
                    this.offsetY = row * this.cellHeight + this.offsetY;
                    this.offsetX = column * this.cellWidth + this.offsetX;

                    console.log('x: ' + this.offsetX, 'y: ' + this.offsetY);
                }

                this.ctx.fillStyle = this.shape.color;
                this.ctx.fillRect(this.offsetX, this.offsetY, this.cellWidth, this.cellHeight);
            }

        }));
    }

    registerCoordinates() {
        this.rotation.forEach((v, row) =>  v.forEach((val, column) => {
            if(val) {
                let offsetY = row * this.cellHeight + this.offsetY;
                let offsetX = column * this.cellWidth + this.offsetX;

                this.registerCoordinates(offsetX * offsetY);
            }
        }));
    }

    initShape() {

        if(this.canMove()) {
            this.move();
        } else {
            this.registerCoordinates();
        }

        // for(let y = 0; y < this.rotation.length; y++) {
        //     console.log(this.rotation[y].length);
        //     // for(let x = 0; x < this.rotation[y].length; x++) {
        //     //     const offsetY = y * this.cellHeight + offsetY_;
        //     //     const offsetX = x * this.cellWidth + offsetX_;
        //     //
        //     //     if(this.rotation[y][x]) {
        //     //         if(this.coordinates.includes(offsetY * offsetX)) {
        //     //             this.generateNewShape();
        //     //         } else {
        //     //             this.ctx.fillStyle = this.shape.color;
        //     //             this.coordinates.push(offsetX * offsetY);
        //     //             this.ctx.fillRect(offsetX, offsetY, this.cellWidth, this.cellHeight);
        //     //
        //     //             this.offsetX = offsetX;
        //     //             this.offsetY = offsetY;
        //     //             this.clearShape();
        //     //         }
        //     //     }
        //     // }
        // }

    }

    clearShape() {
        this.ctx.clearRect(this.offsetX, this.offsetY, this.cellWidth, this.cellHeight);
    }
}
