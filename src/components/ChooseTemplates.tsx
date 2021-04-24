import { Box, Checkbox, Heading, Stack } from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import { useEffect, useState } from "react";

export const ChooseTemplates = () => {
  const [availableTemplates, setAvailableTemplates] = useState([]);

  useEffect(() => {
    const getTemplates = async () => {
      const result = await fetch(`http://fastdocs.kz/api/templates`)
        .then((data) => data.json())
        .catch(console.error);
      setAvailableTemplates(result);
    };
    getTemplates();
  }, []);

  const [checkedItems, setCheckedItems] = useState([false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const resetAnsSetNewField = (prevState: number[], value: number) => {
    let saved = prevState;
    if (saved.includes(value)) {
      delete saved[saved.indexOf(value)];
    } else {
      saved = [...saved, value];
    }
    return saved.filter(Boolean);
  };

  const setAllValues = (checked: boolean) =>
    checked
      ? new Array(3).fill(checked).map((_, idx) => availableTemplates[idx])
      : [];

  return (
    <Box>
      <Heading>Выберите шаблон</Heading>
      <Field name="templates">
        {({ field, form }: FieldProps) => (
          <Checkbox
            {...field}
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) => {
              setCheckedItems([
                e.target.checked,
                e.target.checked,
                e.target.checked,
              ]);

              form.setFieldValue("templates", setAllValues(e.target.checked));
            }}
          >
            Выбрать все
          </Checkbox>
        )}
      </Field>
      <Stack pl={6} mt={1} mb={4} spacing={1}>
        {availableTemplates?.map((temp, idx) => (
          <Field name="templates">
            {({ field, form }: FieldProps) => (
              <Checkbox
                {...field}
                isChecked={checkedItems[idx]}
                onChange={(e) => {
                  if (idx === 0) {
                    form.setFieldValue(
                      "templates",
                      resetAnsSetNewField(field.value, availableTemplates[0])
                    );
                    setCheckedItems([
                      e.target.checked,
                      checkedItems[1],
                      checkedItems[2],
                    ]);
                  }

                  if (idx === 1) {
                    form.setFieldValue(
                      "templates",
                      resetAnsSetNewField(field.value, availableTemplates[1])
                    );

                    setCheckedItems([
                      checkedItems[0],
                      e.target.checked,
                      checkedItems[2],
                    ]);
                  }
                  if (idx === 2) {
                    form.setFieldValue(
                      "templates",
                      resetAnsSetNewField(field.value, availableTemplates[2])
                    );

                    setCheckedItems([
                      checkedItems[0],
                      checkedItems[1],
                      e.target.checked,
                    ]);
                  }
                }}
              >
                {temp}
              </Checkbox>
            )}
          </Field>
        ))}
      </Stack>
    </Box>
  );
};
