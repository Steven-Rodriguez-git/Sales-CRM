import { useContext } from "react";
import { ProspectsContext } from "@/context/ProspectsProvider";
import List from "./List";

export default function ProspectList({ leads }: { leads: any[] }) {
  const { filter, prospects } = useContext(ProspectsContext);


  const filteredProspects = leads.filter(({ document }) => prospects[document]);

  return (
    <List
      title="Prospects"
      data={filteredProspects}
      filter={filter}
      isProspect={true}
    />
  );
}
