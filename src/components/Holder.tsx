import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { identifierValidate } from "../utils/validators";

const validate = (value: string) => {
  let err;

  if (!value) err = "БИН/ИИН обязателен";
  else if (!identifierValidate(value)) {
    err = "БИН/ИИН состоит из 12 символов";
  }
  return err;
};

export const Holder = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Heading size="lg" mb={4}>
        Данные правообладателя
      </Heading>
      <Field name="holder_uin" validate={validate}>
        {({ field, form }: FieldProps) => (
          <FormControl
            isRequired
            mb={4}
            //@ts-ignore
            isInvalid={form.errors.identifier && form.touched.identifier}
          >
            <FormLabel>БИН/ИИН </FormLabel>

            <InputGroup
              size="lg"
              width="100%"
              display="flex"
              justifyContent="space-between"
            >
              <Input
                {...field}
                type="tel"
                maxLength={12}
                pattern="[0-9]*(.[0-9]+)?"
                placeholder="БИН/ИИН"
                width="auto"
                onChange={(e) => {
                  if (e.target.value.length === 0 || e.target.validity.valid) {
                    form.setFieldValue("holder_uin", e.target.value);
                  } else {
                    return;
                  }
                }}
              />
            </InputGroup>
            <FormErrorMessage>{form.errors.identifier}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <InputGroup>
        <Field name="holder_name" isRequired>
          {({ field }: FieldProps) => (
            <FormControl isRequired mb={2}>
              <FormLabel>Название компани или ФИО</FormLabel>
              <Input {...field} placeholder="Иван Иванов" fontSize="sm" />
            </FormControl>
          )}
        </Field>
        <Field name="holder_document" isRequired>
          {({ field }: FieldProps) => (
            <FormControl isRequired ml={2} mb={2}>
              <FormLabel>На основании</FormLabel>
              <Input {...field} placeholder="Устава" fontSize="sm" />
            </FormControl>
          )}
        </Field>
      </InputGroup>
      <InputGroup>
        <Field name="holder_company_type" isRequired>
          {({ field }: FieldProps) => (
            <FormControl isRequired mb={2}>
              <FormLabel>Подписант</FormLabel>
              <Input {...field} placeholder="АО/ТОО/ИП" fontSize="sm" />
            </FormControl>
          )}
        </Field>
      </InputGroup>
      <InputGroup>
        <Field name="holder_responsible" isRequired>
          {({ field }: FieldProps) => (
            <FormControl isRequired mb={2}>
              <FormLabel>Подписант</FormLabel>
              <Input {...field} placeholder="Физическое лицо" fontSize="sm" />
            </FormControl>
          )}
        </Field>
        <Field name="holder_responsible_role" isRequired>
          {({ field }: FieldProps) => (
            <FormControl isRequired mb={2} ml={2}>
              <FormLabel>Роль подписанта</FormLabel>
              <Input {...field} placeholder="Директор" fontSize="sm" />
            </FormControl>
          )}
        </Field>
      </InputGroup>
    </Box>
  );
};
