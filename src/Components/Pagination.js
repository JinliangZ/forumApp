import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginLeft: '20%',
    },
  },
}));

export default function PaginationRounded({pages,setCurrentPage}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination count={pages} shape="rounded" onChange={(e,page)=>{
          setCurrentPage(page);
      }}/>
    </div>
  );
}