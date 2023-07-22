"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/ui/input";
import { Loading } from "@/ui/loading";

const Code = () => {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const [code5, setCode5] = useState("");
  const [code6, setCode6] = useState("");

  const code1Ref = useRef<HTMLInputElement>(null);
  const code2Ref = useRef<HTMLInputElement>(null);
  const code3Ref = useRef<HTMLInputElement>(null);
  const code4Ref = useRef<HTMLInputElement>(null);
  const code5Ref = useRef<HTMLInputElement>(null);
  const code6Ref = useRef<HTMLInputElement>(null);

  const [pending, setPending] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const submit = async (code6value: string) => {
    setPending(true);
    const code = [code1, code2, code3, code4, code5, code6value].join("");

    console.log([code1, code2, code3, code4, code5, code6value]);
    console.log([code1, code2, code3, code4, code5, code6value].join());

    const email = searchParams.get("email");
    if (!email) throw new Error("No email provided");

    const response = await fetch(
      `/api/auth/callback/email?token=${code}&email=${encodeURIComponent(
        email
      )}`
    );

    if (response.status !== 200) console.error("Error");
    else {
      router.refresh();
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex space-x-2 justify-center mt-6">
      {pending ? (
        <Loading size="sm" />
      ) : (
        <>
          <Input
            type="text"
            maxLength={1}
            name="code1"
            id="code1"
            onPaste={(e) => {
              e.preventDefault();
              const codeValues = e.clipboardData.getData("text");
              setCode1(codeValues.charAt(0));
              setCode2(codeValues.charAt(1));
              setCode3(codeValues.charAt(2));
              setCode4(codeValues.charAt(3));
              setCode5(codeValues.charAt(4));
              setCode6(codeValues.charAt(5));
              submit(codeValues.charAt(5));
            }}
            className="w-10 text-center"
            ref={code1Ref}
            value={code1}
            onChange={(e) => {
              setCode1(e.currentTarget.value);
              code2Ref.current?.focus();
            }}
          />
          <Input
            type="text"
            name="code2"
            id="code2"
            className="w-10 text-center"
            ref={code2Ref}
            value={code2}
            onChange={(e) => {
              setCode2(e.currentTarget.value);
              code3Ref.current?.focus();
            }}
          />
          <Input
            type="text"
            name="code3"
            id="code3"
            className="w-10 text-center"
            ref={code3Ref}
            value={code3}
            onChange={(e) => {
              setCode3(e.currentTarget.value);
              code4Ref.current?.focus();
            }}
          />
          <Input
            type="text"
            name="code4"
            id="code4"
            className="w-10 text-center"
            ref={code4Ref}
            value={code4}
            onChange={(e) => {
              setCode4(e.currentTarget.value);
              code5Ref.current?.focus();
            }}
          />
          <Input
            type="text"
            name="code5"
            id="code5"
            className="w-10 text-center"
            ref={code5Ref}
            value={code5}
            onChange={(e) => {
              setCode5(e.currentTarget.value);
              code6Ref.current?.focus();
            }}
          />
          <Input
            type="text"
            name="code6"
            id="code6"
            className="w-10 text-center"
            ref={code6Ref}
            value={code6}
            onChange={async (e) => {
              setCode6(e.currentTarget.value);
              await submit(e.currentTarget.value);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Code;
