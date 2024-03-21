import { Clear } from '@mui/icons-material';
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const WebPackageCreate = () => {
    const [inputValue, setInputValue] = useState('');
    const [words, setWords] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            setWords([...words, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleDelete = (index) => {
        const updatedWords = words.filter((_, i) => i !== index);
        setWords(updatedWords);
    };
    return (
        <Box>
            <Typography variant='h5' color='gray' mb={3}>Create Web Package</Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                // maxWidth: { sm: '100%', md: '30%' },
                gap: 1,
                // py: 2, px: 3,
                // border: '1px solid lightgray',
                // borderRadius: '5px',
                // bgcolor: '#fff'
            }}>
                <TextField id="standard-basic" label="Package Name" placeholder='e.g. E-commerce Website' variant="outlined" size='small' />
                <TextField id="standard-basic" label="Price" variant="outlined" placeholder='e.g. Start at Tk 20,000' size='small' />
                <Box mt={3} mb={2}>
                    <Typography mb={1}>Package Details</Typography>
                    <Stack gap={1}>
                        {words.map((word, index) => (
                            <Stack direction='row' alignItems='center' gap={1} sx={{
                                border: '1px solid lightgray',
                                borderRadius: '5px',
                                pl: 2,
                                width: 'fit-content',
                                userSelect: 'none'
                            }} key={index}>
                                {word}
                                <button style={{
                                    padding: '0 10px',
                                    border: 'none',
                                    backgroundColor: '#fff',
                                    cursor: 'pointer'
                                }} onClick={() => handleDelete(index)}><Clear fontSize='small' /> </button>
                            </Stack>
                        ))}
                        <TextField size='small' id="standard-basic" label="Type a word and press Enter" onChange={handleInputChange} value={inputValue} onKeyPress={handleKeyPress} variant="standard" />
                        {/* <input style={{
                        outline: 'none',
                        border: 'none',
                        marginTop: words.length ? '10px' : 0
                    }}
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder='Type a word and press Enter'
                /> */}
                    </Stack>
                </Box>
            </Box>
            <Button variant='contained'>Submit</Button>
        </Box >
    )
}

export default WebPackageCreate
