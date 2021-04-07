import React from 'react'
import datePicker from './datePicker'

const initialValues = {
    dateEffectivite:null
}
const validationSchema = Yup.object({
    dateEffectivite : Yup.date()
    .required("La date d'effectivité du marché est obligatoire!").nullable()
})

export default function formikContainer() {
    return (
        <div>
            <datePicker name='dateEffectivite'/>
        </div>
    )
}
