import { stripDataUrlPrefix, scaleToHeight, buildBoxes } from "./utils";

describe("stripDataUrlPrefix", () => {
  test("removes the prefix for any mime type", () => {
    expect(stripDataUrlPrefix("data:image/jpeg;base64,QUJD")).toBe("QUJD");
    expect(stripDataUrlPrefix("data:application/octet-stream;base64,QUJD")).toBe("QUJD");
  });

  test("keeps base64 padding", () => {
    expect(stripDataUrlPrefix("data:image/png;base64,QQ==")).toBe("QQ==");
  });
});

describe("scaleToHeight", () => {
  test("scales to 400px tall and keeps the aspect ratio", () => {
    expect(scaleToHeight(800, 1600)).toEqual({ width: 200, height: 400 });
  });

  test("accepts another target height", () => {
    expect(scaleToHeight(100, 50, 100)).toEqual({ width: 200, height: 100 });
  });
});

describe("buildBoxes", () => {
  const boxes = [
    { Left: 0.1, Top: 0.2, Width: 0.3, Height: 0.4 },
    { Left: 0.5, Top: 0.5, Width: 0.25, Height: 0.25 },
  ];

  test("converts fractional boxes to pixels", () => {
    const result = buildBoxes(["ann", "bob"], boxes, 200, 400);
    expect(result.boxes[0]).toEqual({ x: 20, y: 80, width: 60, height: 160 });
    expect(result.boxes[1]).toEqual({ x: 100, y: 200, width: 50, height: 100 });
  });

  test("known faces are green with the alias, unknown faces are red with na", () => {
    const result = buildBoxes(["ann", ""], boxes, 200, 400);
    expect(result.colors).toEqual(["#39FF14", "#FF0000"]);
    expect(result.aliases).toEqual([" ann ", "na"]);
  });

  test("does not change the input", () => {
    const aliases = ["ann", ""];
    buildBoxes(aliases, boxes, 200, 400);
    expect(aliases).toEqual(["ann", ""]);
  });

  test("no faces gives empty results", () => {
    expect(buildBoxes([], [], 200, 400)).toEqual({ boxes: [], colors: [], aliases: [] });
  });
});
