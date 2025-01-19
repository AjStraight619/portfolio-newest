"use client";

import React, { useRef, useState } from "react";
import SectionHeading from "./ui/section-heading";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { sendEmail } from "@/actions/email";
import { MailCheckIcon, MailWarningIcon, SendIcon } from "lucide-react";
import SubmitButton from "./ui/submit-button";
import { toast } from "sonner";

const Contact = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const sendMessage = async (formData: FormData) => {
    if (!formRef.current) return;
    const result = await sendEmail(formData);
    const { error, success } = result;
    if (error) {
      console.log("Error: ", error);
      toast.error(<ErrorToast error={error} />, {
        className:
          "bg-gradient-to-r from-zinc-900 from-10% via-rose-900 via-30% to-zinc-900 to-90% border-zinc-900",
      });
    } else {
      console.log("Success: ", success);
      toast.success(<SuccessToast />, {
        className:
          "bg-gradient-to-r from-zinc-700 from-10% via-emerald-800 via-30% to-zinc-700 to-90%  border-zinc-900",
      });
    }
    formRef.current.reset();
  };

  return (
    <section id="contact" className="scroll-mt-6 mb-12 pb-6 mt-12">
      <SectionHeading>
        Contact <span className="text-purple-300">Me.</span>
      </SectionHeading>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Contact Me</CardTitle>
          <CardDescription>
            Contact me through this email{" "}
            <span>
              {" "}
              <a
                className="text-purple-300 hover:underline underline-offset-2"
                href="mailto:Ajstraight619@gmail.com"
              >
                AlexStraight619@gmail.com
              </a>
              , or directly through this form.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} className="space-y-4" action={sendMessage}>
            <div className="space-y-1">
              <Label htmlFor="senderEmail">Email</Label>
              <Input
                type="email"
                name="senderEmail"
                placeholder="JohnDoe@anonymous.xyz"
              />
              <Label className="mt-1" htmlFor="message">
                Message
              </Label>
              <Textarea name="message" placeholder="Message..." />
            </div>
            <SubmitButton>
              Send <SendIcon className="ml-2 w-4 h-4" />
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Contact;

const SuccessToast = () => (
  <div className="inline-flex">
    <MailCheckIcon className="w-6 h-6 mr-2 text-emerald-600" />{" "}
    <p className="text-white font-semibold">I will get back to you soon!</p>
  </div>
);

const ErrorToast = (props: { error: string }) => (
  <div className="inline-flex">
    <MailWarningIcon className="w-6 h-6 mr-2 text-rose-900" />{" "}
    <p className="text-white font-semibold">
      {props.error ? (
        props.error
      ) : (
        <span>
          {" "}
          Something went wrong, use the email link in the description instead.
        </span>
      )}
    </p>
  </div>
);
