"use client";

import styled from "styled-components";
import ProspectCard from "./_components/molecules/ProspectCard";
import leads from "../_data/leads.json";
import { useState } from "react";
import {
  ProspectsContext,
  ProspectsProvider,
} from "./providers/ProspectsProvider";
import Header from "./_components/molecules/Header";

const ParentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  max-width: 80vw;
`;

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espacio entre las columnas */

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const Column = styled.div`
  flex: 1;
`;

const TitleLead = styled.h2`
  color: #4e7eff;
  font-size: 1.5rem;
  line-height: 1.875rem;
  font-weight: 700;
`;

const TitleProspect = styled.h2`
  color: #01af02;
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
            <Header />
            <ColumnsContainer>
              <Column>
                <TitleLead>Leads</TitleLead>
                {leads.leads
                  .filter((lead) => !prospectsValue.prospects[lead.document])
                  .map((lead) => (
                    <ProspectCard {...lead} key={lead.document} />
                  ))}
              </Column>
              <Column>
                <TitleProspect>Prospects</TitleProspect>
                {leads.leads
                  .filter((lead) => prospectsValue.prospects[lead.document])
                  .map((lead) => (
                    <ProspectCard {...lead} key={lead.document} />
                  ))}
              </Column>
            </ColumnsContainer>
          </ParentContainer>
        )}
      </ProspectsContext.Consumer>
    </ProspectsProvider>
  );
}
