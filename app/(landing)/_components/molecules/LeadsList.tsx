import { useContext, useMemo } from "react";
import { Prospect } from "../../../types/Prospect";
import { ProspectsContext } from "../../providers/ProspectsProvider";
import ProspectCard from "./ProspectCard";
import styled from "styled-components";

interface Props {
  leads: Prospect[];
}

const TitleLead = styled.h2`
  color: #4e7eff;
  font-size: 1.5rem;
  line-height: 1.875rem;
  font-weight: 700;
`;

const EmptyLeadsList = styled.h3`
  font-size: 1.25rem;
  line-height: 1.4rem;
  font-weight: 500;
  color: #808a93;
  text-align: center;
`;

export default function LeadsList({ leads }: Props) {
  const { filter, prospects } = useContext(ProspectsContext);
  const leadList = useMemo(() => {
    return leads
      .filter(
        ({ name, document }) =>
          !filter ||
          name.toLowerCase().includes(filter.toLowerCase()) ||
          document.toString().toLowerCase().includes(filter.toLowerCase())
      )
      .filter((lead) => !prospects[lead.document]);
  }, [filter, leads, prospects]);
  return (
    <>
      <TitleLead>Leads</TitleLead>
      {!!leadList.length &&
        leadList.map((lead) => <ProspectCard {...lead} key={lead.document} />)}
      {!leadList.length && (
        <EmptyLeadsList>There are no leads to show</EmptyLeadsList>
      )}
    </>
  );
}
