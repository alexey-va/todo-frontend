import { credentials } from "./Signals.jsx";
import { useState } from "react";

export default function Login({ loadData }) {

  const [incorrect, setIncorrect] = useState(false);
  
  const handleLogin = () => {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    credentials.value = {
      login: login,
      password: password,
    };
    loadData().then((result) => {
      setIncorrect(!result)
    });
  };

  const handleRegister = () => {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    fetch("http://localhost:9090/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: login,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          console.log("Login failed");
          return;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data === undefined || data === null) {
          console.log("Login failed");
          return;
        }
        console.log("Login success");
        credentials.value = {
          login: login,
          password: password,
        };
        loadData();
      });
  };

  return (
    <>
      <div className="flex items-center justify-center rounded-lg bg-white p-8">
        <div className="grid grid-cols-3  gap-4">
          <label htmlFor="login" className="text-lg font-semibold">
            Логин
          </label>
          <input
            type="text"
            id="login"
            className={`col-span-2 h-[2rem] w-[10rem] rounded-md border bg-gray-100 px-2
            ${incorrect ? "border-red-500" : "border-gray-100"}`}
            placeholder="Что угодно"
          />

          <label htmlFor="login" className="text-lg font-semibold">
            Пароль
          </label>
          <input
            type="text"
            id="password"
            className={`col-span-2 h-[2rem] w-[10rem] rounded-md border bg-gray-100 px-2
            ${incorrect ? "border-red-500" : "border-gray-100"}`}
            placeholder="что угодно"
          />

          <button
            className="col-span-3 mt-2 rounded-md bg-blue-500 px-2 py-1 text-lg text-white"
            onClick={() => handleLogin()}
          >
            Войти
          </button>
          <button
            className="col-span-3 -mt-2 rounded-md bg-red-700 px-2 py-1 text-lg text-white"
            onClick={() => handleRegister()}
          >
            Регистрация
          </button>
        </div>
      </div>
    </>
  );
}
