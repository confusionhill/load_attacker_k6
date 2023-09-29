import http from 'k6/http';
import { sleep } from 'k6';

const vmURL = 'http://119.81.37.228:8080'
const kubeURL = 'http://45a15826-jp-tok.lb.appdomain.cloud:8080'

function generateRandomString(length) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset.charAt(randomIndex);
  }
  return randomString;
}

function runLogin(baseURL) {
  const url = baseURL+'/api/user/login';
  const payload = JSON.stringify({
    name: 'ahmed rizandy',
    password: 'zxcvbnm0'
  });

  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=UTF-8',
    'Origin': baseURL,
    'Referer': baseURL + '/login',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
  };

  const response = http.post(url, payload, { headers });
}

function runRegister(baseURL) {
  const url = baseURL + '/api/user/register';
  const payload = JSON.stringify({
    name: generateRandomString(10),
    email: generateRandomString(10)+"@email.com",
    password: generateRandomString(10),
  });

  const headers = {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=UTF-8',
    'Origin': baseURL,
    'Referer': baseURL + '/login',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
  };

  const response = http.post(url, payload, { headers });
}

export default function () {
  http.get("http://119.81.37.228:8080/api/catalogue/categories");
  runLogin(vmURL);
  runLogin(kubeURL)
  runRegister(vmURL);
  runRegister(kubeURL);
  sleep(1);
}

