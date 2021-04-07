import { Field } from 'formik'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

function datePicker(props) {

    const {name, ...rest} = props
    return (
        <div>
            <Field name={name}>
                {
                     ({form,field}) => {
                         const {setFieldValue} = form
                         const {value} = field
                         return (
                         <DatePicker id={name}
                          {...field} 
                          {...rest} 
                          selected={value}
                          onChange={val => setFieldValue(name,val)}/>
                         )
                     }
                }
            </Field>
        </div>
    )
}
export default datePicker;