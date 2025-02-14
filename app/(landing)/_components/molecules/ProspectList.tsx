import { useContext, useMemo } from "react";
import { Prospect } from "../../../types/Prospect";
import styled from "styled-components";
import { ProspectsContext } from "../../providers/ProspectsProvider";
import ProspectCard from "./ProspectCard";

const TitleProspect = styled.h2`
  color: #01af02;
  font-size: 1.5rem;
  line-height: 1.875rem;
  font-weight: 700;
`;

const EmptyProspectList = styled.h3`
  font-size: 1.25rem;
  line-height: 1.4rem;
  font-weight: 500;
  color: #808a93;
  text-align: center;
`;

interface Props {
  leads: Prospect[];
}

export default function ProspectList({ leads }: Props) {
  const { filter, prospects } = useContext(ProspectsContext);
  const prospectList = useMemo(() => {
    return leads
      .filter(
        ({ name, document }) =>
          !filter ||
          name.toLowerCase().includes(filter.toLowerCase()) ||
          document.toString().toLowerCase().includes(filter.toLowerCase())
      )
      .filter((lead) => prospects[lead.document]);
  }, [filter, leads, prospects]);
  return (
    <>
      <TitleProspect>Prospects</TitleProspect>
      {!!prospectList.length &&
        prospectList.map((lead) => (
          <ProspectCard {...lead} key={lead.document} />
        ))}
      {!prospectList.length && (
        <EmptyProspectList>There are no prospects to show</EmptyProspectList>
      )}
    </>
  );
}
