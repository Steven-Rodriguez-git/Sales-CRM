import { useContext } from "react";
import { ProspectsContext } from "@/context/ProspectsProvider";
import List from "./List";

export default function LeadsList({ leads }: { leads: any[] }) {
  const { filter, prospects } = useContext(ProspectsContext);

  const filteredLeads = leads.filter(({ document }) => !prospects[document]);

  return (
    <List
      title="Leads"
      data={filteredLeads}
      filter={filter}
      isProspect={false}
    />
  );
}
