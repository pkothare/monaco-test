import './App.css';

import React, { useRef } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Editor from "@monaco-editor/react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function App() {

  const editorRef = useRef(null);
  const [value, setValue] = React.useState(0);
  const [controlJson, setControlJson] = React.useState("");

  const editorOptions = {
    extraEditorClassName: "editor",
    minimap: {
      enabled: false
    },
    scrollbar: {
      verticalHasArrows: true
    }
  };

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const classes = useStyles();


  function onSave() {
    setControlJson(editorRef.current.getValue());
  }


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Control Information" />
          <Tab label="JSON" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <pre>
          {controlJson}
        </pre>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box display="block" m={1}>
          <Editor
            height="60vh"
            options={editorOptions}
            onMount={handleEditorDidMount}
            value={controlJson}
            defaultLanguage="json"
          />
        </Box>
        <Box display="block" m={1}>
          <Button onClick={onSave} variant="contained" color="primary">Save</Button>
        </Box>
      </TabPanel>
    </div>
  );
}

export default App;
