import { useContext, useEffect, useState } from "react";
import OutlinedInput from "../atoms/OutlinedInput";
import { ProspectsContext } from "@/context/ProspectsProvider";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps {
  placeholder: string;
  text: string;
}

export default function SearchBar({ placeholder, text }: SearchBarProps) {
  const context = useContext(ProspectsContext);
  const [inputText, setInputText] = useState("");
  const debounceValue = useDebounce(inputText, 300);

  useEffect(() => {
    console.log("Debounced:", debounceValue);
    context.setFilter(debounceValue);
  }, [debounceValue, context]);

  return <OutlinedInput handleOnChange={setInputText} placeholder={placeholder} text={text} />;
}
