import React, { useState } from "react";
import { AppBar, Tabs, Tab, Grid, Button } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import IconButton from '@material-ui/core/IconButton';


const CustomTabsHook = () => {

  const [tabList, setTabList] = useState([
    {
      key: 0,
      id: 0
    }
  ]);

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, value) => {
    setTabValue(value);
  };

  const addTab = () => {
    let id = 0;
    if(tabList.length === 0)
      id = 0;
    else
      id = tabList[tabList.length - 1].id + 1;
    setTabList([...tabList, { key: id, id: id }]);
  };

  const deleteTab = e => {
    e.stopPropagation();

    // if (tabList.length === 1) {
    //   return;
    // }
    let tabId = parseInt(e.target.id);
    let tabIDIndex = 0;

    let tabs = tabList.filter((value, index) => {
      if (value.id === tabId) {
        tabIDIndex = index;
      }
      return value.id !== tabId;
    });
    
    let curValue = parseInt(tabValue);
    if(tabList.length === 1) {
      curValue = 0
    }
    else {
      if (curValue === tabId) {
        if (tabIDIndex === 0) {
          curValue = tabList[tabIDIndex + 1].id;
        } else {
          curValue = tabList[tabIDIndex - 1].id;
        }
      }
    }
    
    setTabValue(curValue);
    setTabList(tabs);
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <p>hello</p>
      </div>
      <div className="col-md-8">
<AppBar position="static" style={{backgroundColor:"white", color:"black"}}>
      {console.log(tabValue, "hohoh")}
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {tabList.map(tab => (
              <Tab
                key={tab.key.toString()}
                value={tab.id}
                label={
                  <div> Node {tab.id} 
                    <IconButton size="small" onClick={()=>{console.log("hello from button")}}>
                      <Close 
                        id={tab.id} 
                        style={{verticalAlign: 'middle'}} 
                        onClick={deleteTab} />
                    </IconButton>
                  </div> }
                // icon={<Close id={tab.id} onClick={deleteTab} />}
                className="mytab"
              />
            ))}
          </Tabs>
          
        </Grid>
        <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
          <Button variant="outlined" onClick={addTab}>
            <Add />
          </Button>
        </Grid>
      </Grid>
    </AppBar>
    </div>
    </div>
    

    
  );
};

export default CustomTabsHook;
