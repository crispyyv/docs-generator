import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import { Form, Formik, FormikConfig, FormikProps, FormikValues } from "formik";
import React, { useState } from "react";

export const FormikStepper = ({
  children,

  ...props
}: FormikConfig<FormikValues>) => {
  const childrenArray = React.Children.toArray(children);

  const [step, setStep] = useState(0);
  const isLastStep = () => step === childrenArray.length - 1;

  const currentChild = childrenArray[step];

  const back = () => setStep((s) => s - 1);

  const forward = async (props: FormikProps<FormikValues>) => {
    if (isLastStep()) {
      props.handleSubmit();
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <Formik {...props}>
      {(props) => (
        <Form style={{ width: "100%" }} autoComplete="off">
          {currentChild}

          <Flex justifyContent="space-between" mt={4}>
            <Button
              as="button"
              size="lg"
              colorScheme="teal"
              type="button"
              onClick={back}
              disabled={step === 0}
            >
              <ArrowBackIcon size="lg" />
              Назад
            </Button>
            <Button
              size="lg"
              colorScheme="teal"
              type="button"
              onClick={() => forward(props)}
              isLoading={props.isSubmitting}
            >
              {isLastStep() ? "Получить документы" : "Далее"}
              {!isLastStep() && <ArrowForwardIcon size="lg" />}
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
