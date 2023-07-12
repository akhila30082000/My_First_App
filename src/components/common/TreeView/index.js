import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TreeItem, TreeView } from '@material-ui/lab';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    marginTop: '30px',
    height: 300,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const CustomTreeView = withStyles(() => ({
  root: { color: '#ffffff' },
}))(TreeView);

const StyledTreeView = (props) => {
  const classes = useStyles();

  const renderTree = (nodes) => {
    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={nodes.name}
        // onLabelClick={alert()}
      >
        {/* {console.log('nodes', nodes)} */}
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };

  return (
    <CustomTreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['client', 'root1', 'root2']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(props.data)}
    </CustomTreeView>
  );
};

StyledTreeView.propTypes = {
  data: object.isRequired,
};

export default StyledTreeView;
