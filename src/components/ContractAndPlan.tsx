import {
  Box,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import DatePicker from "react-datepicker";
import "../styles/date-picker.css";

const StyledDatepicker = chakra(DatePicker);

export const ContractAndPlan = () => {
  return (
    <Box>
      <Heading size="lg" mb={4}>
        Договор
      </Heading>
      <InputGroup>
        <Field name="contract_number" isRequired>
          {({ field }: FieldProps) => (
            <FormControl isRequired mb={2}>
              <FormLabel>Номер договора и счета на оплату</FormLabel>
              <Input {...field} placeholder="12-5Б" fontSize="sm" />
            </FormControl>
          )}
        </Field>
        <Field name="contract_date" isRequired>
          {({ field, form }: FieldProps) => (
            <FormControl isRequired mb={2} ml={2}>
              <FormLabel>Дата договора и прочих документов</FormLabel>
              <StyledDatepicker
                {...field}
                bgColor="transparent"
                width="100%"
                fontSize="sm"
                placeholder="12.01.2021"
                onSelect={() => field.value}
                onChange={(e) => {
                  form.setFieldValue(
                    "contract_date",
                    (e as Date)?.toLocaleDateString().replaceAll("/", ".")
                  );
                }}
              />
              {/* <Input {...field} placeholder="12.01.2021" fontSize="sm" /> */}
            </FormControl>
          )}
        </Field>
      </InputGroup>
      <InputGroup>
        <Field name="contract_trademark_name" isRequired>
          {({ field }: FieldProps) => (
            <FormControl isRequired mb={2}>
              <FormLabel>Название товарного знака</FormLabel>
              <Input {...field} placeholder="Казахмыс" fontSize="sm" />
            </FormControl>
          )}
        </Field>
        <Field name="contract_payment_term" isRequired>
          {({ field }: FieldProps) => (
            <FormControl isRequired mb={2} ml={2}>
              <FormLabel>Условия оплаты</FormLabel>
              <Input
                {...field}
                placeholder="Вариант 1. Предоплата 10%"
                fontSize="sm"
              />
            </FormControl>
          )}
        </Field>
      </InputGroup>
      <Heading size="md" my={4}>
        Тариф
      </Heading>
      <InputGroup>
        <Field name="plan_name" isRequired>
          {({ field }: FieldProps) => (
            <FormControl isRequired mb={2}>
              <FormLabel>Название тарифа</FormLabel>
              <Input {...field} placeholder="Корпоративный" fontSize="sm" />
            </FormControl>
          )}
        </Field>
        <Field name="plan_period" isRequired>
          {({ field }: FieldProps) => (
            <FormControl isRequired mb={2} ml={2}>
              <FormLabel>Срок</FormLabel>
              <Input {...field} placeholder="300 дней" fontSize="sm" />
            </FormControl>
          )}
        </Field>
        <Field name="plan_price" isRequired>
          {({ field }: FieldProps) => (
            <FormControl isRequired mb={2} ml={2}>
              <FormLabel>Стоимость</FormLabel>
              <Input {...field} placeholder="1 200 000" fontSize="sm" />
            </FormControl>
          )}
        </Field>
      </InputGroup>
      <InputGroup>
        <Field name="plan_amount" isRequired>
          {({ field }: FieldProps) => (
            <FormControl isRequired mb={2}>
              <FormLabel>Количество</FormLabel>
              <Input {...field} placeholder="1" fontSize="sm" />
            </FormControl>
          )}
        </Field>
        <Field name="plan_cost" isRequired>
          {({ field, form }: FieldProps) => (
            <FormControl isRequired mb={2} ml={2}>
              <FormLabel>Сумма договора</FormLabel>
              <Input
                {...field}
                placeholder="1 200 000"
                value={
                  (form.values.plan_price || 1) * (form.values.plan_amount || 1)
                }
                fontSize="sm"
              />
            </FormControl>
          )}
        </Field>
        <Field name="plan_cost_letters" isRequired>
          {({ field }: FieldProps) => (
            <FormControl isRequired mb={2} ml={2}>
              <FormLabel>Стоимость описанная буквами</FormLabel>
              <Input
                {...field}
                placeholder="Один миллион двести тысяч"
                fontSize="sm"
              />
            </FormControl>
          )}
        </Field>
      </InputGroup>
    </Box>
  );
};
