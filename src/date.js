const d1=new Date();
let st="2024-10-13 09:00:00";
let s2=new Date(st);
console.log(d1.setDate(3));
console.log(s2);
const apiUrl = 'https://api.api-ninjas.com/v1/city';
const apiKey = 'IyngNVScqH2x+wHaFwGm8w==uvoM9IDsAIlNSgD7';
fetch(apiUrl, {
    method: 'GET', // or 'POST' depending on your request
    headers: {
      'Authorization': `Bearer ${apiKey}`, // or 'x-api-key': apiKey depending on the API requirements
      'Content-Type': 'application/json'
    }
  })