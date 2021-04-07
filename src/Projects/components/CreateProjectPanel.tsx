/*
 * @Description:
 * @Version: 1.0
 * @Autor: Tabbit
 * @Date: 2021-04-08 00:12:37
 * @LastEditors: Tabbit
 * @LastEditTime: 2021-04-08 01:25:06
 */

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CssBaseline,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputLabel,
} from '@material-ui/core';
import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Flipped } from 'react-flip-toolkit';

export const CreateProjectPanel = (props: any) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  return (
    <Flipped flipId="createProjectPanel">
      <Grid container justify="center">
        <Card
          style={{
            marginTop: '260p',
            width: '350px',
            height: '400px',
            position: 'fixed',
            zIndex: 12,
          }}
        >
          <CardHeader
            title="创建项目"
            style={{ fontSize: '10px', textAlign: 'center' }}
            action={
              <IconButton
                aria-label="close"
                onClick={props.handleCloseCreateProjectClick}
              >
                <CloseIcon />
              </IconButton>
            }
          ></CardHeader>
          <CardContent>
            <Grid container direction="row" justify="space-evenly">
              <Grid item>
                <Grid container direction="column" spacing={2} justify="center">
                  <Grid item>
                    <FormControl>
                      <InputLabel htmlFor="leader">创建人</InputLabel>
                      <Input id="leader" disabled={true} value="谭天一"></Input>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <InputLabel htmlFor="projectName">项目名称</InputLabel>
                      <Input
                        id="projectName"
                        aria-describedby="my-helper-text"
                        style={{ width: '250px' }}
                        onChange={(event) => {
                          setName(event.currentTarget.value);
                        }}
                      />
                      {/* <FormHelperText id="my-helper-text">
                            We'll never share your email.
                          </FormHelperText> */}
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl>
                      <InputLabel htmlFor="projectDescription">
                        描述项目
                      </InputLabel>
                      <Input
                        id="projectDescription"
                        aria-describedby="my-helper-text"
                        style={{ width: '250px' }}
                        onChange={(event) => {
                          setDescription(event.currentTarget.value);
                        }}
                      />
                      {/* <FormHelperText id="my-helper-text">
                            We'll never share your email.
                          </FormHelperText> */}
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Button
                      size="medium"
                      variant="outlined"
                      color="primary"
                      onClick={(event) => {
                        console.log(name);
                        console.log(description);
                        props.handleCreateProject(event, name, description);
                        props.handleCloseCreateProjectClick();
                      }}
                    >
                      创建项目
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Flipped>
  );
};
