import React from 'react';
import SectionHeading from './ui/section-heading';
import { Input } from './ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { sendEmail } from '@/actions/email';
import { Button } from './ui/button';
import { SendIcon } from 'lucide-react';
import SubmitButton from './ui/submit-button';

const Contact = () => {
  return (
    <section id="contact" className="scroll-mt-6 mb-12 pb-6 mt-12 w-full">
      <SectionHeading>
        Contact <span className="text-purple-300">Me.</span>
      </SectionHeading>
      <Card>
        <CardHeader>
          <CardTitle>Contact Me</CardTitle>
          <CardDescription>
            Contact me through this email{' '}
            <span>
              {' '}
              <a
                className="text-purple-300 underline underline-offset-2"
                href="mailto:Ajstraight619@gmail.com"
              >
                Ajstraight619@gmail.com
              </a>
              , or directly through this form.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action={sendEmail}>
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
