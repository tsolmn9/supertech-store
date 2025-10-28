"use client";
import { User } from "lucide-react";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [lastName, setLastName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleLastNameValue = (e: { target: { value: string } }) => {
    setLastName(e.target.value);
  };
  const handleFirstNameValue = (e: { target: { value: string } }) => {
    setFirstName(e.target.value);
  };
  const handleEmailValue = (e: { target: { value: string } }) => {
    setEmail(e.target.value);
  };
  const handlePhoneNumberValue = (e: { target: { value: string } }) => {
    setPhoneNumber(e.target.value);
  };

  // const uptadeUser = async () => {
  //   const body = {
  //     lastname,
  //     firstname,
  //     email,
  //     phoneNumber,
  //   };
  //   await fetch("api/user/updateUser", {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   });
  // };

  return (
    <div className="bg-[rgb(245,235,220)] h-screen justify-center flex items-center">
      <div className="flex flex-col gap-3">
        <div className="text-[rgb(214,35,0)] text-[23px] font-extrabold uppercase">
          Миний бүртгэл
        </div>
        <div className="w-[928px] flex flex-col gap-5 text-[15px] text-[rgb(80,35,20)]">
          <div className="flex flex-col gap-[6px]">
            <div className="text-[rgb(80,35,20)] font-bold">Овог</div>
            <div className="border-solid border-[rgb(150,126,118)] border-[1px] bg-[rgb(255,255,255)] h-[45px] rounded-[9px] flex items-center gap-2">
              <User className="ml-2" />
              <div> | </div>
              <input
                className="focus:outline-none focus:border-none"
                placeholder="Овог"
                onChange={handleLastNameValue}
                value={lastName}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[6px]">
            <div className="text-[rgb(80,35,20)] font-bold">Нэр</div>
            <div className="border-solid border-[rgb(150,126,118)]  border-[1px] bg-[rgb(255,255,255)] h-[45px] rounded-[9px] flex items-center gap-2">
              <User className="ml-2" />
              <div> | </div>
              <input
                placeholder="Нэр"
                className="focus:outline-none focus:border-none"
                onChange={handleFirstNameValue}
                value={firstName}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[6px]">
            <div className="text-[rgb(80,35,20)] font-bold">И-мэйл хаяг</div>
            <div className="border-solid border-[rgb(150,126,118)] border-[1px] bg-[rgb(255,255,255)] h-[45px] rounded-[9px] flex items-center gap-2">
              <Mail className="ml-2" />
              <div> | </div>
              <input
                placeholder="И-мэйл хаяг"
                className="focus:outline-none focus:border-none"
                onChange={handleEmailValue}
                value={email}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[6px]">
            <div className=" font-bold">Утасны дугаар</div>
            <div className="border-solid border-[rgb(150,126,118)] border-[1px] bg-[rgb(255,255,255)] h-[45px] rounded-[9px] flex items-center gap-2">
              <Phone className="ml-2" />
              <div> | </div>
              <input
                placeholder="Утасны дугаар"
                className="focus:outline-none focus:border-none"
                onChange={handlePhoneNumberValue}
                value={phoneNumber}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <button className="bg-[rgb(214,35,0)] w-[100px] h-[35px] rounded-[8px] text-white ">
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
}
