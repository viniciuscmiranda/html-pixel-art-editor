import { loopGrid } from "../utils/loopGrid";
import { getDataSetSelector } from "../utils/getDataSetSelector";

import { Class, Color, Data, StringBoolean, type Coords } from "../types";

export class PixelArt {
  private gridSize: number;
  private container: HTMLElement;
  private canvas = this.createCanvas();
  private pallette = this.createPallette();
  private colors: Color[][] = [];
  private selectedColor: Color = Color.Default;

  constructor(container: HTMLElement, gridSize: number) {
    this.container = container;
    this.gridSize = gridSize;
    this.init();
  }

  private init() {
    this.initElements();
    this.initCanvas();
    this.initColors();
    this.initPallette();
  }

  private initElements() {
    this.container.innerHTML = "";
    this.container.appendChild(this.canvas);
    this.container.appendChild(this.pallette);
  }

  private createCanvas() {
    const canvas = document.createElement("div");
    canvas.classList.add(Class.Canvas);

    return canvas;
  }

  private createPixel({ x, y }: Coords) {
    const pixel = document.createElement("button");
    pixel.classList.add(Class.Pixel);
    pixel.dataset[Data.PixelX] = String(x);
    pixel.dataset[Data.PixelY] = String(y);

    return pixel;
  }

  private setPixelColor(coords: Coords, color: Color) {
    const dataSetSelector = getDataSetSelector(coords);
    const pixel = this.canvas.querySelector(
      `.${Class.Pixel}${dataSetSelector}`
    ) as HTMLElement;

    pixel.addEventListener("click", () => {
      this.setPixelColor(coords, this.selectedColor);
    });

    pixel.style.background = color;
  }

  private initColors() {
    loopGrid(this.gridSize, (x, y) => {
      if (!this.colors[x]) this.colors[x] = [];
      const color = Color.Default;

      this.colors[x][y] = color;
      this.setPixelColor({ x, y }, color);
    });
  }

  private initCanvas() {
    loopGrid(this.gridSize, (x, y) => {
      const pixel = this.createPixel({ x, y });

      this.canvas.appendChild(pixel);
    });
  }

  private setSelectedColor(color: Color) {
    this.selectedColor = color;

    this.pallette.childNodes.forEach((node) => {
      const palletteColor = node as HTMLElement;

      const palletteColorValue = palletteColor.dataset[Data.PalletteColorValue];

      const isSelectedColor = palletteColorValue === color;

      palletteColor.dataset[Data.PalletteColorSelected] = isSelectedColor
        ? StringBoolean.True
        : StringBoolean.False;
    });
  }

  private createPalletteColor(color: Color) {
    const palletteColor = document.createElement("button");
    palletteColor.title = color;
    palletteColor.classList.add(Class.Color);
    palletteColor.style.backgroundColor = color;
    palletteColor.dataset[Data.PalletteColorValue] = color;

    const isSelectedColor = color === this.selectedColor;
    palletteColor.dataset[Data.PalletteColorSelected] = isSelectedColor
      ? StringBoolean.True
      : StringBoolean.False;

    palletteColor.addEventListener("click", () => {
      this.setSelectedColor(color);
    });

    return palletteColor;
  }

  private initPallette() {
    Object.values(Color).forEach((color) => {
      const palletteColor = this.createPalletteColor(color);

      this.pallette.appendChild(palletteColor);
    });
  }

  private createPallette() {
    const pallette = document.createElement("div");
    pallette.classList.add(Class.Pallette);

    return pallette;
  }
}
