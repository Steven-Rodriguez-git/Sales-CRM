import { createContext, ReactNode, useState } from "react";

export const ProspectsContext = createContext({
  filter: "",
  setFilter: (_filter: string) => {},
  prospects: {} as Record<number, boolean>,
  addNewProspect: (_id: number) => {},
});

export function ProspectsProvider({ children }: { children: ReactNode }) {
  const [prospects, setProspects] = useState<Record<number, boolean>>({});
  const [filter, setFilter] = useState<string>("");
  return (
    <ProspectsContext.Provider
      value={{
        prospects: prospects,
        filter,
        setFilter,
        addNewProspect: (id: number) => {
          if (!prospects[id]) {
            setProspects((prev) => ({ ...prev, [id]: true }));
          }
        },
      }}
    >
      {children}
    </ProspectsContext.Provider>
  );
}
