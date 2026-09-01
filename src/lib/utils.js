import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getColors = (colors, reverse=false) => {
  let colorList = [];
  if (colors.color1) {
    if (colors.color1) colorList.push(colors.color1);
    if (colors.color2) colorList.push(colors.color2);
    if (colors.color3) colorList.push(colors.color3);
    if (colors.color4) colorList.push(colors.color4);
    if (colors.color5) colorList.push(colors.color5);
    if (colors.color6) colorList.push(colors.color6);
  } else {
    colors.forEach(color => colorList.push(color));
  }

  if (reverse) colorList = [...colorList].reverse();

  // console.log("linear-gradient(to right, " + `#${colorList.join(", #")})`);

  return "linear-gradient(to right, " + `#${colorList.join(", #")})`;
}

