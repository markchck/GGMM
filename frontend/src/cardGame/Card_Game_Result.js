import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useStore from '../for_game/store';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const { card_game_end, cur_session, card_game_red, card_game_blue} = useStore();

  React.useEffect(() => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);

      const message = {
        Total_score: card_game_end + 1,
      };

      cur_session &&
        cur_session.signal({
          type: "Total_score",
          data: JSON.stringify(message),
        });

    }, 3000);
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {card_game_red > card_game_blue ? <>Red Team 이 이겼습니다.</> 
          : <>Blue Team 이 이겼습니다.</>}
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;