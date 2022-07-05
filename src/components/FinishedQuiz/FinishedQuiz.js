import React from "react";
import './FinishedQuiz.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {


    const succesCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'succes') {
            total++
        } 

        return total
    }, 0)

    return (
        <div className="FinishedQuiz">
            <ul>
                {props.quiz.map((quizItem, index   )=> {

                    const clss = [
                        'fa', 
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        [props.results[quizItem.id]]
                
                    ]

                    return(
                        <li
                        key={index}
                        ><strong>{index + 1}</strong>. 
                        {quizItem.question}
                        <i className={clss.join(' ')}/>
                        </li>
                    )
                })}
            </ul>
            <p>Правильно {succesCount} из {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRetry} type="primary">Повторить</Button>
                <Link to="/"><Button  type="success">Перейти в список тестов</Button></Link>
            </div>
        </div>
    )
}

export default FinishedQuiz