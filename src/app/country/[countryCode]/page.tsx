import { Company } from "@/components/Company/Company";

interface Props {
    params: {
        countryCode: string;
    };
}


export default function Country({ params: { countryCode } }: Props) {
  return (
      <section>
          <Company countryCode={countryCode} />
      </section>
  );
}