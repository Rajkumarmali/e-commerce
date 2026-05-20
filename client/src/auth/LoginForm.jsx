import { Button, Grid, TextField } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../state/auth/Action';

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget)
        const userData = {
            email: data.get('email'),
            password: data.get('password')
        }
        dispatch(login(userData));
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id='email'
                            name='email'
                            label='Email'
                            autoComplete='email'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id='password'
                            name='password'
                            label='Password'
                            autoComplete='password'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            className='bg-[#9155FD] w-full'
                            type='submit'
                            variant='contained'
                            size='large'
                            sx={{ bgcolor: "#9155FD" }}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <div>
                <div className='py-3 flex item-center'>
                    <p>You Don't have account ?</p>
                    <Button onClick={() => navigate('/register')} className='ml-5' size='small'>Registe</Button>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
