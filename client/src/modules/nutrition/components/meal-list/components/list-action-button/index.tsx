import React, { FC, useState } from "react";
import { MoreVert, HighlightOff, Edit, FileCopy } from "@material-ui/icons";
import Comments from "../Comments";

import {
  Menu,
  MenuItem,
  Fade,
  IconButton,
  Typography,
  Box,
  Tooltip,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  desktopView: {
    zIndex: 100,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  mobileView: {
    display: "none",
    zIndex: 100,
    [theme.breakpoints.down("sm")]: {
      display: "flex"
    }
  }
}));

const ListActionButtons: FC<{
  deleteHandler: () => void;
  editHandler: () => void;
  copyHanlder: () => void;
  comments: string;
}> = ({ deleteHandler, editHandler, comments, copyHanlder }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDeleteHandler = () => {
    deleteHandler();
    handleClose();
  };

  const onEditHadnler = () => {
    editHandler();
    handleClose();
  };
  return (
    <>
      <Box className={classes.desktopView}>
        {/*Desktop View*/}
        <Box display="flex" alignItems="center" padding="4px 8px">
          {comments ? <Comments comments={comments} /> : ""}
          <Tooltip title="Copy">
            <IconButton onClick={copyHanlder}>
              <FileCopy fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={onEditHadnler}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={onDeleteHandler}>
              <HighlightOff fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {/*Mobile view*/}
      <Box className={classes.mobileView}>
        {comments ? <Comments comments={comments} /> : ""}
        <IconButton onClick={handleClick}>
          <MoreVert fontSize="small" />
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={!!anchorEl}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={onEditHadnler}>
            <Edit />
            <Typography style={{ padding: "0 8px" }}>Edit</Typography>
          </MenuItem>
          <MenuItem onClick={copyHanlder}>
            <FileCopy />
            <Typography style={{ padding: "0 8px" }}>Copy</Typography>
          </MenuItem>
          <MenuItem onClick={onDeleteHandler}>
            <HighlightOff />
            <Typography style={{ padding: "0 8px" }}>Delete</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default ListActionButtons;
