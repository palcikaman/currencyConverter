import * as React from 'react'
import {useMutation, useQuery} from "react-query";
import {getConvert, getSymbols} from "../api/endpoints";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {Button, Container, Grid, MenuItem, TextField, Typography} from "@mui/material";

type FormValues = {
  from: string,
  to: string,
  amount: string
}

const Converter = () => {

  const form = useForm<FormValues>();

  const symbolsQuery = useQuery('symbols', async () => {
    const {data} = await getSymbols();
    return data;
  })

  const convertMutation = useMutation( async (values: FormValues) => {
    const {data} = await getConvert(values);
    return data;
  })

  return (
    <Container maxWidth='md'>
      <FormProvider {...form} >
        <form onSubmit={form.handleSubmit((values) => convertMutation.mutate(values))}>
          <Grid container justifyContent='space-between'>
            <Controller
              name='amount'
              defaultValue=''
              render={({field}) => <TextField label='Amount' {...field}/>}
            />
            <Controller
              name='from'
              defaultValue='EUR'
              render={({field}) => <TextField label='From' select {...field}>
                {symbolsQuery.data?.map(symbol =>
                  <MenuItem value={symbol} key={symbol}>{symbol}</MenuItem>
                )}
              </TextField>}
            />
            <Controller
              name='to'
              defaultValue='HUF'
              render={({field}) => <TextField label='To' select {...field}>
                {symbolsQuery.data?.map(symbol =>
                  <MenuItem value={symbol} key={symbol}>{symbol}</MenuItem>
                )}
              </TextField>}
            />
          </Grid>
          <Grid container justifyContent='center'>
            <Button variant='contained' color='primary' type='submit'>Ok</Button>
          </Grid>
        </form>
      </FormProvider>
      {convertMutation.data && (
        <Grid container justifyContent='center' sx={{marginTop: 2}}>
          <Typography variant='body2'>
            {convertMutation.data.amount} {convertMutation.data.from} =
          </Typography>
          <Typography variant='body1' sx={{fontWeight: 'bold'}}>
            {convertMutation.data.value} {convertMutation.data.to}
          </Typography>
        </Grid>
      )}
    </Container>
  )
}

export default Converter
