import { Box, TextField, Button, } from '@mui/material';
import { useForm } from '../../hooks';
import { useContext } from 'react';
import { ResultContext } from '../../App';

const Board = ({refreshResult}) => {

    const result = useContext(ResultContext);

    const {values, handleChange} = useForm({
        length: 0,
        amount: 0,
        height: 0, 
        width: 0,
        type: '',
    });

    const addBoard = (values) => {
        const {length, amount, height, width, type} = values
        if (length > 0 && amount > 0 && height > 0 && width > 0 && type !== '' && length <= 6000) {
            console.log(typeof height);
            const dataForUpdating = {length, amount, type, size: +height >= +width ? `${height}x${width}` : `${width}x${height}`}
            refreshResult([...result, dataForUpdating]) 
        } else {
            alert('Incorrect input!')
        }
        
    }

    return (
        <Box sx={{
          height: 50,
          p: 4,
          borderBottom: '2px solid rgba(0, 0, 0, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: '#ceeef5'
        }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column'  
            }}>
                <TextField
                    name='length'
                    type='number'
                    variant='standard'
                    label='Длина'
                    error={values.length > 6000 ? true : false}
                    value={values.length || ''}
                    helperText={values.length > 6000 ? 'Куда лезешь?!' : false}
                    onChange={handleChange}
                />
            </Box>
            <Box>
                <TextField
                    name='amount'
                    type='number'
                    variant='standard'
                    label='Количество'
                    value={values.amount || ''}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 1
            }}>
                <TextField
                    sx={{maxWidth: 80}}
                    name='height'
                    type='number'
                    variant='standard'
                    label='Высота'
                    value={values.height || ''}
                    onChange={handleChange}
                />
                <TextField
                    sx={{maxWidth: 80}}
                    name='width'
                    type='number'
                    variant='standard'
                    label='Ширина'
                    value={values.width || ''}
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ minWidth: 170}}>
                <TextField
                    name='type'
                    type='string'
                    variant='standard'
                    label='Тип'
                    value={values.type || ''}
                    onChange={handleChange}
                />
            </Box>
            <Button
                variant='contained'
                onClick={() => {
                    addBoard(values)
                }}
            >
                +
            </Button>
        </Box>
    )
}

export default Board;