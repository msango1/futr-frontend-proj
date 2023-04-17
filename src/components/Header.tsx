import { Settings, AccessTime, HeadsetOff, DoNotDisturbAlt } from '@mui/icons-material';
import { Grid, Button } from '@mui/material';

function Header() {
  const liveButton = 'General';

  const headerBtns = [
    { icon: <Settings />, text: 'General' },
    { icon: <AccessTime />, text: 'Support Times' },
    { icon: <HeadsetOff />, text: 'Take Offline' },
    { icon: <DoNotDisturbAlt />, text: 'Block Users' },
  ];

  return (
    <Grid container spacing={0}>
      {headerBtns.map(({ icon, text }) => {
        const isActive = text === liveButton;
        return (
          <Grid item xs={3} key={text}>
            <Button
              fullWidth
              sx={{
                color: isActive ? 'primary.main' : 'text.primary',
                borderBottom: isActive ? '2px solid' : '1px solid',
                borderColor: isActive ? 'primary.main' : 'text.primary',
                borderRadius: 0,
                fontWeight: 'bold',
                fontSize: '0.8rem',
              }}
              disableRipple
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
                <span style={{ marginLeft: 8 }}>{text}</span>
              </div>
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Header;
