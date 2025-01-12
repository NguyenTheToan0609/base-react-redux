import Select from "react-select";
import { useState, useEffect } from "react";
import {
  getAllQuizForAdmin,
  getAllUser,
  postAssignQuiz,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
import { useTranslation, Trans } from "react-i18next";

const AssignQuiz = (props) => {
  const { t } = useTranslation();

  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [listUser, setListUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    fetchQuiz();
    fetchUser();
  }, []);

  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.name}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };

  const fetchUser = async () => {
    let res = await getAllUser();
    if (res && res.EC === 0) {
      let user = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.username}-${item.email}`,
        };
      });
      setListUser(user);
    }
  };
  const handleAssign = async () => {
    let rs = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
    console.log("check rs", rs);
    if (rs && rs.EC === 0) {
      toast.success(rs.EM);
    } else {
      toast.error(rs.EM);
    }
  };

  return (
    <div className="assign-container row">
      <div className="col-6 form-group ">
        <label className="mb-2">{t("AssignQuiz.SelectQuiz")}:</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <div className="col-6 form-group ">
        <label className="mb-2"> {t("AssignQuiz.SelectUser")}:</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={listUser}
        />
      </div>

      <div>
        <button className="btn btn-warning mt-3" onClick={() => handleAssign()}>
          {t("AssignQuiz.Assign")}
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
