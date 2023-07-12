import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import CustomText from '../../../components/common/CustomText';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 20,
    width: '500px',
  },
  chip: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: theme.spacing(0.5),
  },
}));

const ChipsArray = (props) => {
  const classes = useStyles();
  const handleDelete = (chipToDelete) => () => {
    props.deleteFunc(chipToDelete, props.packageName);
  };

  return (
    <Paper component="ul" className={classes.root}>
      <CustomText color="black">{props.packageName}</CustomText>
      <Box>
        {props.chipData.map((data) => {
          let icon;

          if (data.label === 'React') {
            icon = <TagFacesIcon />;
          }

          return (
            <li key={data.key}>
              <Chip
                icon={icon}
                label={data.label}
                onDelete={
                  data.label === 'React' ? undefined : handleDelete(data)
                }
                className={classes.chip}
              />
            </li>
          );
        })}
      </Box>
    </Paper>
  );
};

export default ChipsArray;
