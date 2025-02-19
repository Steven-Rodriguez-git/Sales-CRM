import { useContext, useEffect, useState } from "react";
import OutlinedInput from "../atoms/OutlinedInput";
import { ProspectsContext } from "@/context/ProspectsProvider";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchBar() {
  const context = useContext(ProspectsContext);
  const [inputText, setInputText] = useState("");
  const debounceValue = useDebounce(inputText, 300);
  useEffect(() => {
    console.log("Debounced:", debounceValue);
    context.setFilter(debounceValue);
  }, [debounceValue, context]);

  return <OutlinedInput handleOnChange={setInputText} />;
}
