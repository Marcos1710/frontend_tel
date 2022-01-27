import React from 'react';
import Paper from '@mui/material/Paper';

import './styles.css'

function Plain({ plain, ImagePlans, choosePlain }) {
  return <Paper className='mouse box' elevation={3} onClick={() => choosePlain(plain)}>
		<h4 className='text-box'>Fale Mais {plain}</h4>
		<div className='image-box'>
			<img src={ImagePlans} height="210" width="280" />
		</div>
	</Paper>
}

export default Plain;