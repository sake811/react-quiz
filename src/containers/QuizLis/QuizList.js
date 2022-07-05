import React, { Component } from "react";
import "./QuizList.css"
import { NavLink } from 'react-router-dom'
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";


export default class QuizList extends Component {

    state = {
        quizes: [],
        loading: true
    }


    renderQuizes() {
        return this.state.quizes.map(quiz => {
            return (
                <li
                    key={quiz.id}
                ><NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get('https://react-quiz-74013-default-rtdb.europe-west1.firebasedatabase.app/quizes.json')

            const quizes = []

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            });

            this.setState({
                quizes: quizes, loading: false
            })
        } catch (e) {
            console.log(e)
        }

    }

    render() {
        return (
            <div className="QuizList">
                <div>
                    <h1>Список тестов</h1>
                    {this.state.loading
                        ? < Loader />
                        : <ul>
                            {this.renderQuizes()}
                        </ul>
                    }

                </div>

            </div>
        )
    }
}