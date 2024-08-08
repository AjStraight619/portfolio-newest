import AutoScrollContent from '@/components/ui/auto-scroll-content';
import AutoScrollText from '@/components/ui/auto-scroll-text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VerticalTimeline from '@/components/ui/vertical-timeline';
import { experiencesData } from '@/lib/data';
import React from 'react';

const TestPage = () => {
  return (
    <div className="min-h-screen flex justify-center p-12">
      <VerticalTimeline />
    </div>
  );
};

export default TestPage;
