import { Box, Button, Container, Typography } from "@mui/material"
import { useContext } from "react"
import { ResultContext } from "../../App"
import Display from "../Display/display"


const Result = ({refreshResult}) => {

    const result = useContext(ResultContext)

    const TextStyle = {
        fontSize: '18px',
        fontWeight: 700,
    }

    const deleteBoard = (originIdx) => {
        refreshResult([...result].filter((el, idx) => {
            return idx !== originIdx
        }))
    }

    

    return (
        <Container 
        sx={{
            maxWidth: '100%',
            position: 'absolute',
            bottom: 15,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 5
        }}>
           <Box 
            sx={{
                maxHeight: 300,
                width: '100%',
                overflowY: 'scroll',
                overflowX: 'hidden',
            }}>
                {
                result.map((el, idx) => {
                    return(
                        <Box
                            key={idx}
                            sx={{
                                minHeight: 50,
                                width: '100%',
                                m: 0,
                                py: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                                bgcolor: '#ceeef5',
                                borderBottom: '2px solid rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            <Typography variant="body1" sx={{...TextStyle, textDecoration: 'underline'}}>{idx + 1}.</Typography>
                            <Typography variant="body1" sx={TextStyle}>Тип: {el.type}</Typography>
                            <Typography variant="body1" sx={TextStyle}>Количество: {el.amount} </Typography>
                            <Typography variant="body1" sx={TextStyle}>Длина: {el.length} </Typography>
                            <Typography variant="body1" sx={TextStyle}>Сечение: {el.size} </Typography>
                            <Button variant='contained' sx={{px: 1, minWidth: '30px'}} onClick={() => deleteBoard(idx)}>X</Button>
                        </Box>
                    )}
                )}
            </Box> 
            <Box
                sx={{
                    height: 400,
                    width: '100%',
                    bgcolor: '#ceeef5',
                    boxSizing: 'border-box',
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-around',
                }}>
                   <Display />
            </Box>
        </Container>
    )
}

export default Result