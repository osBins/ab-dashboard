import { Switch } from "@mui/material";
import { useState } from "react";

const SwitchCell = ({ True }) => {
  // const [checked, setChecked] = useState(value);

  return (
    <Switch
      checked={true}
    />
  );
};

export const userColumns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "name",
    headerName: "name",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 230
  },
  {
    field: "startDate",
    headerName: "Start Time",
    width: 200
  },
  {
    field: "endDate",
    headerName: "End Time",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    }
  },
  {
    field: "action",
    "headerName": "Action",
    width: 75,
    renderCell: (value) => {
      return (
        <SwitchCell value={value}/>
      )
    }
  }
];
