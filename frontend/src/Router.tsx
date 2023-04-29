import { Routes, Route, Link } from "react-router-dom";
import Root from "./Root";


export default function Router() {
  return (
  <Routes>
    <Route path="/" element={<Root/>}>
      {/*<Route index element={<Root/>}/>*/}
      {/*<Route path="about" element={<About/>}/>*/}
      {/*<Route path="dashboard" element={<Dashboard/>}/>*/}

      <Route path="*" element={<NoMatch/>}/>
    </Route>
  </Routes>
  );
};

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
