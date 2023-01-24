import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useStore from '../for_game/store';
import Slide from '@material-ui/core/Slide';
import './CardGameResult.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CardGameResult() {
  const [open, setOpen] = React.useState(false);
  const { card_game_end, card_game_red, card_game_blue, cur_session } = useStore();

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
      <Modal open={open}>
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          <Box sx={style}>
            {card_game_red > card_game_blue ?
              <>
                <div className="wrapper">
                  <div className="container">
                    <h1>RED TEAM GET SPECIAL</h1>
                  </div>
                </div>
              </>
              : <>
                <div className="wrapper">
                  <div className="container">
                    <h1>BLUE TEAM GET SPECIAL</h1>
                  </div>
                </div>
              </>}
          </Box>
        </Slide>
      </Modal>
    </div>
  );
}

export default CardGameResult;