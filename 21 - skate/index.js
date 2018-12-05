const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth * 2;
canvas.height = window.innerWidth * 2;
const iso = new Isomer(canvas);

const { Shape, Point, Color } = Isomer;
const { Prism } = Shape;

const createGrid = (xConstraint, yConstraint) => {
  let overallCount = 0;
  for (let xCount = 0; xCount < xConstraint; xCount++) {
    for (let yCount = 0; yCount < yConstraint; yCount++) {
      overallCount++;
      const rgb = yCount * xCount;
      iso.add(
        Prism(new Point(xCount * 2 - 1, yCount * 2 - 1, 1)),
        new Color(rgb, rgb, rgb)
      );
    }
  }
};
createGrid(8, 8);
