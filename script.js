import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get("http://119.81.37.230:8080/api/catalogue/categories");
  sleep(1);
}

