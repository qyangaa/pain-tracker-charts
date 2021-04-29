export const max = (arr, f = (d) => d) => {
  let curMax = Number.MIN_VALUE;
  let maxIdx = -1;
  let results = [];
  for (let i = 0; i < arr.length; i++) {
    let cur = f(arr[i]);
    if (cur > curMax) {
      curMax = cur;
      maxIdx = i;
      results = [i];
    }
    if (cur == curMax) results.push(i);
  }
  return { maxVal: curMax, maxIdxs: results };
};

export function LightenDarkenColor(col, amt) {
  if (!col) return "#000000";
  var usePound = false;
  console.log(col);

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var num = parseInt(col, 16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
