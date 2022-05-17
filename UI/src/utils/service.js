import axios from "axios";

const BASE_URL = "https://nagarro-qa-hackathon.herokuapp.com";

// export const sentenceToAscii = (str) => {
//   let encodedPassword = "";
//     for(let index = 0; index < str.length; index++) {
//         encodedPassword += str.charCodeAt(index);
//     }
//     console.log("encoded password is : " + encodedPassword);
//     return encodedPassword;
// }

// export const asciiToSentence = (str) => {
//     var num = 0;
//     let finalStr = '';
//     for (var i = 0; i < str.length; i++) {
 
//         // Append the current digit
//         num = num * 10 + (str[i] - '0');
 
//         // If num is within the required range
//         if (num >= 32 && num <= 122) {
 
//             // Convert num to char
//             var ch = String.fromCharCode(num);
//             // document.write(ch);
//             finalStr +=ch;
//             // Reset num to 0
//             num = 0;
//         }
//     }
//     console.log("decoded password is : " + finalStr);
//     return finalStr;
// }

export const getCall = async (url = '/users', paramsObj) => {
  const response = await axios.get(`${BASE_URL}${url}`,{
      params: paramsObj
    })
  return response
}

export const postCall = async (url = '/login', params) => {
  const response = await axios.post(`${BASE_URL}${url}`, params)
  return response;
}

export const deleteCall = async (url = '/dashboard/user/delete') => {
  const response = await axios.delete(`${BASE_URL}${url}`)
  return response;
}

export const putCall = async (url = 'dashboard/user/edit', params) => {
  const response = await axios.put(`${BASE_URL}${url}`, params)
  return response;
}