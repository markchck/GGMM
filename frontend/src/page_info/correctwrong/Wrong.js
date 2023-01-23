import './Wrong.css';
import 'galmuri/dist/galmuri.css';


function Wrong({answer}) {
  return (
    <div className="line" >
      <span className="Galmuri answer_font">
        <center >
        {answer}
        </center>
      </span>
    </div>
  );
}

export default Wrong;