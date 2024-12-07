import React, { useState } from "react";

function Login() {
  const [identifier, setIdentifier] = "";
  const [password, setPassword] = "";
  return (
    <>
      <form onSubmit={console.log(identifier, password)}>
        <label>9
          <input
            type="text"
            onChange={(e) => {
              setIdentifier(e.target.value);
            }}
          ></input>
        </label>
        <label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Login;
