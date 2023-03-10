import {useEffect, useState} from "react";
import {Error} from "../../types/errors/Error";
import { MANDATORY_FIELD_EMPTY } from "../../types/errors/MandatoryFieldsErrors";
import {STREET_NUMBER_NOT_VALID} from "../../types/errors/StreetNumberErrors";

export const useStreetNumberValidator = (streetNumber: string) => {
  const [errors, setErrors] = useState<Error[]>([]);

  const validateStreetNumber = (number: string): boolean => {
    return /^[0-9]+$/.test(number)
  };

  useEffect(() => {
    if (streetNumber === '' && errors.indexOf(MANDATORY_FIELD_EMPTY) === -1) {
      setErrors((prevErrors) => {
        return [...prevErrors, MANDATORY_FIELD_EMPTY]
      });
    } else if (streetNumber && errors.indexOf(MANDATORY_FIELD_EMPTY) !== -1) {
      setErrors((prevErrors) => {
        return prevErrors.filter((error) => error !== MANDATORY_FIELD_EMPTY)
      });
    }

    if (!validateStreetNumber(streetNumber) && errors.indexOf(STREET_NUMBER_NOT_VALID) === -1) {
      setErrors((prevErrors) => {
        return [...prevErrors, STREET_NUMBER_NOT_VALID]
      });
    } else if (validateStreetNumber(streetNumber) && errors.indexOf(STREET_NUMBER_NOT_VALID) !== -1) {
      console.log('useEmailValidator: email is valid');
      setErrors((prevErrors) => {
        return prevErrors.filter((error) => error !== STREET_NUMBER_NOT_VALID)
      });
    }
  }, [streetNumber]);

  return errors;
}


