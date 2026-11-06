const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uX2lkIjoieVNTaWdvN2g0eXY0amgyaTVEUGpwNFowazFQeTdSY0Y2X0NSS2ZkUTktcUhGOHNhVzE1XzQ4SzRuTzAyRnBfVm5mdzd3ckZIVjk5YmlfTU5KRU4xIiwidXNlcl9pZCI6MiwiZGF0YSI6eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInVzZXJuYW1lIjoibWl6YV9hZG1pbkBpb3RtaW5kLnZuIn0sImV4cCI6MTc5Mzg1MTEyNX0.kd3Rghn7_eK_K8uyx3SN40xL0aMRO_61uyopE4feMkk";

const url = "http://172.26.2.14/api/dashboard/tree/v2";
const getAPI = async () => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${Token}`,
    },
  });

  const data = response.json();

  return data;
};

const data = await getAPI();
console.log(data[0].children);
