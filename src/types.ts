export enum Class {
  Canvas = "canvas",
  Pallette = "pallette",
  Color = "color",
  Pixel = "pixel",
}

export enum Data {
  PalletteColorValue = "color",
  PalletteColorSelected = "selected",
  PixelX = "x",
  PixelY = "y",
}

export enum Color {
  Default = "whitesmoke",
  Black = "black",
  Gray = "gray",
  Red = "firebrick",
  Green = "seagreen",
  Blue = "royalblue",
  Purple = "rebeccapurple",
  Pink = "hotpink",
  Orange = "orangered",
  Yellow = "gold",
  Violet = "orchid",
  Cyan = "aqua",
}

export type Coords = {
  x: number;
  y: number;
};

export enum StringBoolean {
  True = "true",
  False = "false",
}
