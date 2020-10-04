import React, { Component } from "react";
import { connect } from "react-redux";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import {deleteCondition} from "../actions";
import { Action, Snackbar } from "../interfaces";

class ConditionsOfEntryRow extends Component<ConditionsOfEntryRowProps, ConditionsOfEntryRowState> {
  
  render = () => {
    const { deleteCondition, id, text } = this.props;
    return (
      <>
        <ListItem button>
          <ListItemText primary={text} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => deleteCondition(id as string)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </>
    );
  };
}

const mapStateToProps = (state: ConditionsOfEntryRowTransfer) => {
  return {};
};

export default connect(mapStateToProps, {deleteCondition})(ConditionsOfEntryRow);

interface ConditionsOfEntryRowProps {
  deleteCondition: (id: string) => (dispatch: (action: Action<Snackbar> | Action<boolean> | Action<string>) => void) => Promise<void>;
  id: string;
  text: string;
}
interface ConditionsOfEntryRowState {}
interface ConditionsOfEntryRowTransfer {}
