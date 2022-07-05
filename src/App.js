import React from "react";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import { Routes, Route} from "react-router-dom";
import QuizList from "./containers/QuizLis/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";

class App extends React.Component {
  render() {
    return(
      <Layout>
          {/* <Quiz/> */}
          <Routes>
            <Route path="/" element={<QuizList/>}/>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/quiz-creator" element={<QuizCreator/>}/>
            <Route path="/quiz/:id" element={<Quiz/>}/>
          </Routes>
      </Layout>
      
    );
  }
}
export default App