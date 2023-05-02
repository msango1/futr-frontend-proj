import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Header from './Header';
import Actions from './Actions';
import { styled } from '@mui/system';

const Form = styled(Paper)(() => ({
  backgroundColor: '#fff',
  height: 'calc(100%)',
  border: '2px solid #6c95ce',
}));

function FullWidthGrid() {
  const handleFormSubmit = (formData: { 
    conversationDownloadsEnabled: boolean;
    conversationClearEnabled: boolean;
    showLiveChatIcon: boolean;
    collectUserInfoEnabled: boolean;
    emailEnabled: boolean;
    email: string;
    emailFrequency: string 
  }) => {
    console.log('Form data:', formData);
  };

  return (
    <Container>
      <Box py={2}>
        <Form>
          <Box px={6} py={4}>
            <Header />
          </Box>
          <Box px={6} py={4}>
            <Actions onFormSubmit={handleFormSubmit} />
          </Box>
        </Form>
      </Box>
    </Container>
  );
}

export default FullWidthGrid;
