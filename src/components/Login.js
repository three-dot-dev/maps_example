import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data2) => {
    const loginData = {
      email: data2.emailInput,
      password: data2.passwordInput,
    };

    const res = await axios({
      method: "POST",
      url: "https://ancient-spire-87228.herokuapp.com/api/operator/login",
      data: loginData,
    });

    const data = await res.data;
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="emailInput" type="text" ref={register()} />
        <input name="passwordInput" type="text" ref={register} />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
}
