import { useContext, useEffect, useState } from "react";
import { useProspectValidation } from "@/hooks/useValidation";
import Card from "./Card";
import { type Prospect } from "@/types/Prospect";
import { ProspectsContext } from "@/context/ProspectsProvider";
import { VALIDATION_STATUS } from "@/types/validationStatus";
import React, { memo } from "react";

const Cards = memo(function Cards(prospect: Prospect) {
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

const getValidationStatus = (validation: VALIDATION_STATUS) =>
  prospects[prospect.document] ? VALIDATION_STATUS.SUCCESS : validation;

const isAlreadyValidated =
  shouldValidate || !!(prospects[prospect.document] ?? false);

return (
  <Card
    {...prospect}
    backgroundValidation={getValidationStatus(backgroundValidation)}
    identityValidation={getValidationStatus(identityValidation)}
    scoreValidation={getValidationStatus(scoreValidation)}
    isAlreadyValidated={isAlreadyValidated}
    onButtonClick={toggleShouldValidate}
  />
);
});

export default Cards;
