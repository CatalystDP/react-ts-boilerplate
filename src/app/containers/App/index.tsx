import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'app/reducers';
import { TMainAppActions, mainAppActionNS } from '../../actions';

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    // todos: RootState.TodoState;
    mainAppState: RootState.TMainAppState;
    actions: TMainAppActions;
    // filter: TodoModel.Filter;
  }
}

@connect(
  (state: RootState, ownProps = {}): Pick<App.Props, 'mainAppState'> => {
    return {
      mainAppState: state.mainAppState
    };
  },
  (dispatch: Dispatch): Pick<App.Props, 'actions'> => ({
    actions: bindActionCreators(
      {
        setText: mainAppActionNS.setText
      },
      dispatch
    )
  })
)
export class App extends React.Component<App.Props> {
  static defaultProps: Partial<App.Props> = {};

  constructor(props: App.Props, context?: any) {
    super(props, context);
  }
  handleClick = () => {
    this.props.actions.setText('welcome to use react-ts-boilerplate');
  };
  render() {
    // const { todos, actions, filter } = this.props;
    return <div onClick={this.handleClick}>{this.props.mainAppState.text}</div>;
  }
}
