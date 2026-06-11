const BASE_URL = 'https://www.plantuml.com/plantuml/svg';

function toHex(str) {
  let hex = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    hex += code.toString(16).padStart(2, '0');
  }
  return hex;
}

export function encodePlantUML(puml) {
  return `${BASE_URL}/~h${toHex(puml)}`;
}
