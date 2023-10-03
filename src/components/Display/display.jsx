import { Box, Button, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { ResultContext } from "../../App";

const boxStyle = {
    border: '1px solid black',
    flex: '1 1',
    p: 3
}

const Display = () => {
    const result = useContext(ResultContext)
    const [counter, setCounter] = useState([])
    const [remains, setRemains] = useState([]);

    const formationRemainsData = (array) => {
        let result = {};
        for (const item of array) {
            result[item] = result[item] ? result[item] + 1 : 1
        }
        return result
    }

    const calcResult = (result) => {
        const boardsBySize = {};
        const totalBoards = {};
        const counter = {};
        let remains = {}; 

        result.forEach(el => {
            boardsBySize[el.size] = boardsBySize[el.size] ? [...boardsBySize[el.size], el] : boardsBySize[el.size] = [el]
            if (!counter[el.type])  {
                counter[el.type] = 0;
            }
        })
        for (let size in boardsBySize) {
            boardsBySize[size].forEach(el => {
                for (let i = 0; i < el.amount; i++) {
                    totalBoards[size] = totalBoards[size] ? [...totalBoards[size], el] : [el]
                }
            })
        }
        console.log(totalBoards);        
        for (let key in totalBoards) {
            const boarsOfCurrentSize = totalBoards[key];
            for ( let i = 0; i < boarsOfCurrentSize.length; i++) {
                const {length, type} = boarsOfCurrentSize[i];
                    if (length > 3000) {
                    counter[type]++
                    remains[key] = remains[key] ? [...remains[key], 6000 - length] : [6000 - length]
                } else {
                    if (remains[key]) {
                        remains[key].sort((a, b) => a - b)
                        let index;
                        let flag = remains[key].some((el, idx) => {
                            index = idx;
                            return el > length
                        }) 
                        if (flag) {
                            remains[key][index] -= length
                        } else {
                            counter[type]++;
                            remains[key] = remains[key] ? [...remains[key], 6000 - length] : [6000 - length]
                        }
                    } else {
                        counter[type]++;
                        remains[key] = [6000 - length]
                    }
                    
                }
            }
        }
        for (let key in remains) {
            remains[key] = Object.entries(formationRemainsData(remains[key]))
        }

        setCounter(Object.entries(counter))
        setRemains(Object.entries(remains))
    }

    

    return (
        <>
        <Box sx={boxStyle}> 
            Потребуется:
            {
                counter.map((el,idx) => <Typography key={idx}> Тип: {el[0]} - {el[1]}шт.</Typography>)
            }
        </Box>
        <Box  sx={boxStyle}>
            Остатки:
            {
               remains.map((el,idx) => <Typography key={idx}> Сечение: {el[0]}мм { el[1].map((el, idx) => <Typography key={idx}>&#8226; {el[0]}мм {el[1]}шт.</Typography>)}</Typography>)
            }
        </Box>

        <Button 
            sx={{position: 'absolute', bottom: 20, right: 44 }}
            variant="contained" 
            onClick={() => {calcResult(result)}
        }>
            Calc
        </Button>
        </>
        
    )
}
   
export default Display;