import React from 'react'
import { FormikHelpers, useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from '@mui/material'
import { useAppDispatch } from 'common/hooks';
import { selectIsLoggedIn } from 'features/auth/auth.selectors';
import { authThunks } from './auth.reducer';
import { LoginParamsType } from 'features/auth/auth.api';
import { ResponseType } from 'common/types';

export const Login = () => {
	const dispatch = useAppDispatch()

	const isLoggedIn = useSelector(selectIsLoggedIn)

	const formik = useFormik({
		validate: (values) => {
			const errors: any = {};
			if (!values.email) {
				errors.email = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address'
			}
			if (!values.password) {
				errors.password = 'Required';
			} else if (values.password.length < 3) {
				errors.password = 'Short password!'
			}

			return errors;

		},
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
			dispatch(authThunks.login(values))
				.unwrap()
				.catch((reason: ResponseType) => {
					debugger
					const {fieldsErrors} = reason
					if (fieldsErrors) {
						fieldsErrors.forEach((fieldError) => {
							formikHelpers.setFieldError(fieldError.field, fieldError.error)
						})
					}

				})
		},
	})

	if (isLoggedIn) {
		return <Navigate to={'/'}/>
	}


	return <Grid container justifyContent="center">
		<Grid item xs={4}>
			<form onSubmit={formik.handleSubmit}>
				<FormControl>
					<FormLabel>
						<p>
							To log in get registered <a href={'https://social-network.samuraijs.com/'}
														target={'_blank'}>here</a>
						</p>
						<p>
							or use common test account credentials:
						</p>
						<p> Email: free@samuraijs.com
						</p>
						<p>
							Password: free
						</p>
					</FormLabel>
					<FormGroup>
						<TextField
							label="Email"
							margin="normal"
							{...formik.getFieldProps('email')}
						/>
						{formik.touched.email && formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
						<TextField
							type="password"
							label="Password"
							margin="normal"
							{...formik.getFieldProps('password')}
						/>
						{formik.touched.password && formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
						<FormControlLabel
							label={'Remember me'}
							control={<Checkbox
								{...formik.getFieldProps('rememberMe')}
								checked={formik.values.rememberMe}
							/>}
						/>
						<Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
					</FormGroup>
				</FormControl>
			</form>
		</Grid>
	</Grid>
}