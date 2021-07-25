export function randomUrl(min: number, max: number){

  let str = '';

  do{
    str += Math.random().toString(36).substr(2);
  }while(str.length < min && str.length > max);
  str = str.substr(1);
  return str;
}