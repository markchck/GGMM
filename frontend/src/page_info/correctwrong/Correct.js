import './Correct.css';
import 'galmuri/dist/galmuri.css';


function Correct({answer}) {
  return (

    <div className="circle" >
      <span className="Galmuri answer_font">
        <center >
        {answer}
        </center>
      </span>
    </div>

  );
}

export default Correct;