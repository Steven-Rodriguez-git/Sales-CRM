"use client";

import styled from "styled-components";

import leads from "@/data/leads.json";
import {

  ProspectsProvider,
} from "@/context/ProspectsProvider";
import Header from "@/components/molecules/Header";
import SearchBar from "@/components/molecules/SearchBar";

import ProspectList from "@/components/organism/ProspectList";
import LeadsList from "@/components/organism/LeadsList";

export default function Home() {
  return (
    <ProspectsProvider>
      <ParentContainer>
        <Header text="SALES" />
        <SearchBar placeholder="Find by name or document" text="Filter:" />
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
