import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Components/Login";
import PaymentSlip from "./Slips/PaymentSlip";
import Student from "./Pages/Student";
import Lead from "./Pages/Lead";
import Batch from "./Pages/Batch";
import Attendence from "./Pages/Attendence";
import AddBranchForm from "./Components/AddBranchForm";
import NewBatches from "./Pages/NewBatches";
import EditBranch from "./Components/EditBranch";
import StudentsList from "./Pages/StudentsList";
import EditBatch from "./Components/EditBatch";
import EditStudent from "./Components/EditStudent";
import AddEmploye from "./Pages/AddEmploye";
import Editemploye from "./Components/Editemploye";
import Revenue from "./Pages/Revenue";
import DueStudentList from "./Pages/DueStudentList";
import NewStudentList from "./Pages/NewStudentList";
import StudentAttendenceSction from "./Components/StudentAttendenceSction";
import AbsentStudentList from "./Pages/AbsentStudentList";
import EditLead from "./Pages/EditLead";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Dashboard />} path="/">
            <Route element={<Home />} index path="" />
            <Route element={<PaymentSlip />} path="paymentSlip" />
            <Route element={<Student />} path="student" />
            <Route element={<Lead />} path="lead" />
            <Route element={<Batch />} path="batch" />
            <Route element={<Attendence />} path="attendence" />
            <Route element={<Revenue />} path="revenue" />
            <Route
              path="/studentAttendence/:id"
              element={<StudentAttendenceSction />}
            />
            <Route
              path="/absentStudentList/:id"
              element={<AbsentStudentList />}
            />
            <Route path="/newStudentList/:id" element={<NewStudentList />} />
            <Route path="/dueStudentList" element={<DueStudentList />} />
            <Route path="/addEmployee" element={<AddEmploye />} />
            <Route path="/addBranch" element={<AddBranchForm />} />
            <Route path="/editBranch/:id" element={<EditBranch />} />
            <Route path="/newbatches" element={<NewBatches />} />
            <Route path="/newbatches/:id" element={<NewBatches />} />
            <Route path="/studentsList/:id" element={<StudentsList />} />
            <Route path="/editBatch/:id" element={<EditBatch />} />
            <Route path="/editStudent/:id" element={<EditStudent />} />
            <Route path="/editEmployee/:id" element={<Editemploye />} />
            <Route path="/editLead/:id" element={<EditLead />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
