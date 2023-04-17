import { Grid, FormControlLabel, RadioGroup, FormControl, Radio, Button, TextField, Box } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useQuery } from 'react-query';
import axios from 'axios';
import SwitchItem from './SwitchItem';
import { validationSchema } from './validationSchema';

function Actions({ onFormSubmit }: { onFormSubmit: (formData: { conversationDownloadsEnabled: boolean; conversationClearEnabled: boolean; showLiveChatIcon: boolean; collectUserInfoEnabled: boolean; emailEnabled: boolean; email: string; emailFrequency: string }) => void }) {
  
  const switches = [
    {
      name: 'conversationDownloadsEnabled',
      line1: 'Allow users to download their conversations',
      line2: 'Web Chat only',
    },
    {
      name: 'conversationClearEnabled',
      line1: 'Allow users to clear their conversations',
      line2: 'Web Chat only',
    },
    {
      name: 'showLiveChatIcon',
      line1: 'Show live chat icon for instant connection',
      line2: 'Web Chat only',
    },
    {
      name: 'collectUserInfoEnabled',
      line1: 'Request user details prior to connecting',
      line2: 'Name, email or contact number and reason',
    },
    {
      name: 'emailEnabled',
      line1: 'Receive transcripts by email',
      line2: 'CSV file containing all conversations held in the selected period',
    },
  ];
  
  const fetchSettings = async () => {
    const response = await axios.get('https://mocki.io/v1/d15ecbc8-efaf-409a-b122-da4b12bd8b18');
    return response.data;
  };

  const { isLoading, isError, error, data } = useQuery('settings', fetchSettings);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  const initialValues = {
    conversationDownloadsEnabled: data.conversationDownloadsEnabled,
    conversationClearEnabled: data.conversationClearEnabled,
    showLiveChatIcon: data.showLiveChatIcon,
    collectUserInfoEnabled: data.collectUserInfoEnabled,
    emailEnabled: data.conversationTranscripts.emailEnabled,
    email: data.conversationTranscripts.emailAddress,
    emailFrequency: data.conversationTranscripts.emailFrequency,
  };

  return (
    <Formik
      key={JSON.stringify(initialValues)}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onFormSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleChange, values, errors, touched, resetForm, dirty }) => (
        <Form>
          <Grid container spacing={2}>

            {switches.map((item) => (
              <Grid item xs={12} key={item.name}>
                <SwitchItem
                  name={item.name}
                  line1={item.line1}
                  line2={item.line2}
                  value={(values as Record<string, boolean>)[item.name]}
                  onChange={handleChange}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Box>
                <p>Please provide an email address</p>
              </Box>
              <Field
                label="Email"
                name="email"
                type="email"
                as={TextField}
                variant="outlined"
                disabled={!values.emailEnabled}
                error={Boolean(errors.email) && touched.email}
                helperText={touched.email && errors.email}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-error fieldset': {
                    borderColor: 'orange',
                  },
                  '& .MuiFormHelperText-root.Mui-error': {
                    color: 'orange',
                  },
                  '& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-error': {
                    color: 'orange',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Box display="flex" alignItems="center">
                  <Box paddingRight={3}>
                    <p>Frequency:</p>
                  </Box>
                  <Field as={RadioGroup} row aria-label="options" name="emailFrequency">
                  <FormControlLabel
                    value="DAILY"
                    control={<Radio disabled={!values.emailEnabled} />}
                    label="Daily"
                  />
                  <FormControlLabel
                    value="WEEKLY"
                    control={<Radio disabled={!values.emailEnabled} />}
                    label="Weekly"
                  />
                  </Field>
                </Box>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between">
              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={() => resetForm()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || !dirty}
              >
                Save Changes
              </Button>
            </Box>
          </Grid>

          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default Actions;
