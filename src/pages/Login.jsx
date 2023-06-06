import { PasswordInput, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useLoginMutation } from "../redux/api/Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/services/AuthSlice";
import { useForm } from "@mantine/form";
import { Loader } from "@mantine/core";

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();

  const nav = useNavigate();

  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: "kohtet123@gmail.com",
      password: "952524496",
    },

    validate: {
      password: (value) =>
        value.length < 8 ? "Password must have 8 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div className=" flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await login(values);
            dispatch(addUser({ user: data?.user, token: data?.token }));
            if (data?.success) {
              nav("/");
            }
          } catch (error) {
            console.log(error);
          }
        })}
        className=" w-96 flex flex-col gap-10 p-7 shadow-lg"
      >
        <div className=" mx-auto">
          <h1 className=" text-2xl text-gray-500 font-medium">Sign in</h1>
        </div>
        <TextInput
          name="email"
          variant="filled"
          placeholder="Enter your email..."
          {...form.getInputProps("email")}
        />
        <PasswordInput
          name="password"
          variant="filled"
          placeholder="Enter your password..."
          {...form.getInputProps("password")}
        />

        <button
          disabled={isLoading && true}
          type="submit"
          className=" rounded px-4 py-1 bg-blue-600 text-white hover:bg-blue-500"
        >
          {isLoading ? (
            <Loader className=" mx-auto block " color="dark" size="sm" />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
