import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Report } from "./pages/Report";
import { ReportModel2 } from "./pages/ReportModel2";
import { OptometricDashBoard } from "./pages/OptometricDashBoard";



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path = "/model2" element = {<ReportModel2/>}/>
        <Route path ="/optometricdashboard" element = {<OptometricDashBoard/>}/>
      </Routes>
    </div>
  );
}

export default App;
