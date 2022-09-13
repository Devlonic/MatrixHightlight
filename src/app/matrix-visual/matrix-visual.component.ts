import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matrix-visual',
  templateUrl: './matrix-visual.component.html',
  styleUrls: ['./matrix-visual.component.scss'],
})
export class MatrixVisualComponent implements OnInit {
  matrix: number[][] = [];
  cellColors: string[][] = [];

  constructor() {
    this.generate(20, 20);
    this.paintAll();
  }

  generate(w: number, h: number) {
    for (let i = 0; i < h; i++) {
      this.matrix.push([]);

      for (let j = 0; j < w; j++) {
        this.matrix[i].push(Math.floor(Math.random() * 10));
      }
    }

    for (let i = 0; i < h; i++) {
      let arr = [];
      for (let j = 0; j < w; j++) {
        arr.push('');
      }
      this.cellColors.push(arr);
    }
  }

  ngOnInit(): void {}
  paintAll() {
    let m = this.matrix;
    let sizeX = m[0].length;
    let sizeY = m.length;
    for (let y = 0; y < sizeX; y++) {
      for (let x = 0; x < sizeY; x++) {
        if (x + 1 < sizeX && m[y][x] == m[y][x + 1]) {
          let curcolor = this.checkColor(x, y, x + 1, y);
          this.cellColors[y][x] = curcolor;
          this.cellColors[y][x + 1] = curcolor;
        }
        if (y + 1 < sizeY && m[y][x] == m[y + 1][x]) {
          let curcolor = this.checkColor(x, y, x, y + 1);
          this.cellColors[y][x] = curcolor;
          this.cellColors[y + 1][x] = curcolor;
        }
        // console.log(this.cellColors.map((arr) => arr.slice()));
      }
    }
  }
  paint(x: number, y: number, color: string) {
    this.cellColors[y][x] = color;
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }
  curCol = 0;
  randColor(): string {
    let color = '';
    color += this.getRandomInt(0, 0xbbbbbb).toString(16);
    while (color.length < 6) {
      color = '0' + color;
    }
    color = '#' + color;

    console.log('color generated: ', color);
    return color;
  }
  checkColor(x: number, y: number, xN: number, yN: number): string {
    if (this.cellColors[y][x] == '' && this.cellColors[yN][xN] == '')
      return this.randColor();
    else if (this.cellColors[y][x] == '' && this.cellColors[yN][xN] != '')
      return this.cellColors[yN][xN];
    else return this.cellColors[y][x];
  }
}
