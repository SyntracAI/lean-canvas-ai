'use client';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@syntrac/frontend-web-ui';
import { useQuery } from '@tanstack/react-query';
import { Section } from '../Section';

interface BodyProps {
  id: string;
}
export const Body = ({ id }: BodyProps) => {
  const { data } = useQuery({
    queryKey: ['canvas', id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:8082/canvas/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await res.json();
    },
  });

  return (
    <ResizablePanelGroup direction="vertical" className="min-h-[90vh]">
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20}>
            <Section jsonKey="problem" title="Problem" data={data} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={20}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50}>
                <Section jsonKey="solution" title="Solution" data={data} />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <Section jsonKey="keyMetrics" title="Key Metrics" data={data} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={20}>
            <Section
              jsonKey="uniqueValueProposition"
              title="Unique Value Propositions"
              data={data}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={20}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={50}>
                <Section
                  jsonKey="unfairAdvantages"
                  title="Unfair Advantages"
                  data={data}
                />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <Section jsonKey="channels" title="Channels" data={data} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={20}>
            <Section
              jsonKey="customerSegments"
              title="Customer Segments"
              data={data}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={30}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            <Section
              jsonKey="costStructures"
              title="Cost Structure"
              data={data}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <Section
              jsonKey="revenueStreams"
              title="Revenue Streams"
              data={data}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
