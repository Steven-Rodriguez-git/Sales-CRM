import { createContext, ReactNode, useState } from "react";

export const ProspectsContext = createContext({
  prospects: {} as Record<number, boolean>,
  addNewProspect: (_id: number) => {},
});

export function ProspectsProvider({ children }: { children: ReactNode }) {
  const [prospects, setProspects] = useState<Record<number, boolean>>({});
  return (
    <ProspectsContext.Provider
      value={{
        prospects: prospects,
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
