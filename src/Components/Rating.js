import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function PostRating({name,value,setValue,readOnly}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Rating name={name} precision={1} size="small" value={value} onChange = {(event,newValue)=>{setValue(newValue)}} readOnly={readOnly}/>
    </div>
  );
};