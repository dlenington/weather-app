import React from 'react';
import PropTypes from "prop-types";
import {List, ListItem, ListItemText, Paper, Typography, Divider, CircularProgress, ListItemAvatar} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles(() => ({
    container: {
        marginLeft: 20,
        paddingLeft: 20,
        paddingRight: 20,
        width: 200,
        height: 350,
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
    },
    loadingContainer: {
        width: 240,
        height: 370,
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
    }
  }));

function AppList({data, loading}) {
    const classes = useStyles();
    
    return (
      <>
      <Paper 
      className={classes.container}
      elevation={3}
      >    
      {loading && (
              <CircularProgress/>
      ) }

{data && (<List>
    {data.map((day, index) => (
        <>
        <ListItem key={day.date_epoch}>
            <ListItemAvatar>
                {/* {day.day.conditon.icon && ( */}
                    <img src={day.day.condition.icon}
                    height="50"
                    width="50"
                    />
                {/* )} */}
            </ListItemAvatar>
            <ListItemText
            component='div'
            primary={
                <Typography
                variant="h6"
                component="span"
                >
                     {moment.unix(day.date_epoch).utc().format("dddd")}
                </Typography>
               }
            secondary={
                <>
                <Typography
                variant="subtitle2"
                >
                    High {day.day.maxtemp_f} F
                </Typography>
                <Typography
                variant="subtitle2"
                >
                    Low {day.day.mintemp_f} F
                </Typography>
                </>
            }
            />
        </ListItem>
       {index !== data.length - 1 && (
           <Divider key={index} component="li" />
       )} 
        </>
    ))}
    </List>
    )}
     
    </Paper>
    </>
  );
}

AppList.propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool
}



export default AppList;