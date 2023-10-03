import { Box, Button, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { ResultContext } from "../../App";

const Display = () => {
    const result = useContext(ResultContext)

    const [dataForDisplay, setDataForDisplay] = useState({counter: 0, remains: []});

    const formationRemainsData = (array) => {
        let result = {};
        for (const item of array) {
            result[item] = result[item] ? result[item] + 1 : 1
        }
        return result
    }

    const calcResult = (result) => {
        let total = {};
        const totalLengths = {};
        result.forEach(el => {
            total[el.size] = total[el.size] ? [...total[el.size], el] : total[el.size] = [el]
        })
        for (let size in total) {
            total[size].forEach(el => {
                for (let i = 0; i < el.amount; i++) {
                    totalLengths[size] = totalLengths[size] ? [...totalLengths[size], el.length] : [el.length]
                }
            })
        }

        let remains = {}; 
        let counter = 0;
        console.log(total);
        for (let key in totalLengths) {
            const lengthOfCurrentSize = totalLengths[key];
            for ( let i = 0; i < lengthOfCurrentSize.length; i++) {
                const currentEl = lengthOfCurrentSize[i];
                    if (currentEl > 3000) {
                    counter++;
                    remains[key] = remains[key] ? [...remains[key], 6000 - currentEl] : [6000 - currentEl]
                } else {
                    if (remains[key]) {
                        remains[key].sort((a, b) => a - b)
                        let index;
                        let flag = remains[key].some((el, idx) => {
                            index = idx;
                            return el > currentEl
                        }) 
                        if (flag) {
                            remains[key][index] -= currentEl
                        } else {
                            counter++;
                            remains[key] = remains[key] ? [...remains[key], 6000 - currentEl] : [6000 - currentEl]
                        }
                    } else {
                        counter++;
                        remains[key] = [6000 - currentEl]
                    }
                    
                }
            }
        }
        for (let key in remains) {
            remains[key] = Object.entries(formationRemainsData(remains[key]))
        }
        setDataForDisplay({
            counter: counter,
            remains: Object.entries(remains)
        })
    }

    

    return (
        <>
        <Box sx={{
            border: '1px solid black',
            flex: '1 1'
        }}> 
            Потребуется {dataForDisplay.counter} досок.
        </Box>
        <Box  sx={{
            border: '1px solid black',
            flex: '1 1'
        }}>
            Остатки:
            {
               dataForDisplay.remains.map((el,idx) => <Typography key={idx}> Сечение: {el[0]}мм { el[1].map((el, idx) => <Typography key={idx}>&#8226; {el[0]}мм {el[1]}шт.</Typography>)}</Typography>)
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