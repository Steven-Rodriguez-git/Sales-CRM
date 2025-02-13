"use client";

import styled from "styled-components";
import ProspectCard from "./_components/molecules/ProspectCard";
import leads from "../_data/leads.json";
import { useState } from "react";
import {
  ProspectsContext,
  ProspectsProvider,
} from "./providers/ProspectsProvider";

const ParentContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  line-height: 1.875rem;
  font-weight: 700;
`;

export default function Home() {
  return (
    <ProspectsProvider>
      <ProspectsContext.Consumer>
        {(prospectsValue) => (
          <ParentContainer>
            <Title>Prospects</Title>
            {leads.leads
              .filter((lead) => prospectsValue.prospects[lead.document])
              .map((lead) => (
                <ProspectCard {...lead} key={lead.document} />
              ))}
            <Title>Leads</Title>
            {leads.leads
              .filter((lead) => !prospectsValue.prospects[lead.document])
              .map((lead) => (
                <ProspectCard {...lead} key={lead.document} />
              ))}
          </ParentContainer>
        )}
      </ProspectsContext.Consumer>
    </ProspectsProvider>
  );
}
