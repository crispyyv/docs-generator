import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { Field, FieldProps, FormikValues } from "formik";
import { headers } from "../utils/api";
import { identifierValidate } from "../utils/validators";

const validate = (value: string) => {
  let err;

  if (!value) err = "БИН/ИИН обязателен";
  else if (!identifierValidate(value)) {
    err = "БИН/ИИН состоит из 12 символов";
  }
  return err;
};

export const Customer = () => {
  const searchHandler = async (form: FormikValues) => {
    const result = await fetch(
      `https://api.statsnet.co/api/global/company_by_identifier`,

      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...headers("drRN54UheELrwsNr2KjyAjBQKaU34RBc"),
        },
        body: JSON.stringify({
          identifier: form.values.customer_uin,
          type_code_id: [1, 2],
        }),
      }
    )
      .then((data) => data.json())
      .catch(console.error);
    if (result.data) {
      form.setValues({
        ...form.values,
        customer_name: result?.data?.name,
        customer_company_type: result?.data?.company_type,
        customer_responsible: result?.owners ? result.owners[0].full_name : "",
        customer_address: result?.data?.addresses
          ? result?.data?.addresses[0].full_address
          : "",
      });
    }
  };

  return (
    <Box>
      <Heading size="lg" mb={4}>
        Данные клиента
      </Heading>
      <Field name="customer_uin" validate={validate}>
        {({ field, form }: FieldProps) => (
          <FormControl
            isRequired
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
              <InputLeftElement children={<SearchIcon color="gray.300" />} />
              <Input
                {...field}
                type="tel"
                minLe
                maxLength={12}
                pattern="[0-9]*(.[0-9]+)?"
                placeholder="БИН/ИИН"
                pl={10}
                width="auto"
                onChange={(e) => {
                  if (e.target.value.length === 0 || e.target.validity.valid) {
                    form.setFieldValue("customer_uin", e.target.value);
                  } else {
                    return;
                  }
                }}
              />

              <Button
                size="lg"
                type="button"
                onClick={() => searchHandler(form)}
              >
                Заполнить автоматически
              </Button>
            </InputGroup>
            <FormErrorMessage>{form.errors.identifier}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <Box display="flex" mt={4} flexDirection="column">
        <Field name="customer_name" isRequired>
          {({ field }: FieldProps) => (
            <FormControl isRequired mb={2}>
              <FormLabel htmlFor="name">Название компании или ФИО</FormLabel>
              <Input
                {...field}
                placeholder="Казпочта"
                id="name"
                fontSize="sm"
              />
            </FormControl>
          )}
        </Field>
        <InputGroup>
          <Field name="customer_company_type" isRequired>
            {({ field }: FieldProps) => (
              <FormControl isRequired mb={2}>
                <FormLabel>Правовая форма</FormLabel>
                <Input {...field} placeholder="ТОО/АО/Филиал" fontSize="sm" />
              </FormControl>
            )}
          </Field>
          <Field name="customer_document" isRequired>
            {({ field }: FieldProps) => (
              <FormControl isRequired ml={2} mb={2}>
                <FormLabel>На основании</FormLabel>
                <Input {...field} placeholder="Устава" fontSize="sm" />
              </FormControl>
            )}
          </Field>
        </InputGroup>

        <InputGroup>
          <Field name="customer_responsible" isRequired>
            {({ field }: FieldProps) => (
              <FormControl isRequired mb={2}>
                <FormLabel>Подписант</FormLabel>
                <Input {...field} placeholder="Иван Иванов" fontSize="sm" />
              </FormControl>
            )}
          </Field>
          <Field name="customer_responsible_role" isRequired>
            {({ field }: FieldProps) => (
              <FormControl isRequired mb={2} ml={2}>
                <FormLabel>Роль подписанта</FormLabel>
                <Input {...field} placeholder="Директор" fontSize="sm" />
              </FormControl>
            )}
          </Field>
        </InputGroup>
        <InputGroup>
          <Field name="customer_address" isRequired>
            {({ field }: FieldProps) => (
              <FormControl isRequired mb={2}>
                <FormLabel>Адрес клиента</FormLabel>
                <Input
                  {...field}
                  placeholder="Нур-Султан, просп. Туран"
                  fontSize="sm"
                />
              </FormControl>
            )}
          </Field>
          <Field name="customer_phone" isRequired>
            {({ field }: FieldProps) => (
              <FormControl isRequired mb={2} ml={2}>
                <FormLabel>Телефон</FormLabel>
                <Input
                  {...field}
                  type="tel"
                  placeholder="870654321123"
                  fontSize="sm"
                />
              </FormControl>
            )}
          </Field>
        </InputGroup>
        <InputGroup>
          <Field name="customer_email" isRequired>
            {({ field }: FieldProps) => (
              <FormControl isRequired mb={2}>
                <FormLabel>E-mail</FormLabel>
                <Input {...field} placeholder="mail@kmc.kz" fontSize="sm" />
              </FormControl>
            )}
          </Field>
          <Field name="customer_iban" isRequired>
            {({ field }: FieldProps) => (
              <FormControl isRequired mb={2} ml={2}>
                <FormLabel>IBAN</FormLabel>
                <Input
                  {...field}
                  placeholder="KZ123456789123123"
                  fontSize="sm"
                />
              </FormControl>
            )}
          </Field>
        </InputGroup>
        <InputGroup>
          <Field name="customer_bank" isRequired>
            {({ field }: FieldProps) => (
              <FormControl isRequired mb={2}>
                <FormLabel>Название банка</FormLabel>
                <Input {...field} placeholder="Kaspi" fontSize="sm" />
              </FormControl>
            )}
          </Field>
          <Field name="customer_bic" isRequired>
            {({ field }: FieldProps) => (
              <FormControl isRequired mb={2} ml={2}>
                <FormLabel>БИК Банка</FormLabel>
                <Input {...field} placeholder="Kaspkzka" fontSize="sm" />
              </FormControl>
            )}
          </Field>
        </InputGroup>
      </Box>
    </Box>
  );
};
