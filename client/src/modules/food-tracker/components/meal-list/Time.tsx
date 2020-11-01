import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import moment from "moment";
const Time: FC<{ time: Date }> = ({ time }) => {
  return <Typography>{moment(time).format("HH:mm")}</Typography>;
};

export default Time;
