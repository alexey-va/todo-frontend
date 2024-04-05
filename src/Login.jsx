import { credentials } from "./Signals.jsx";
import hasNonLatin1  from "./Utils.jsx";
import { useState } from "react";

export default function Login({ loadData }) {

  const [error, setError] = useState({
    errorLogin: false,
    message: "",
    errorPassword: false,
  });


  
  const handleLogin = () => {
    if (hasNonLatin1(document.getElementById("login").value) || hasNonLatin1(document.getElementById("password").value)) {
      setError({
        errorLogin:  true,
        errorPassword: true,
        message: "Логин и пароль должны содержать только латинские символы",
      });
      restartAnimation(document.getElementById("login"))
      restartAnimation(document.getElementById("password"))
      return;
    }

    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    credentials.value = {
      login: login,
      password: password,
    };
    loadData().then((result) => {
      if(result === true) return;
      setError({
        errorLogin:  true,
        errorPassword: true,
        message: "Неверный логин или пароль",
      });
      restartAnimation(document.getElementById("login"))
      restartAnimation(document.getElementById("password"))
    });
  };

  const handleRegister = () => {
    if (hasNonLatin1(document.getElementById("login").value) || hasNonLatin1(document.getElementById("password").value)) {
      setError({
        errorLogin:  true,
        errorPassword: true,
        message: "Логин и пароль должны содержать только латинские символы",
      });
      restartAnimation(document.getElementById("login"))
      restartAnimation(document.getElementById("password"))
      return;
    }

    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    fetch("https://todo-back.alexeyav.ru/api/v1/register", {
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
        if (response.status !== 200) {
          console.log("Login failed");
        }
        if(response.status === 418){
          setError({
            errorLogin:  true,
            errorPassword: false,
            message: "Пользователь с таким именем уже существует",
          });
          restartAnimation(document.getElementById("login"))
          return;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data === undefined || data === null) return;

        credentials.value = {
          login: login,
          password: password,
        };
        loadData();
      });
  };

  const restartAnimation = (element) => {
    element.classList.remove("animate-shake");
    void element.offsetWidth; // Trigger reflow to restart animation
    element.classList.add("animate-shake");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 w-[20rem]">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 text-center -mx-2">
            <div className="font-semibold text-red-400">
              {error.errorLogin || error.errorPassword ? error.message : ""}
            </div>
          </div>
          <label htmlFor="login" className="text-lg font-semibold">
            Логин
          </label>
          <input
            type="text"
            id="login"
            className={`col-span-2 h-[2rem] w-[10rem] rounded-md border bg-gray-100 px-2
            ${error.errorLogin ? "animate-shake border-red-500" : "border-gray-100"}`}
            placeholder="test"
            defaultValue={
              credentials.value.login ? credentials.value.login : ""
            }
          />

          <label htmlFor="login" className="text-lg font-semibold">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            className={`col-span-2 h-[2rem] w-[10rem] rounded-md border bg-gray-100 px-2
            ${error.errorPassword ? "animate-shake border-red-500" : "border-gray-100"}`}
            placeholder="123"
            defaultValue={
              credentials.value.password ? credentials.value.password : ""
            }
          />

          <button
            className="col-span-3 mt-2 rounded-md bg-blue-500 px-2 py-1 text-lg text-white hover:bg-blue-700 transition-all"
            onClick={() => handleLogin()}
          >
            Войти
          </button>
          <button
            className="col-span-3 -mt-2 rounded-md bg-gray-500 px-2 py-1 text-lg text-white hover:bg-gray-700 transition-all"
            onClick={() => handleRegister()}
          >
            Регистрация
          </button>
        </div>
      </div>
    </>
  );
}
