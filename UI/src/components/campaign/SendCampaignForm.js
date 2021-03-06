import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { postCall } from 'src/utils/service';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Subject required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Email Content required'),
    email: Yup.string().email('Email must be a valid email address').required('Send To is required'),
    //password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const response = await postCall('/dashboard/campaign', {
        "toEmail": values?.email,
         "emailSubject": values?.firstName,
        "emailBody": values?.lastName
      } )
      console.log("campaign response", response);
      if(response) {
        alert("Email Sent Successfully");
        // navigate('/dashboard', { replace: true });
      } else {
        alert("Something went wrong, Please try again with valid input");
      }
      
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            
            {/* <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            /> */}
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Send To"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
              fullWidth
              label="Subject"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

          <TextField
            multiline
            // fullWidth
            autoComplete="lastName"
            type="text"
            rows={3}
            label="Email Content"
            {...getFieldProps('lastName')}
            error={Boolean(touched.lastName && errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />

          {/* <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            /> */}

          {/* <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Email Content"
            {...getFieldProps('password')}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
            //         <Icon icon={showPassword ? eyeFill : eyeOffFill} />
            //       </IconButton>
            //     </InputAdornment>
            //   )
            // }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          /> */}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Send Campaign
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
