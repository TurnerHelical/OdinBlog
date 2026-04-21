import {useState} from 'react';

const useFormValidation = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(() => validate(initialValues));
    const [touched, setTouched] = useState(
        Object.fromEntries(
            Object.keys(initialValues).map((key) => [key, false])
    ));

    const handleChange = (e) => {
        const {name, value} = e.target;

        const updatedValues = {
            ...values,
            [name]: value,
        };

        setValues(updatedValues);
        setErrors(validate(updatedValues));
    };

    const handleBlur = (e) => {
        const {name} = e.target;
        
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));

        setErrors(validate(values));
    };

    const hasErrors = (errorObject) => {
        return Object.values(errorObject).some((value) => value !== '');
    }

    const handleSubmit = (e) => {
        const validationErrors = validate(values);
        setErrors(validationErrors);

        const touchedFields = Object.fromEntries(
            Object.keys(values).map((key) => [key, true])
        );
        

        setTouched(touchedFields);

        if (hasErrors(validationErrors)) {
            e.preventDefault();
        }
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors(validate(initialValues));
        setTouched(Object.fromEntries(
            Object.keys(initialValues).map((key) => [key, false])
        ));
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
    };
};

export {useFormValidation};