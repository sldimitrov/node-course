
const targetValue = 10;
const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let leftIdx = 0;
let rightIdx = sortedArray.length;

for (let i = 0; i <= sortedArray.length; i++) {
  let midIndex = Math.floor((leftIdx + rightIdx) / 2);

  const currentValue = sortedArray[midIndex];

  if (currentValue === targetValue) {
    break;
  } else if (currentValue < targetValue) {
    leftIdx = midIndex;
  } else if (currentValue > targetValue) {
    rightIdx = midIndex;
  }

  if (midIndex === 0 || midIndex === sortedArray.length - 1) {
    break;
  }
}
