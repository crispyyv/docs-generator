import { Box, Container, Flex, Heading, Link, VStack } from "@chakra-ui/react";
import { FormikHelpers, FormikValues } from "formik";
import { useState } from "react";
import { ChooseTemplates } from "./ChooseTemplates";
import { ContractAndPlan } from "./ContractAndPlan";
import { Customer } from "./Customer";
import { FormikStepper } from "./FormikStepper";
import { Holder } from "./Holder";

export const Main = () => {
  const [files, setFiles] = useState([]);
  const [initialValues] = useState({
    customer_uin: null,
    customer_name: "",
    customer_document: "",
    customer_company_type: "",
    customer_responsible: "",
    customer_responsible_role: "",
    customer_address: "",
    customer_phone: "",
    customer_email: "",
    customer_iban: "",
    customer_bank: "",
    customer_bic: "",

    holder_uin: "",
    holder_name: "",
    holder_document: "",
    holder_company_type: "",
    holder_responsible: "",
    holder_responsible_role: "",

    contract_number: "",
    contract_date: new Date(),
    contract_trademark_number: "",
    contract_payment_term: "",

    plan_name: "",
    plan_period: "",
    plan_price: "",
    plan_amount: 1,
    plan_cost: "",
    plan_cost_letters: "",

    templates: [],
  });

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    actions.setSubmitting(true);
    const result = await fetch(`https://fastdocs.kz/api/generate_documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variables: {
          ...values,
        },
        templates: values.templates,
      }),
    })
      .then((data) => data.json())
      .catch(console.error);

    if (result.length > 0) {
      setFiles(result);
    }
  };

  return (
    <Flex as="main" flex="1">
      <Container maxW="container.lg" my={6}>
        <FormikStepper
          onSubmit={handleSubmit}
          initialValues={initialValues}
          enableReinitialize
        >
          <Customer />

          <Holder />
          <ContractAndPlan />
          <ChooseTemplates />
        </FormikStepper>

        <VStack spacing={4} mt={4} alignItems="start">
          {files.length > 0 && <Heading>Ваши файлы:</Heading>}
          {files.length > 0 &&
            files.map((file: { url: string; filename: string }) => (
              <Box>
                <Link href={file?.url} target="_blank" color="blue.500">
                  {file?.filename}
                </Link>
              </Box>
            ))}
        </VStack>
      </Container>
    </Flex>
  );
};
