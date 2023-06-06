import { PasswordInput, TextInput } from "@mantine/core";
import { Loader } from '@mantine/core';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/Auth";
import { useForm } from "@mantine/form";

const Register = () => {

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      password: (value) =>
        value.length < 8 ? "Password must have 8 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const nav = useNavigate();

  const [register,{isFetching,isLoading}] = useRegisterMutation();


  //   try {
  //     e.preventDefault();
  //     const user = { name, email, password, password_confirmation };
  //     const { data } = await register(user);
  //     // console.log(data);
  //     if (data?.success === true) {
  //       nav("/login");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className=" flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) =>{
          try {
            
            const {data} = await register(values)
            if(data?.success){
              nav("/login")
            }
          } catch (error) {
            console.log(error)
          }
        })}
        className=" w-96 flex flex-col gap-10 p-7 shadow-lg"
      >
        <div className="mx-auto">
          <h1 className=" text-2xl text-gray-500 font-medium">Register</h1>
        </div>
        <TextInput
          name="name"
          variant="filled"
          placeholder="Enter your name..."
          {...form.getInputProps("name")}
        />
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
        <PasswordInput
          name="password_confirmation"
          variant="filled"
          placeholder="Confirm your password..."
          {...form.getInputProps("password_confirmation")}
        />
        <div className=" flex gap-3">
          <p className=" select-none text-gray-500">Already have an account?</p>
          <Link to={"/login"}>
            <p className=" cursor-pointer select-none text-blue-600 hover:text-blue-500">
              Login
            </p>
          </Link>
        </div>
        <button
          disabled={isLoading && true}
          type="submit"
          className=" flex justify-center rounded px-4 py-1 bg-blue-600 text-white hover:bg-blue-500"
        >
          {isLoading ? (<Loader className=" " color="dark" size="sm" />) : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Register;
