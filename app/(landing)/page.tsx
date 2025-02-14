"use client";

import styled from "styled-components";
import ProspectCard from "./_components/molecules/ProspectCard";
import leads from "../_data/leads.json";
import {
  ProspectsContext,
  ProspectsProvider,
} from "./providers/ProspectsProvider";
import Header from "./_components/molecules/Header";
import SearchBar from "./_components/molecules/SearchBar";
import { useMemo } from "react";
import ProspectList from "./_components/molecules/ProspectList";
import LeadsList from "./_components/molecules/LeadsList";

const ParentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  max-width: 80vw;
`;

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const Column = styled.div`
  flex: 1;
`;

export default function Home() {
  return (
    <ProspectsProvider>
      <ParentContainer>
        <Header />
        <SearchBar />
        <ColumnsContainer>
          <Column>
            <LeadsList leads={leads.leads} />
          </Column>
          <Column>
            <ProspectList leads={leads.leads} />
          </Column>
        </ColumnsContainer>
      </ParentContainer>
    </ProspectsProvider>
  );
}
