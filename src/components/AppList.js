import React from 'react';
import {List, ListItem, ListItemText, Paper, Typography, Divider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    container: {
        marginLeft: 20,
        paddingLeft: 20,
        paddingRight: 20,
    }
  }));

function AppList({data, title}) {
    const classes = useStyles();
  return (
      <>
      <Paper 
      className={classes.container}
      elevation={3}
      >    
         {/* <Typography variant="h4">{title}</Typography> */}
    <List>
    {data.map((day) => (
        <>
        <ListItem key={day.date_epoch}>
            <ListItemText
            primary={
                <Typography
                variant="h6"
                >
                     {moment.unix(day.date_epoch).utc().format("dddd")}
                </Typography>
               }
            secondary={
                <>
                <Typography
                variant="subtitle2"
                >
                    High {day.day.maxtemp_f}
                </Typography>
                <Typography
                variant="subtitle2"
                >
                    Low {day.day.mintemp_f}
                </Typography>
                </>
            }
            />
        </ListItem>
        <Divider  component="li" />
        </>
    ))}
    </List>
    </Paper>
    </>
  );
}



export default AppList;