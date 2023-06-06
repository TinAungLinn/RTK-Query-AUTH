import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import React from "react";
import { useCreateContactMutation } from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const CreateContact = () => {
  const token = Cookies.get("token");
  const [createContact, { isLoading }] = useCreateContactMutation();

  console.log(token)

  const nav = useNavigate()

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: hasLength({ min: 9, max: 11 }),
      address: (value) => (value.length < 3 ? "Address cann't defined" : null),
    },
  });

  return (
    <div className=" flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await createContact({ token, data: values });
            if(data?.success){
                nav("/")
            }
          } catch (error) {
            console.log(error);
          }
        })}
        className=" w-96 flex flex-col gap-10 p-7 shadow-lg"
      >
        <div className=" mx-auto">
          <h1 className=" text-2xl text-gray-500 font-medium">
            Create Contact
          </h1>
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
        <TextInput
          name="phone"
          variant="filled"
          placeholder="Enter your phone..."
          {...form.getInputProps("phone")}
        />
        <TextInput
          name="address"
          variant="filled"
          placeholder="Enter your address..."
          {...form.getInputProps("address")}
        />

        <button
          disabled={isLoading && true}
          type="submit"
          className=" rounded px-4 py-1 bg-blue-600 text-white hover:bg-blue-500"
        >
          {isLoading ? (
            <Loader className=" mx-auto block " color="dark" size="sm" />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateContact;
