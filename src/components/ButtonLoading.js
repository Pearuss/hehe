import _ from 'lodash';
import { Button, CircularProgress } from "@mui/material";


const ButtonLoading = (props) => {
  const renderContent = () => {
    if (props.isLoading) {
      const loadingProps = props.loading;
      const { messageLoading } = props;
      return (
        <Button sx={{ backgroundColor: "#1976D2"}} {..._.omit(props, ['isLoading', 'messageLoading', 'isSuccess'])} disabled>
          <div className="flex items-center">
            {messageLoading}
            &nbsp;
            <CircularProgress size={20} color="default" {...loadingProps} />
          </div>
        </Button>
      );
    }

    return (
      <Button color="primary" {..._.omit(props, ['isLoading', 'messageLoading', 'isSuccess'])} disabled={props.disabled}>
        {props.children}
      </Button>
    );
  };

  return renderContent();
};

export default ButtonLoading;
