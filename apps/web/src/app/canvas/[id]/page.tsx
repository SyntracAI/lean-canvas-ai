import { Body } from './_ui/components/Body';
import { Widget } from './_ui/components/Widget';

interface PageProps {
  params: {
    id: string;
  };
}
export default async function Page({ params }: PageProps) {
  return (
    <>
      <div className="flex min-h-screen w-full items-center justify-center">
        <Body id={params.id} />
      </div>
      <Widget />
    </>
  );
}
