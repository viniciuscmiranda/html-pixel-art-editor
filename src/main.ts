import { PixelArt } from "./classes/PixelArt";

const DEFAULT_GRID_SIZE = 10;
const MAX_GRID_SIZE = 20;
const MIN_GRID_SIZE = 3;

const gridControllerInput = document.getElementById(
  "grid-controller-input"
) as HTMLInputElement;
const gridControllerButton = document.getElementById(
  "grid-controller-button"
) as HTMLButtonElement;

function applyGridSize() {
  const value = gridControllerInput.value;
  const gridSize = Number(value) || DEFAULT_GRID_SIZE;

  gridControllerInput.value = String(gridSize);

  if (gridSize <= MAX_GRID_SIZE && gridSize >= MIN_GRID_SIZE) {
    init(gridSize);
  }
}

function init(gridSize: number) {
  document.documentElement.style.setProperty("--grid-size", String(gridSize));

  const container = document.getElementById("pixel-art");
  if (container) new PixelArt(container, gridSize);
}

function initInputs() {
  gridControllerInput.max = String(MAX_GRID_SIZE);
  gridControllerInput.min = String(MIN_GRID_SIZE);
  gridControllerInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") applyGridSize();
  });

  gridControllerButton.addEventListener("click", () => {
    applyGridSize();
  });
}

init(DEFAULT_GRID_SIZE);
initInputs();
