import { Box, Button, Typography as T} from "@mui/material"
import { useContext } from "react"
import { ResultContext } from "../../App"
import Display from "../Display/display"

const Result = ({refreshResult}) => {

    const result = useContext(ResultContext)

    const deleteBoard = (originIdx) => {
        refreshResult([...result].filter((el, idx) => {
            return idx !== originIdx
        }))
    }

    

    return (
        <>
           <Box 
            sx={{
                maxHeight: 300,
                width: '100%',
                overflowY: 'auto',
            }}>
                {
                result.map((el, idx) => {
                    return(
                        <Box
                            key={idx}
                            sx={{
                                minHeight: 50,
                                boxSizing: 'border-box',
                                width: '100%',
                                m: 0,
                                py: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 3,
                                bgcolor: '#ceeef5',
                                borderBottom: '2px solid rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            <T>Тип: {el.type}</T>
                            <T>Количество: {el.amount} </T>
                            <T>Длина: {el.length} </T>
                            <T>Сечение: {el.size} </T>
                            <Button variant='contained' sx={{px: 1, minWidth: '30px'}} onClick={() => deleteBoard(idx)}>X</Button>
                        </Box>
                    )}
                )}
            </Box> 
            <Box
                sx={{
                    bgcolor: '#ceeef5',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    maxHeight: 400,
                    borderTop: '2px solid rgba(0, 0, 0, 0.3)',

                }}>
                   <Display />
            </Box>
        </>
    )
}

export default Result