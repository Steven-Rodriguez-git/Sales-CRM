import { useContext, useEffect, useState } from "react";
import { useProspectValidation } from "../hooks/useValidation";
import Card from "../atoms/Card";
import { type Prospect } from "../../../types/Prospect";
import { ProspectsContext } from "../../providers/ProspectsProvider";
import { VALIDATION_STATUS } from "@/app/types/validationStatus";

export default function ProspectCard(prospect: Prospect) {
  const { prospects, addNewProspect } = useContext(ProspectsContext);
  const [shouldValidate, setShouldValidate] = useState(false);
  function toggleShouldValidate() {
    setShouldValidate(true);
  }
  const { backgroundValidation, identityValidation, scoreValidation } =
    useProspectValidation(prospect, shouldValidate);

  useEffect(() => {
    if (
      backgroundValidation === VALIDATION_STATUS.SUCCESS &&
      identityValidation === VALIDATION_STATUS.SUCCESS &&
      scoreValidation === VALIDATION_STATUS.SUCCESS
    ) {
      addNewProspect(prospect.document);
    }
  }, [
    backgroundValidation,
    identityValidation,
    scoreValidation,
    prospect.document,
    addNewProspect,
  ]);

  return (
    <Card
      {...prospect}
      backgroundValidation={
        prospects[prospect.document]
          ? VALIDATION_STATUS.SUCCESS
          : backgroundValidation
      }
      identityValidation={
        prospects[prospect.document]
          ? VALIDATION_STATUS.SUCCESS
          : identityValidation
      }
      scoreValidation={
        prospects[prospect.document]
          ? VALIDATION_STATUS.SUCCESS
          : scoreValidation
      }
      isAlreadyValidated={shouldValidate || !!prospects[prospect.document]}
      onButtonClick={toggleShouldValidate}
    />
  );
}
