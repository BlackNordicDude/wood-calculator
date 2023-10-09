import { Box } from "@mui/material"

import Display from "../Display/display"

const Result = () => {

    return (
        <Box
            sx={{
                bgcolor: '#ceeef5',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxHeight: 800,
                borderTop: '2px solid rgba(0, 0, 0, 0.3)',

            }}>
                <Display />
        </Box>
    )
}

export default Result