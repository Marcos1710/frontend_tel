import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { plainsAPI } from '../../services/plains'

function Form({ plain }) {
  const [loading, setLoading] = useState(false);
	const [listPlains, setListPlains] = useState([])
  const [error, setError] = useState(false)
	const [source, setSource] = useState("")
  const [destination, setDestination] = useState("")
	const [timer, setTimer] = useState(0)
	const [dataTable, setDataTable] = useState([])

	useEffect(() => {
    list()
  }, [])

	// busca os planos
  const list = async () => {
    try {
      setLoading(true)

      const response = await plainsAPI.index(1, 10) 
      
			const newResponse = response.data.map(value => {
				return {
					label: `Origem: ${value.source} - Destino: ${value.destination}`,
					source: value.source,
					destination: value.destination
				}
			})

			setListPlains(newResponse)
      
    } catch (e) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(false);
  };

	// envia os dados para o calculo
	const send = async () => {
		try {
			setLoading(true)

			plainsAPI.show(source, destination, timer, plain)
				.then(response => {
					const data = [...dataTable]
					data.push(response)
					setDataTable(data)
				})
				.catch(() => setError(true))
				.finally(() => setLoading(false))

		} catch (e) {
			setError(true)
		} finally {
			setLoading(false)
		}
	}

  return (
		<>
			{loading ?
				<Backdrop
					open={loading}
					sx={{ color: '#ffffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				>
					Carregando... <CircularProgress color="inherit" /> 
		 		</Backdrop> : error ? 
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Ops... Ocorreu um erro interno com o servidor!
          </Alert>
        </Snackbar> : <>
					<Autocomplete
						disablePortal
						id="combo-box-demo"
						options={listPlains}
						sx={{ width: 300 }}
						onChange={(event, newValue) => {
							setSource(newValue.source)
							setDestination(newValue.destination)
						}}
						renderInput={(params) => <TextField {...params} label="Origem e Destino" />}
					/>
					<TextField 
						id="timer" 
						label="Tempo em minutos" 
						type="number" 
						onChange={(e) => setTimer(e.target.value)} 
					/>
					<Button variant="contained" onClick={() => send()}>Calcular valor</Button>
					
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
							<TableHead>
								<TableRow>
									<TableCell>Origem</TableCell>
									<TableCell align="center">Destino</TableCell>
									<TableCell align="center">Tempo</TableCell>
									<TableCell align="center">Plano</TableCell>
									<TableCell align="center">Com Plano</TableCell>
									<TableCell align="center">Sem Plano</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{dataTable.map((row) => (
									<TableRow
										key={`id=${row.source}_${row.destination}_${row.with}_${row.without}`}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{row.source}
										</TableCell>
										<TableCell align="center">{row.destination}</TableCell>
										<TableCell align="center">{row.timer_minutes}</TableCell>
										<TableCell align="center">{row.plain}</TableCell>
										<TableCell align="center">{row.with}</TableCell>
										<TableCell align="center">{row.without}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</>
      }
		</>
  );
}

export default Form;