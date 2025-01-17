export const epoc = (floorOrCeil?: "floor" | "ceil") => {
  if (!floorOrCeil) return Math.round(Date.now() / 1000);
  if (floorOrCeil === "floor") return Math.floor(Date.now() / 1000);
  if (floorOrCeil === "ceil") return Math.ceil(Date.now() / 1000);
  throw new Error("Invalid floorOrCeil");
};
