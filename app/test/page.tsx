import AutoScrollContent from '@/components/ui/auto-scroll-content';
import AutoScrollText from '@/components/ui/auto-scroll-text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const TestPage = () => {
  return (
    <div className="flex items-center justify-center h-screen mx-auto container">
      <Card>
        <CardHeader>
          <CardTitle>Test Auto Scroll</CardTitle>
        </CardHeader>
        <CardContent className="max-w-lg w-full h-[10rem]">
          <AutoScrollContent
            text="My primary interest lies in front-end development, where I enjoy
          creating intuitive and dynamic user interfaces. However, as I have
          gained experience with Go, I have also developed a strong interest in
          backend development. This dual focus allows me to appreciate the full
          spectrum of software development, from designing seamless user
          experiences to building robust and scalable server-side applications.
          Additionally, I am excited about exploring areas such as cloud
          computing and DevOps, where I can leverage my skills in both front-end
          and back-end development to create comprehensive and efficient
          solutions."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TestPage;
