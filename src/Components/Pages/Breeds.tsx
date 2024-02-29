// function Breeds() {
//     return <div className="App">Breeds</div>;
// }

// export default Breeds;
import { Typography } from '@mui/material';

const Breeds = () => {
    return (
      <Typography variant="body2" color="textSecondary" sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        textAlign: 'center',
      }}>
        Breeds down here
      </Typography>
    );
  };

export default Breeds;
