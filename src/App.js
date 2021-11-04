import { useState } from 'react'
import styled from 'styled-components'
import {Formik, Form} from 'formik'
import * as YUP from 'yup'
import Button from './components/Button.js'
import Input from './components/Input'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1)        
  }
  return Math.round(total)
}

const formater = new Intl.NumberFormat('es-US', {
  style:'currency',
  currency:'USD',
  minimumFractionDigits:2,
  maximumFractionDigits:2
})

function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({deposit,contribution,years,rate}) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formater.format(val))
  }

  return (
    <Container>
      <Section>
        <Formik
            initialValues = {{
              deposit:'',
              contribution:'',
              years:'',
              rate:'',
            }}
            onSubmit = {handleSubmit}
            validationSchema = {
              YUP.object({
                deposit: YUP.number().required('Campo requerido').typeError('Debe ser un número'),
                contribution: YUP.number().required('Campo requerido').typeError('Debe ser un número'),
                years: YUP.number().required('Campo requerido').typeError('Debe ser un número'),
                rate: YUP.number().required('Campo requerido').typeError('Debe ser un número').min(0,'El valor minimo es 0').max(1,'El valor máximo es 1'),
              })
            }
        >
          <Form>
            <Input name="deposit" label="Deposito inicial" />
            <Input name="contribution" label="Contribución anual" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Interés estimado" />
            
            <Button type="submit">Calcular</Button>

          </Form>
        </Formik>
        {balance !== ''? <Balance>Balance final: {balance}</Balance>:null}
      </Section>
    </Container>
  )
}

export default App;