export function randomUrl(min: number, max: number){

  let str = '';
  const num = Math.floor(Math.random() * (max - min)) + min 

  do{

    str += Math.random().toString(36).substr(2);
  
  }while(str.length < min && str.length > max);
  str = str.substr(0, num)
  
  return str;
}