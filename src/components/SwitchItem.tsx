import React from 'react';
import { FormControlLabel, Switch, Box } from '@mui/material';

interface SwitchItemProps {
  name: string;
  line1: string;
  line2: string;
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SwitchItem: React.FC<SwitchItemProps> = ({ name, line1, line2, value, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          onChange={onChange}
          name={name}
          checked={value}
        />
      }
      label={
        <Box paddingLeft={3} display="flex" flexDirection="column">
          <span style={{ fontWeight: 'bold' }}>{line1}</span>
          <span style={{ color: 'grey' }}>{line2}</span>
        </Box>
      }
    />
  );
}

export default SwitchItem;
