import React, { Component } from "react";
import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import {deleteFollowThru} from "../actions";
import { Action, Snackbar } from "../interfaces";

class FollowThruRow extends Component<FollowThruRowProps, FollowThruRowState> {
  
  render = () => {
    const { deleteFollowThru, expiry, href, id, start, text } = this.props;
    return (
      <>
        <ListItem button component="a" href={href}>
          <ListItemAvatar>
            <Avatar alt="Promotional link" src={`https://www.covidvault.com.au/api/controller/render.php?id=${id}`} />
          </ListItemAvatar>
          <ListItemText primary={text} secondary={`Active from ${start} to ${expiry}`} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => deleteFollowThru(id as string)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </>
    );
  };
}

const mapStateToProps = (state: FollowThruRowStateTransfer) => {
  return {};
};

export default connect(mapStateToProps, {deleteFollowThru})(FollowThruRow);

interface FollowThruRowProps {
  deleteFollowThru: (id: string) => (dispatch: (action: Action<Snackbar> | Action<boolean> | Action<string>) => void) => Promise<void>;
  expiry?: string;
  href?:string;
  id?: string;
  start?: string;
  text?: string;
}
interface FollowThruRowState {}
interface FollowThruRowStateTransfer {}
