import React from "react";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";

interface IGlobalMessageProps {
  globalMessages: {
    errorMessages: string[],
    successMessages: string[]
  }
}

function GlobalMessages(props: IGlobalMessageProps) {
  const successMsgs = props.globalMessages.successMessages;
  const errorMsgs = props.globalMessages.errorMessages;
  return <Box>
      {successMsgs.length > 0 && <Box bgcolor='success.light' style={{padding: 5, margin: 5}}>
        {successMsgs.map((x: string, index: number) => <div key={`success-msg-${index}`}>{x}</div>)}
      </Box>}

      {errorMsgs.length > 0 && <Box bgcolor='error.light' style={{padding: 5, margin: 5}}>
        {errorMsgs.map( (x: string, index: number) => <div key={`error-msg-${index}`}>{x}</div>)}
      </Box>}
    </Box>;
}

const mapStateToProps = (state: any) => {
    return { 
        globalMessages: state.globalMessages
    };
}

export default connect(mapStateToProps)(GlobalMessages);