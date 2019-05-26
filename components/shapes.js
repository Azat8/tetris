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

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

class Shapes {
    generateRandomShape() {
        this.shape = shapesArray[Math.floor(Math.random() * shapesArray.length)];
        this.generateRandomRotation();
    }

    generateRandomRotation() {
        this.rotation = this.shape.rotations[Math.floor(Math.random() * this.shape.rotations.length)];
    }


    async canMove() {
        const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

        let oy = this.offsetY;
        let ox = this.offsetX;

        if(this.direction === 'down') {    
            oy = this.offsetY + this.cellHeight;
        }

        if(this.direction === 'right') {
            ox = this.offsetX + this.cellWidth;
        }

        if(this.direction === 'left') {
            ox = this.offsetX - this.cellWidth;
        }

        let CanMove = true;
        await asyncForEach(this.rotation, async (row, rowIndex) => {
          await asyncForEach(row, async (column, columnIndex) => {
            if(column) {
                let x = 0;
                let y = 0;

                y = oy + (this.cellHeight * rowIndex);
                x = ox + (this.cellWidth * columnIndex);

                await waitFor(10);
            
                if(
                    this.Ycoordinates.hasOwnProperty(y) && 
                    this.Ycoordinates[y].indexOf(x) !== -1
                ) {
                    CanMove = false;
                    return;
                } 

                if(y === this.canvasHeight) {
                    CanMove = false;
                }
            }
          });
        });

        if(CanMove) {
            // clear old shape
            await asyncForEach(this.rotation, async (row, rowIndex) => {
              await asyncForEach(row, async (column, columnIndex) => {
                if(column) {
                    let x = 0;
                    let y = 0;

                    y = this.offsetY + (this.cellHeight * rowIndex);
                    x = this.offsetX + (this.cellWidth * columnIndex);

                    this.ctx.clearRect(x, y, this.cellWidth, this.cellHeight);                            
                    await waitFor(10);
                }
              });
            });

            this.move();
        } else {
            // register coordinates
            await asyncForEach(this.rotation, async (row, rowIndex) => {
              await asyncForEach(row, async (column, columnIndex) => {
                if(column) {
                    let x = 0;
                    let y = 0;

                    y = this.offsetY + (this.cellHeight * rowIndex);
                    x = this.offsetX + (this.cellWidth * columnIndex);

                    
                    if(this.Ycoordinates.hasOwnProperty(y)) {
                        this.Ycoordinates[y].push(x);
                    } else {
                        this.Ycoordinates[y] = [x];
                    }
                    // console.log(this.Ycoordinates[y].length, this.xCellCount);
                    if(this.Ycoordinates[y].length === this.xCellCount) {
                        this.removeRow(y);
                    }
                    
                    if(!this.offsetY) {
                        location.reload();
                    }
                    
                    await waitFor(10);
                }
              });
            });
            this.generateNewShape();
            return;
        } 
        this.direction = 'down';
    }

    move() {
        if(this.direction === 'down') {
            this.offsetY += this.cellHeight;
        }

        if(this.direction === 'right') {
            this.offsetX += this.cellWidth;
        }

        if(this.direction === 'left') {
            this.offsetX -= this.cellWidth;
        }
                        
        this.rotation.forEach((v, row) =>  v.forEach((val, column) => {
            if(val) {
                let x = 0;
                let y = 0;
                
                y = this.offsetY + (this.cellHeight * row);
                x = this.offsetX + (this.cellWidth * column);
                this.ctx.fillStyle = this.shape.color;
                this.ctx.fillRect(x, y, this.cellWidth, this.cellHeight);
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
        this.canMove()
    }

    removeRow(row) {
        this.Ycoordinates[row].forEach((x) => {
            this.ctx.clearRect(x, row, this.cellWidth, this.cellHeight);
        });
        this.Ycoordinates[row] = [];
    }
}
