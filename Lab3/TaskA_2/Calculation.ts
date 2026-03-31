export const calculateMidPoint = (inputX1:string, inputY1:string, inputX2:string, inputY2:string) => {
  let x1 = Number(inputX1);
  let y1 = Number(inputY1);
  let x2 = Number(inputX2);
  let y2 = Number(inputY2);

  let midX = (x1 + x2)/2;
  let midY = (y1 + y2)/2;

  return ("(" + midX.toString() + "," + midY.toString() + ")");
  }

  const calculateDistance = (inputX1:string, inputY1:string, inputX2:string, inputY2:string) => {
      let x1 = Number(inputX1);
      let y1 = Number(inputY1);
      let x2 = Number(inputX2);
      let y2 = Number(inputY2);

      let tmpX = Math.pow(x2-x1,2);
      let tmpY = Math.pow(y2-y1,2);

      let distance =  Math.sqrt(tmpX + tmpY);

      return (distance.toString());
  }

  export default calculateDistance;