import { Box, Typography as T} from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { ResultContext } from "../../App";

const outerBoxStyle = {
    display: 'flex',
    flex: '1 1',
    flexDirection: 'column'
}
const innerBoxStyle = {
    minHeight: 70,
    maxHeight: 300,
    overflowY: 'auto',
    flex: '1 1',
    p: 1
}
const displayRequiredAndRemainBoardDataStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '2px solid rgba(0, 0, 0, 0.1)'
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
                counter[`${el.type} (${el.size})`] = 0;
            }
        })
        for (let size in boardsBySize) {
            boardsBySize[size].forEach(el => {
                for (let i = 0; i < el.amount; i++) {
                    totalBoards[size] = totalBoards[size] ? [...totalBoards[size], el] : [el]
                }
            })
        }
        for (let key in totalBoards) {
            const boarsOfCurrentSize = totalBoards[key];
            for ( let i = 0; i < boarsOfCurrentSize.length; i++) {
                const {length, type, size} = boarsOfCurrentSize[i];
                    if (length > 3000) {
                    counter[`${type} (${size})`]++
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
                            counter[`${type} (${size})`]++;
                            remains[key] = remains[key] ? [...remains[key], 6000 - length] : [6000 - length]
                        }
                    } else {
                        counter[`${type} (${size})`]++;
                        remains[key] = [6000 - length]
                    }
                    
                }
            }
        }
        for (let key in remains) {
            remains[key] = Object.entries(formationRemainsData(remains[key]))
        }
        const totalCounter = Object.entries(counter).map(el => {
            const x = el[0].split(' ')
            x.splice(1, 0, 'мм ')
            return [x.join(''), el[1]]
        })

        setCounter(totalCounter)
        setRemains(Object.entries(remains))
    }

    useEffect(() => {
        calcResult(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    

    return (
        <>
            <Box sx={{display: 'flex', mb: 1}}>
                <Box sx={outerBoxStyle}> 
                    <T sx={{mx: 1, pt: 1, borderBottom: '2px solid rgba(0, 0, 0, 0.3)'}}>Потребуется:</T>
                    <Box sx={innerBoxStyle}>
                        {
                            counter.map((el,idx) => <Box  key={idx} sx={displayRequiredAndRemainBoardDataStyle}><T> {el[0]} </T> <T> {el[1]} шт. </T></Box>)
                        }
                    </Box>
                </Box>
                <Box  sx={outerBoxStyle}>
                    <T sx={{mx: 1, pt: 1, borderBottom: '2px solid rgba(0, 0, 0, 0.3)'}}>Остатки:</T>
                    <Box sx={innerBoxStyle}>
                        {
                        remains.map((el,idx) =><Box key={idx} sx={displayRequiredAndRemainBoardDataStyle}><T> {el[0]}</T>  <T> { el[1].map((el, idx) => <T key={idx}> {el[0]}мм {el[1]}шт.</T>)}</T></Box>)
                        }
                    </Box>           
                </Box>
            </Box> 
        </>  
    )
}
   
export default Display;