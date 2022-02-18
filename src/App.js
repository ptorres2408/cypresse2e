import React, { useRef, useState } from "react";
import "./App.css";

import apiClient from "./http-common";

function App() {
  const post_title = useRef(null);
  const post_description = useRef(null);

  const [postLogin, setLoginResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  const clearLoginOutput = () => {
    setLoginResult(null);
  };

  async function login() {
    const postData = {
      email: post_title.current.value,
      password: post_description.current.value,
    };

    try {
      const res = await apiClient.post(
        "https://reqres.in/api/login",
        postData,
        {
          headers: {
            "x-access-token": "token-value",
          },
        }
      );

      const result = {
        status: res.status + " " + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setLoginResult(fortmatResponse(result));
    } catch (err) {
      setLoginResult(fortmatResponse(err.response?.data || err));
    }
  }

  return (
    <div id="app" className="container my-3">
      <h3>Mega Login Plus TriMax</h3>

      <div className="card mt-3">
        <div className="card-header">
          <code>eve.holt@reqres.in // cityslicka</code>
        </div>
        <div className="card-body">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              ref={post_title}
              placeholder="example@email.com"
              data-testid="email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              ref={post_description}
              placeholder="password_secret"
              data-testid="password"
            />
          </div>
          <button
            className="btn btn-sm btn-primary"
            onClick={login}
            data-testid="button-send"
          >
            Secure Login
          </button>
          <button
            className="btn btn-sm btn-warning ml-2"
            onClick={clearLoginOutput}
          >
            Clear
          </button>

          {postLogin && (
            <div
              className="alert alert-secondary mt-2"
              role="alert"
              data-testid="resume"
            >
              <pre>{postLogin}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
